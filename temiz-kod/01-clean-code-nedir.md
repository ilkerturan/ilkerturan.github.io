# Bölüm 01: Temiz Kod (Clean Code) Felsefesi Nedir?

Yazılıma yeni başlayanların aklında tek bir hedef vardır: **"Kod hata vermesin, çalışsın yeter!"** 
Ancak profesyonel yazılım dünyasında "Çalışan kod", işin sadece %10'udur. Bir projenin maliyetinin asıl büyük kısmı, kodu ilk yazarken değil, yıllar sonra o koda yeni özellikler eklemeye çalışırken (Bakım/Maintenance) harcanır.

Eğer bir kod parçası çalışıyor ama sizden başka kimse okuduğunda anlayamıyorsa, hatta 6 ay sonra kendiniz okuduğunuzda ne yaptığınızı anlayamıyorsanız, o kod **Çöptür** (Legacy Code / Spagetti Kod).

## 1. Clean Code'un Temel Tanımı
Efsane yazılımcı Robert C. Martin (Uncle Bob) şöyle der: 
> "Kötü kod her zaman çalışabilir. Ancak kod temiz değilse, geliştirme organizasyonunu dizleri üzerine çöktürür. Bir programın sadece bilgisayar tarafından değil, **İNSANLAR TARAFINDAN da okunabilir** olması gerekir."

Clean Code, "Roman okur gibi okunabilen", sürprizler barındırmayan, değişken ve fonksiyon isimlerinin ne iş yaptığını açıkça bağırdığı, küçük parçalara bölünmüş kod yazma sanatıdır.

## 2. İsimlendirme Felsefesi (Naming Conventions)
Temiz kodun %50'si değişkenlere doğru isim vermektir.

**Kötü (Kirli) İsimlendirme:**
```csharp
int d = 5; // d ne? gün mü? uzaklık mı? data mı?
bool flag = true; // Hangi bayrak? Ne işe yarıyor?
List<Customer> list1 = new List<Customer>(); // list1 ne? Neden 1?

// Kodun ne yaptığını anlamak için yanına açıklama yazmak zorunda kalınmış kod KÖTÜ koddur.
if (x > 18) // x eğer 18'den büyükse yetişkindir
{
    // ...
}
```

**Temiz (Clean) İsimlendirme:**
Açıklama satırına (Comment) ihtiyaç duymadan kendini açıklayan kod en mükemmel koddur.
```csharp
int gecenGunSayisi = 5;
bool musteriAktifMi = true;
List<Customer> silinmisMusteriler = new List<Customer>();

// Yukarıdaki x'in ne olduğu artık bağırıyor. Yorum satırına gerek kalmadı!
if (kullaniciYasi > YETISKIN_OLMA_YASI)
{
    // ...
}
```

## 3. Fonksiyon (Metot) Kuralları
1. **Küçük Olmalıdır:** Bir fonksiyon maksimum 20-30 satır olmalıdır. 1000 satırlık fonksiyonlar cinayettir.
2. **SADECE TEK BİR İŞ YAPMALIDIR (Do One Thing):** 
   Eğer bir fonksiyonun adı `MusteriyiKaydetVeMailAt()` ise o kod kirlidir. "Kaydetme" işi ayrı, "Mail Atma" işi ayrı fonksiyonlarda (küçük parçalarda) olmalıdır ki, ileride "sadece kaydetmek" istediğinizde yanlışlıkla mail atmak zorunda kalmayın.
3. **Parametre Sayısı Az Olmalıdır:** Bir fonksiyona 5-6 tane dışarıdan argüman geliyorsa o fonksiyon çok karmaşıktır. (0 veya 1 parametre mükemmeldir, 2 fena değildir, 3 uyarıcıdır, 4 ve fazlası korkunçtur - obje yollanmalıdır).

## 4. Açıklama Satırları (Yorumlar) Yalandır!
Yazılımcılar genellikle kodlarına yorum satırı (Comment) eklemeyi övünülecek bir şey sanırlar. Oysa Uncle Bob'a göre **"Yorum satırları, kodunuzun anlaşılmazlığını telafi etmek için yazdığınız itiraflardır."**
- Yorumlar yalan söyler: Kodu güncellersiniz ama yorumu güncellemeyi unutursunuz, o yorum başka bir programcıyı felakete sürükler.
- Kendini açıklayan isimler (Clean Code) kullandığınızda koda "Burada ne yaptım" yorumu yazmanıza GEREK KALMAZ. (Yalnızca "Neden böyle garip bir matematik hesabı yaptım" (İş kuralları/Algoritma) gibi koddan anlaşılamayacak şirket mantıkları için yorum atılır).
