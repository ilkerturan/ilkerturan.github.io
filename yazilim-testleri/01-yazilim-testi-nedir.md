# Bölüm 01: Yazılım Testi Nedir ve Neden Hayatidir?

"Kodumu yazdım, tarayıcıda butona tıkladım çalıştı. Demek ki sorun yok, müşteriye verebiliriz."
Bu amatör yaklaşım, milyonlarca dolarlık kayıplara ve fırlatılan uzay mekiklerinin havada infilak etmesine sebep olan korkunç bir hatadır. Bir geliştiricinin kendi kodunu elle test etmesi (Manual Testing) asla yeterli ve güvenilir değildir; çünkü insan beyni sadece "olumlu (Happy Path)" senaryoları denemeye eğilimlidir.

**Yazılım Testi (Software Testing),** ürünün beklenen gereksinimleri karşılayıp karşılamadığını ve beklenmedik senaryolarda (Hatalı veri girişi, sunucu çökmesi) nasıl davrandığını doğrulamak için yapılan, "Makinelerin (Kodun) makineleri kontrol etmesi" sürecidir.

## 1. Neden Otomatik Test Yazmalıyız? (Otomasyon)

Elle (Manuel) testlerin (Örn: Ekranı açıp şifre girip giriş yapmaya çalışmanın) 3 büyük sorunu vardır:
1. **Yavaştır:** Yüzlerce ekranı elle denemek günler sürer.
2. **Pahalıdır:** Bunun için sürekli maaşlı "Test (QA) Uzmanları" çalıştırmanız gerekir.
3. **Regresyon (Geriye Dönük Kırılma) Tehlikesi:** Bir e-ticaret sitesine "Önerilen Ürünler" modülünü eklersiniz, bu yeni kod gidip taa sepet hesaplama fonksiyonunu bozar (Kelebek etkisi / Regression). Manuel testte her yeni özellik eklendiğinde *tüm siteyi baştan* test etmek imkansızdır.

**Otomasyon (Otomatik Test Kodu Yazmak):**
Siz uygulamanızın asıl kodlarını yazdıktan sonra, bir de "O kodları kontrol eden" Test Kodları (C#, Java veya Python ile) yazarsınız. Sisteme her yeni bir kod eklediğinizde, tek bir butona basarsınız ve bilgisayar saniyeler içinde binlerce testi koşarak (Otomatik olarak şifre girer, sepete tıklar vb.) ekranda **"1500 Test Geçti (Yeşil), 2 Test Başarısız (Kırmızı)"** sonucunu verir. Böylece eski kodları bozup bozmadığınızı anında anlarsınız.

## 2. Shift-Left (Sola Kaydırma) Test Yaklaşımı
Eski Waterfall yönteminde projenin hayat döngüsü sağa doğru akardı: `Analiz -> Tasarım -> Kodlama (Aylar Sürer) -> TEST (En Son)`. 
Testler en sonda yapıldığı için, mimari bir hata varsa aylar çöpe gidiyordu (Düzeltmek 10.000$ maliyet yaratıyordu).

Modern yaklaşım olan **Shift-Left (Sola Kaydır)** der ki: Test işlemlerini projenin en sağına itme, en sola (başlangıca) çek! Kodu yazmaya başladığın an (hatta yazmadan önce) testlerini yazmaya başla. Geliştirme sürecine paralel götür. Erken bulunan hatayı düzeltmek bedavadır (1$).

## 3. Black-Box ve White-Box Testing Felsefeleri

- **Black-Box (Kara Kutu) Testi:** Testi yazan kişi sistemin içindeki kodların (algoritmaların, if-else bloklarının) nasıl çalıştığını zerre kadar bilmez ve görmez. Kutu siyahtır, içi görünmez. "Ben ATM'nin şifre kutusuna 1234 yazarım ve OK tuşuna basarım. Makinenin bana Paramı vermesini BEKLERİM (Expect)." mantığıyla çalışır. Sadece "Girdi" verip "Çıktı"yı kontrol eder. Genelde Tester/QA uzmanları kullanır.
  
- **White-Box (Beyaz/Şeffaf Kutu) Testi:** Testi bizzat kodu yazan yazılımcının (Developer) kendisi yazar. Kodun içindeki tüm if-else bloklarını bildiği için, her bir satırın (Line Coverage) üzerinden geçen, her matematiksel hesabın iç detayına inen çok teknik testlerdir.
