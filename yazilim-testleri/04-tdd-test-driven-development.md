# Bölüm 04: Test Güdümlü Geliştirme (TDD) Disiplini

"Önce kodu yazarım, projem biter, sonra bir ara üstüne testlerini eklerim (belki)."
Bu, dünyadaki yazılımcıların %90'ının uyguladığı "Geleneksel" ama psikolojik olarak hatalı olan yöntemdir. Kod bittikten sonra test yazmak sıkıcıdır, sadece %20'si test edilir ve genelde testler kodu "doğrulamak" için hileli yazılır.

**TDD (Test-Driven Development - Test Güdümlü Geliştirme)** ise yazılım dünyasının en radikal felsefelerinden biridir (Kent Beck tarafından popülerleştirilmiştir). TDD der ki:
> **"Bir özellik eklemek için, BİR TANE BİLE YAZILIM KODU YAZMADAN ÖNCE, o var olmayan kodun BAŞARISIZ OLAN TESTİNİ yazmak ZORUNDASIN!"**

Testler, projenizin sonradan eklenen bir emniyet kemeri değil, doğrudan kodun mimarisini yönlendiren (Driver - Güdüleyen) direksiyon simididir.

## 1. TDD'nin 3 Adımlı Döngüsü (Red - Green - Refactor)

TDD ile kod geliştiren bir mühendis hayatını tamamen bu saniyeler (hatta dakikalar) süren kısa döngüyle geçirir:

### Adım 1: RED (Kırmızı - Başarısız Test)
Müşteri "KDV hesaplayan fonksiyon istiyorum" dedi.
Gidip `KdvHesapla()` metodunu YAZMAZSINIZ!
Hemen Test dosyasına gidip, henüz var olmayan `KdvHesapla()` adında bir metodu çağırıp ona 100 lira yollayan ve 18 çıkmasını İddia Eden (Assert) bir TEST YAZARSINIZ.
Testi çalıştırırsınız. Kod ortada olmadığı için doğal olarak ekran tamamen **KIRMIZI** yanar ve hata verir. (Tebrikler, başarısız testi yakaladınız).

### Adım 2: GREEN (Yeşil - Sadece Kurtaran Kod)
Şimdi asıl kod (Production Code) dosyasına gidersiniz. 
Göreviniz o Kırmızı hatayı **Yeşile** (Başarılıya) çevirmek için gereken EN BASİT, EN APTALCA (KISS) kodu yazmaktır. O an mimari düşünülmez. Tasarım kalıbı düşünülmez.
Gerekirse gidip fonksiyona doğrudan `return 18;` (Sabit Değer) bile yazabilirsiniz. Maksat o Kırmızı testin, o spesifik senaryo için Yeşile dönmesini sağlamaktır. Testi çalıştırırsınız ve **YEŞİL!** (Güvenlik ağı kuruldu).

### Adım 3: REFACTOR (Temizle ve İyileştir)
Elinizde artık yeşil yanan (çalıştığı garanti olan) bir testiniz var. Artık içiniz rahat.
Şimdi asıl koda dönüp "Peki bu spagetti kodu daha temiz nasıl yazarım, Design Pattern'ı nereye koyarım, değişken ismini nasıl düzeltirim?" diye düşünürsünüz.
Kodun içini baştan aşağı yıkar, daha temizini yazarsınız (Refactoring). Acaba bir şeyi bozdum mu korkusu asla yoktur, çünkü testiniz hazırdır! Testi bir daha koşturursunuz; hala yeşilse, mimariniz kusursuzca temize çekilmiş demektir.

## 2. TDD'nin Neden Sektörde Sevildiği (ve Zorluğu)

**Zorluğu (Öğrenme Eğrisi):** İlk başta psikolojik olarak çok terstir. İnsan beyni önce ürünü görmek ister. TDD ile bir projeye başlamak ilk haftalarda hızı %30 yavaşlatır. Geliştiriciler genelde sabredemeyip döngüyü bozar.

**Faydası (Uzun Vadeli Yatırım):**
- **Sıfır Legacy (Çöp) Kod:** Projede %100 Test Kapsamı (Test Coverage) olur. Yazdığınız ve testten geçmeyen tek satır kod kalmaz.
- **Korkusuz Kod Değişikliği:** Yeni bir modül eklendiğinde "Acaba eski modülü bozdu mu?" korkusu biter (Korkusuz Refactoring). Saniyeler içinde koşan binlerce test size garanti verir.
- **Canlı Dokümantasyon:** Yeni gelen bir yazılımcı sayfalarca Word dokümanı okumaz. Test dosyalarını okur ve sistemin Girdi-Çıktı kurallarını anında anlar. Testler yaşayan en iyi belgedir.
