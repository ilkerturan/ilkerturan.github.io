# Bölüm 02: Yazılım Test Piramidi (The Test Pyramid)

Sisteme otomatik test yazmaya karar verdiğinizde "Nereden, hangi seviyeden başlamalıyım?" sorusu ortaya çıkar. Mike Cohn tarafından icat edilen **Test Piramidi**, otomatik testleri Hız, Maliyet ve Kapsam açısından üçe böler.

Piramidin felsefesi şudur: "Tabandaki testler çok hızlı ve ucuzdur (bolca yazın), tepeye doğru testler yavaşlar, pahalılaşır ve kırılganlaşır (daha az yazın)."

## 1. Birinci Katman (Taban): Unit Tests (Birim Testler)
Piramidin en devasa ve en temel katmanıdır. Kodun %70-%80'ini oluşturmalıdır.
- **Odak Noktası:** Uygulamanın çalışıp çalışmadığını değil, **içindeki tek bir fonksiyonun veya metodun** (Örn: VergiHesapla fonksiyonu) matematiksel olarak doğru çalışıp çalışmadığını izole bir şekilde test eder.
- **Bağımlılık (Isolation):** Kesinlikle veritabanına BAĞLANILMAZ, dış API'lere internet üzerinden gidilmez. Her şey dış dünyadan (Mock/Fake verilerle) izole edilir.
- **Hız:** Milisaniyeler sürer. Bir projede 10.000 tane birim test, 1-2 saniye içinde koşup bitmelidir.
- **Kim Yazar?** Yazılımcının (Developer) ta kendisi yazar.

## 2. İkinci Katman (Orta): Integration Tests (Entegrasyon Testleri)
Sınıfların ve fonksiyonların "tek başlarına" çalıştığını Unit Testler ile kanıtladık. Ama acaba bu iki farklı sistem (Örn: Sipariş Servisi ile Fatura Servisi) veya yazılım ile **Gerçek Veritabanı** el ele tutuştuklarında da düzgün çalışıyorlar mı?
- **Odak Noktası:** Farklı modüllerin birbirleriyle olan iletişim hatlarındaki "Uyumsuzlukları" yakalar. (A modülü 3 parametre atıyor, B modülü 2 bekliyor, sistem çöker).
- **Bağımlılık:** Gerçek (veya geçici bir in-memory) Veritabanına veri yazılır, dış API'lere ağ üzerinden bağlanılır, dosya sisteminden klasör okunur. (Yani I/O işlemleri yapılır).
- **Hız:** Unit testlere göre oldukça yavaştır (Veritabanına bağlanmak zaman alır). Projede Unit testlerin %20'si kadar bir oranda bulunmaları tavsiye edilir.

## 3. Üçüncü Katman (Zirve): E2E (End-to-End / Uçtan Uca) Testleri
(Aynı zamanda UI/Arayüz testleri olarak da bilinir). Piramidin en tepesindeki daracık alandır.
- **Odak Noktası:** Gerçek bir kullanıcının davranışlarını simüle (taklit) eder. Arkada Selenium veya Cypress gibi dev bot (robot) kütüphaneleri çalışır. 
- **Nasıl Çalışır?** Testi başlattığınızda ellerinizi klavyeden çekersiniz, robot sizin yerinize Chrome tarayıcısını açar, gerçek siteye girer, kutucuğu bulup "ilker" yazar, "Giriş" butonuna fiziksel tıklama olayı gönderir ve ekranda "Hoşgeldiniz" yazısı belirip belirmediğini kontrol eder. (Sistem veritabanından ön yüze kadar %100 test edilmiş olur).
- **Dezavantajı:** Korkunç yavaştır. Bir sayfanın açılıp kapanması 5 saniye sürebilir. Eğer ekrandaki "Giriş" butonunun rengi veya ismi değişirse test hemen kırılır (Çok kırılgandır). Bu yüzden tüm sistemi E2E ile test etmek (Buna Dondurma Külahı Anti-Pattern'i denir) felakettir. Sadece müşterinin para kazandırdığı çok kritik (Sepete Git, Satın Al) ekranlar E2E ile test edilir, kalanı Unit ve Entegrasyona bırakılır.
