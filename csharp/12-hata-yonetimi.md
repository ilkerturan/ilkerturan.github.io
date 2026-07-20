# C# 12 - Bölüm 12: Hata Yönetimi (Exception Handling)

Uygulama çalışırken beklenmedik durumlar (dosya bulunamaması, veritabanına bağlanılamaması, sıfıra bölünme vs.) oluştuğunda programın çökmesini engellemek için **Hata Yönetimi** kullanırız.

## 1. `try-catch-finally` Blokları

```csharp
try
{
    // Hata üretme ihtimali olan riskli kodlar buraya yazılır.
    int a = 10;
    int b = 0;
    int result = a / b; // Sıfıra bölünme hatası!
}
catch (DivideByZeroException ex)
{
    // Sadece "Sıfıra Bölünme" hatası olursa burası çalışır.
    Console.WriteLine($"Matematiksel bir hata oluştu: {ex.Message}");
}
catch (Exception ex)
{
    // Diğer tüm öngörülemeyen hatalar buraya düşer. (En genel hata sınıfıdır)
    Console.WriteLine($"Bilinmeyen bir hata oluştu: {ex.Message}");
}
finally
{
    // Hata olsun ya da olmasın, EN SON kesinlikle çalışır.
    // Genellikle açık olan veritabanı bağlantılarını veya dosyaları kapatmak (Dispose) için kullanılır.
    Console.WriteLine("İşlem tamamlandı.");
}
```

## 2. Hata Fırlatma (`throw`)
Kendi yazdığınız iş kuralları ihlal edildiğinde manuel olarak hata fırlatabilirsiniz.

```csharp
public void ParaCek(decimal miktar)
{
    if (miktar < 0)
    {
        // Kendi hatamızı fırlatıyoruz
        throw new ArgumentException("Çekilecek tutar sıfırdan küçük olamaz!");
    }
    
    // Para çekme işlemleri...
}
```

## 3. Kendi Exception Sınıfımızı Yazmak (Custom Exceptions)

Özel bir iş domaini (örn: Bankacılık) geliştiriyorsanız, `.NET`'in standart hataları yetersiz kalabilir.

```csharp
// Kendi Hata Sınıfımız (Exception'dan miras alır)
public class BakiyeYetersizException(string mesaj) : Exception(mesaj)
{
    // C# 12 Primary Constructor kullanılmıştır.
}

// Kullanımı
if (bakiye < miktar)
{
    throw new BakiyeYetersizException("Hesabınızda yeterli bakiye bulunmuyor.");
}
```
