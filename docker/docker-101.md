# Docker 101: "Benim Bilgisayarımda Çalışıyordu" Yalanına Son

Yazılımcıların en büyük kabusu kodun patlaması değil, **sadece prod ortamında** patlamasır.

Senaryoyu biliyorsunuz: Bütün gece uğraşıp bir Node.js projesi yazdınız. Sizin makinede Node.js 18 var, her şey harika. Projeyi arkadaşınıza atıyorsunuz, onda Node.js 16 var ve proje çalışmıyor. Sunucuya atıyorsunuz, orada Node.js 20 var ve proje bambaşka bir hata veriyor.

İşte bu kaosun, yazılım dünyasındaki "standart kargo kutusu" devrimiyle, yani **Docker** ile nasıl çözüldüğüne bakalım.

## 📦 Kargo Kutusu Devrimi (Analoji)

Docker'ı anlamak için bir kargo şirketini düşünün. İçinde piyano da olsa, patates de olsa, kargo gemisi için fark etmez. Hepsi standart bir "Container" (Konteyner) içindedir. Vinç o kutuyu alır ve gemiye yükler. İçindekini bilmesine gerek yoktur.

Docker da kodunuz için bunu yapar. Uygulamanızı, kütüphanelerinizi ve ayarlarınızı bir **paket** içine koyar. Bu paketi ister kendi bilgisayarınızda, ister bulutta çalıştırın; sonuç asla değişmez.

---

## 🆚 Sanal Makine mi? O da Ne?

Eskiden "İzolasyon" dediğimizde aklımıza Sanal Makineler (VM) gelirdi. Ama VM'ler hantaldır.

Bunu şöyle hayal edin:

* **Sanal Makine (VM):** Her misafir için ayrı bir **müstakil ev** inşa etmek gibidir. Her evin kendi tesisatı, temeli (İşletim Sistemi) vardır. Çok yer kaplar, kurulması uzun sürer (GB'larca boyut, dakikalarca açılış).
* **Docker Container:** Büyük bir rezidanstaki **daireler** gibidir. Binanın temelini (Host İşletim Sistemi) ortak kullanırlar ama herkesin dairesi (Container) birbirinden izoledir. Çok hafiftir, saniyeler içinde açılır (MB'larca boyut).

---

## 📖 Mutfaktaki Docker: Kavramları Oturtalım

Docker dünyasına girdiğinizde sürekli duyacağınız 3 terimi, mutfak analojisiyle beynimize kazıyalım:

### 1. Image (İmaj) = Yemek Tarifi 📝

Babaannenizin kurabiye tarifi gibidir. Kağıt üzerindedir, değiştirilemez (Read-only). İçinde ne kadar un (kütüphane), kaç yumurta (kod) olacağı yazılıdır.

### 2. Container = Fırından Çıkan Kurabiye 🍪

Tarife bakarak yaptığınız, yenebilir gerçek üründür. Aynı tariften (Image) binlerce kurabiye (Container) yapabilirsiniz. Birini yakarsanız (hata verirse), çöpe atıp hemen yenisini yaparsınız.

### 3. Docker Hub = Süpermarket 🛒

Başkalarının hazırladığı tariflerin durduğu devasa kütüphane. Nginx, Node.js, Python, MySQL... İhtiyacınız olan her şeyin "resmi tarifi" burada ücretsiz olarak mevcuttur.

---

## 🛠 Kurulum Notları (Can Alıcı Noktalar)

Kurulum adımları işletim sistemine göre değişse de (resmi siteden `Docker Desktop` indirmeniz yeterli), şu detaylar hayat kurtarır:

* **Windows Kullanıcıları:** Mutlaka **WSL 2** (Windows Subsystem for Linux) özelliğini aktif etmelisiniz. Yoksa Docker çok yavaş çalışır.
* **Mac Kullanıcıları:** İndirirken işlemcinize dikkat edin (Intel mi, Apple Silicon M1/M2 mi?). Yanlış versiyonu kurarsanız performans sorunları yaşarsınız.

Kurulum bittiğinde terminale `docker --version` yazarak partiyi başlatabilirsiniz.

---

## 🚀 "Merhaba Dünya" Demek Yetmez: İlk Web Sunucumuz

Hadi teoriyi bırakıp ellerimizi kirletelim. Bilgisayarımızda hiçbir şey kurulu değilken, 3 saniye içinde bir Nginx web sunucusu ayağa kaldıracağız.

### 1. İmajı İndir (Marketten Malzeme Al)

```bash
docker pull nginx

```

Bu komut Docker Hub'a gider ve Nginx tarifini bilgisayarınıza indirir.

### 2. Konteyneri Başlat (Fırına Ver)

```bash
docker run -d -p 8080:80 nginx

```

Burada neler oldu?

* `-d`: **Detached**. Yani "Arka planda çalış, terminalimi kilitleme" dedik.
* `-p 8080:80`: **Port Mapping**. Burası en kritik nokta!
* Docker, dış dünyadan izole bir kutudur.
* Kutunun içinde Nginx 80. porttan yayın yapar.
* Bizim bilgisayarımızın (localhost) 8080. portunu, kutunun 80. portuna "tünel" ile bağladık.



Tarayıcınızı açıp `http://localhost:8080` adresine gidin. **"Welcome to nginx!"** yazısını gördünüz mü? Tebrikler, artık Docker kullanıyorsunuz! 🎉

### 3. Temizliği Unutmayın

İşimiz bitince konteyneri durdurup silmemiz gerekir, yoksa arkada kaynak tüketmeye devam eder.

```bash
docker ps                # Çalışanları listele ve ID'yi al
docker stop [ID]         # Durdur
docker rm [ID]           # Sil

```
