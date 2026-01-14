# Docker 102: Komut Satırına Hükmetmek ve Veriyi Korumak

Bir önceki yazıda (Bölüm 1) Docker'ın mantığını ve "Neden?" sorusunu cevaplamıştık. Şimdi ise "Nasıl?" kısmına, yani motorun kaputunu açmaya geliyoruz.

Bu bölümde terminal korkumuzu yeneceğiz, konteynerleri bir kukla ustası gibi yöneteceğiz ve en önemlisi **"Konteyner silinince verilerim uçuyor mu?"** sorusunu çözeceğiz.

---

## 🎮 Konteyner Yaşam Döngüsü: Doğum, Yaşam ve Ölüm

Bir Docker konteyneri çalıştırdığınızda (`run`), aslında bir yaşam döngüsü başlatırsınız. Ama işiniz bitince o konteyner nereye gidiyor?

### Hayaletleri Görmek (`docker ps -a`)

Sık yapılan bir hata: `docker stop` ile bir konteyneri durdurduğunuzda o silinmez, sadece uykuya dalar.

* `docker ps`: Sadece şu an çalışan (canlı) konteynerleri gösterir.
* `docker ps -a`: Ölmüş, durmuş, çalışan **tüm** konteynerleri listeler.

Eğer diskiniz doluyorsa, muhtemelen arkada yüzlerce "ölü" konteyner birikmiştir. Temizlik için:

```bash
docker rm [CONTAINER_ID]

```

komutunu kullanmalısınız.

---

## 🔌 Port Mapping: "Neden Sitem Açılmıyor?"

En çok takınılan nokta burasıdır. Nginx'i çalıştırdınız ama tarayıcıda `localhost` yazınca hiçbir şey gelmiyor. Neden?

Çünkü Docker konteyneri, dış dünyadan izole, kapalı bir kutudur. İçerideki 80. portta yayın yapan Nginx'in sesini dışarı duyurmak için bir **tünel** açmanız gerekir.

```bash
docker run -d -p 8080:80 nginx

```

Bu komuttaki `-p 8080:80` şu anlama gelir:

> "Ey Docker! Benim bilgisayarımın (Host) **8080**. kapısını, kutunun içindeki **80**. kapısına bağla.".

Artık `http://localhost:8080` adresine gittiğinizde, tünelden geçip Nginx'e ulaşırsınız.

---

## 💾 Volume: Unutkan Konteynerlere Çözüm

Docker konteynerleri doğası gereği "unutkandır" (Ephemeral). Bir konteyneri silerseniz, içine yazdığınız tüm dosyalar, veritabanı kayıtları **anında yok olur**.

**Senaryo:** Bir MySQL veritabanı kurdunuz, içine müşteri verilerini girdiniz. Yanlışlıkla konteyneri sildiniz. Geçmiş olsun, veriler gitti.

**Çözüm: Volume (Kalıcı Depolama)**
Verileri konteynerin "içinde" değil, konteynerin "dışında" (kendi bilgisayarımızda) tutma yöntemidir.

```
Container (Geçici)          Volume (Kalıcı)
┌────────────────┐          ┌──────────────┐
│  MySQL App     │          │              │
│                │ ←───────→│  Veritabanı  │
│  /var/lib/mysql┼─────────→│  Dosyaları   │
└────────────────┘          │              │
                            └──────────────┘

```

Bu sayede konteyner patlasa bile, yeni bir konteyner oluşturup aynı Volume'u bağladığınızda kaldığınız yerden devam edersiniz.

---

## 🔗 Network: Konteynerler Konuşuyor

Bir e-ticaret siteniz var. Web uygulaması bir konteynerde, veritabanı başka bir konteynerde. Bunlar birbirini nasıl bulacak?

Docker'da her konteynerin kendi IP adresi vardır ama bunlar sürekli değişir. Çözüm, onları aynı **Network (Ağ)** içine koymaktır.

```bash
# 1. Bir ağ oluştur
docker network create uygulama-agi

# 2. MySQL'i bu ağa koy
docker run --network uygulama-agi --name veritabanim mysql

# 3. Web uygulamasını bu ağa koy
docker run --network uygulama-agi --name sitem my-web-app

```

Artık web uygulamanız, veritabanına bağlanırken IP adresi yerine direkt ismini (`veritabanim`) kullanabilir.

---

## ⚔️ Meydan Okuma: Veritabanı Kuruyoruz

Hadi öğrendiklerimizi gerçek bir senaryoda test edelim. Bir MySQL veritabanını tek satırda ayağa kaldıracağız.

```bash
docker run -d --name db-test -e MYSQL_ROOT_PASSWORD=gizlisifre mysql

```

Buradaki `-e` parametresi (**Environment Variable**), konteynere dışarıdan ayar göndermemizi sağlar. MySQL imajı, çalışmak için bizden mutlaka bir root şifresi ister. Bunu vermezsek konteyner başlar başlamaz hata verip kapanır.

**Kontrol edelim:**

```bash
docker ps

```

Listede `mysql` görüyorsanız başardınız!
Bu bölümle birlikte `docker_ders_notu.md` dosyasının hakkını verdiğimizi düşünüyorum. İçindeki temel komutlar, parametreler (`-e`, `-p`, `-d`), Volume ve Network mantığını kapsadık.

Onaylarsan, serinin bir sonraki adımı olan `docker_ders_bolum2.md` dosyasına (Dockerfile konusuna) geçebiliriz.
