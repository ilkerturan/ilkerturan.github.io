# Bölüm 03: Unit Test (Birim Testi) ve Mocking (Dublörler)

Test piramidinin en önemli kısmı, her gün binlercesini yazacağımız Unit (Birim) testlerdir. İyi bir test yazmanın 3 aşamalı kutsal bir kuralı vardır.

---

## 1. AAA Kuralı (Arrange, Act, Assert)
Dünyadaki bütün birim testler 3 bloktan oluşur:
1. **Arrange (Hazırla):** Test için gerekli değişkenleri ve ortamı hazırlarsınız. (Örn: Sepete 50 TL'lik bir ürün koy).
2. **Act (Harekete Geç / Davran):** Asıl test edeceğiniz metodu çağırırsınız. (Örn: `SepetiOnayla()` metodunu çalıştır).
3. **Assert (Doğrula):** Beklentiniz ile gerçekte olanı karşılaştırırsınız. (Örn: "Beklenen Sepet Tutarı 50 TL'dir. Acaba sistemden dönen tutar da 50 TL mi? Değilse testi patlat - Kırmızı yap").

## 2. İzole Etmek ve Mocking (Dublör Kullanımı)
Birim testin (Unit test) en büyük kuralı dış dünyadan bağımsız olmasıdır.
Diyelim ki `MusteriKaydet()` adında bir metodunuz var. Bu metot işini bitirince müşterinin kredi kartından 100$ çekiyor. 
Siz bu kodu günde 500 kere test ederseniz, kredi kartından 50.000$ mı çekeceksiniz? Veya test sırasında internet koparsa testiniz başarısız mı sayılacak?

**İşte burada "Mock (Dublör/Sahte)" nesneler devreye girer.**
Siz test ortamında gerçek banka sistemini (veya veritabanını) devreden çıkarırsınız. Onun yerine, her zaman "Evet para başarıyla çekildi" cevabını veren içi boş, sahte bir dublör (Mock Nesne) verirsiniz. 
Böylece bankayı değil, sadece kendi kodunuzun (If-else mantığınızın) doğru çalışıp çalışmadığını izole ederek test etmiş olursunuz.
