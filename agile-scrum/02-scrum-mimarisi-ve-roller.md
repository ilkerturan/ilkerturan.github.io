# Bölüm 02: Scrum Çerçevesi ve Ekip Rolleri

Agile felsefesinin dünyada açık ara en çok kullanılan pratiği **Scrum**'dır. Scrum, karmaşık yazılım projelerini küçük, kendi kendini yönetebilen ekiplerle, kısa zaman dilimleri (Sprint) içinde çözmeyi hedefleyen bir çerçevedir. Scrum'da hiyerarşi (Müdür, Şef, Uzman) yoktur; herkes eşittir.

## 1. Sprint Nedir? (Scrum'ın Kalbi)

Scrum'da hiçbir proje aylık planlanmaz. Zaman **Sprint (Koşu)** adı verilen parçalara bölünür.
- Bir Sprint genellikle **1 ila 4 hafta** arasında sürer (Endüstri standardı 2 haftadır).
- Bir Sprint başladığı an, içine dışarıdan yeni iş (Task) SOKULAMAZ. Kapsam kilitlenir. (Müdürünüz gelip "Çok acil şu butonu ekleyin" diyemez, "Gelecek Sprint'e alırız" denir. Bu ekibi kaostan korur).
- Her Sprint'in sonunda kullanıcının (müşterinin) kullanabileceği, tamamen test edilmiş, hatasız "Çalışan bir Parça (Increment)" ortaya çıkmak ZORUNDADIR.

## 2. Scrum'daki 3 Hayati Rol

Scrum çerçevesinde sadece 3 rol vardır. Başka hiçbir unvana (Proje Yöneticisi, Analist vs) yer yoktur.

### A. Product Owner (Ürün Sahibi - PO)
Müşterinin sesidir. Ürünün ne işe yarayacağına, hangi özelliklerin (Feature) ekleneceğine O karar verir.
- **Görevleri:** Ürünün vizyonunu belirler. İhtiyaçları "User Story (Kullanıcı Hikayesi)" şeklinde yazar. En önemli işlerin listesi olan "Product Backlog"u önceliklendirir (En tepedeki en acildir).
- **Yasakları:** Ekibe "İşi nasıl kodlayacaksınız?" diye karışamaz. Ne yapılması gerektiğini söyler, nasıl yapılacağı Geliştirme Ekibine aittir.

### B. Scrum Master (Scrum Ustası)
Bir yönetici (Müdür) DEĞİLDİR, bir "Hizmetkâr Liderdir" (Servant Leader).
- **Görevleri:** Ekibin Scrum kurallarını çiğnememesini sağlar (Örn: Daily toplantısının 15 dakikayı geçmesini engeller). Ekibin önündeki tüm engelleri (Blokerları) kaldırır (Örn: Geliştiricinin bilgisayarı bozulduysa ona yeni PC bulmak Scrum Master'ın işidir). Ekibi dış baskılardan (Müdürlerin araya iş sokma çabasından) koruyan kalkandır.

### C. Developers (Geliştirme Ekibi)
İşi "yapan" (kodlayan, test eden, veritabanını kuran) kişilerdir.
- **Özellikleri:** Kendi kendini yönetirler (Self-Managing). İşi "kimin" yapacağına kendi içlerinde karar verirler. Genellikle 3 ile 9 kişi arasında olmalıdır. (10 kişiden fazlaysa iletişim kopar, Scrum iki takıma bölünmelidir). İşi Sprint'e yetiştirmek konusunda mutlak sorumludurlar.

## 3. Product Backlog ve Sprint Backlog Kavramları

- **Product Backlog (Ürün İş Listesi):** Projenin hayatta olduğu yıllar boyunca yapılması "hayal edilen" her şeyin listesidir (Buzdağı). Burayı her zaman Product Owner yönetir. Sürekli yaşar, sürekli yeni şeyler eklenir.
- **Sprint Backlog (Sprint İş Listesi):** Geliştirme Ekibinin, sadece "Önümüzdeki 2 hafta içinde yapmaya söz verdiği" işlerin Product Backlog'dan çekilip alındığı ufak, kilitlenmiş listedir.
