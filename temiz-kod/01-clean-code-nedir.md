# Bölüm 01: Temiz Kod (Clean Code) Nedir?

*"Kod yazmak makine için değil, o kodu 6 ay sonra okuyacak olan siz ve diğer mühendisler içindir."* - Robert C. Martin (Uncle Bob)

---

## 1. Neden Temiz Koda İhtiyacımız Var?
Bir yazılımın ömrü boyunca harcanan eforun %20'si kodu yazmaya, %80'i ise o kodu okumaya ve değiştirmeye (bakıma) harcanır. Eğer kodunuz spagetti gibi birbirine dolanmışsa, sistem çalışsa bile projeye yeni bir özellik eklemek imkansız hale gelir. Temiz kod, bir yazılımın "Sürdürülebilir (Maintainable)" olmasının tek yoludur.

## 2. İsimlendirme Sanatı (Naming)
Bilgisayar için `x = 5` ile `kullaniciYasi = 5` arasında hiçbir fark yoktur. Ancak bir mühendis için aradaki fark devasadır.
- **Kötü:** `int d; // geçen gün sayısı`
- **İyi:** `int gecenGunSayisi;`
- Değişken isimleri, metot isimleri ve sınıf isimleri "Niyet belirten" kelimeler olmalıdır. Koda baktığınızda ne yaptığını bir kitap okur gibi anlamalısınız.

## 3. Metot (Fonksiyon) Anatomisi
Clean Code kitabının en sert kuralı şudur: **"Bir fonksiyon sadece BİR İŞ yapmalıdır (Do One Thing)."**
- Eğer bir fonksiyonunuz hem veritabanına bağlanıyor, hem veriyi çekiyor, hem hesaplama yapıyor, hem de e-posta atıyorsa, o fonksiyon bir çöplüktür.
- Fonksiyonlar olabildiğince kısa (10-15 satır) olmalıdır. Eğer uzunsa, onu daha küçük alt fonksiyonlara bölmelisiniz (Extract Method).

## 4. İzcilik Kuralı (Boy Scout Rule)
Amerikan izcilerinin meşhur bir kuralı vardır: *"Kamp alanını, bulduğundan daha temiz bırak."*
Yazılımda da bu geçerlidir. Bir dosyayı açıp küçük bir bug (hata) düzeltecekseniz, çıkmadan önce o dosyadaki kötü bir değişken ismini düzeltin veya gereksiz bir boşluğu silin. Kod tabanı zamanla çürümek yerine, zamanla iyileşecektir.
