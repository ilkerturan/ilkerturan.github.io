# C# 12 - Bölüm 14: Asenkron Programlama (Async / Await)

Asenkron programlama, modern .NET uygulamalarının (Web API, MVC, MAUI vb.) temelini oluşturur. Uzun süren işlemler (Veritabanı okuma, Dosya indirme, API isteği) yaparken uygulamanın donmasını (Thread bloklanmasını) engeller.

## 1. Neden Asenkron (Async) Kullanırız?
**Senkron (Synchronous):** Uygulama veritabanından cevap gelene kadar hiçbir şey yapmadan bekler (Donar).
**Asenkron (Asynchronous):** Uygulama veritabanından cevap beklerken, o anki Thread'i serbest bırakır. Thread gidip başka kullanıcıların isteklerine cevap verir. Cevap geldiğinde işleme kaldığı yerden devam edilir. Bu, sunucu kaynaklarının (RAM/CPU) devasa oranda verimli kullanılmasını sağlar.

## 2. `async` ve `await` Kullanımı

Bir metodun asenkron çalışabilmesi için `async` kelimesi ile işaretlenmesi ve beklenen uzun işlemin önüne `await` yazılması gerekir.

```csharp
// async anahtar kelimesi metodun asenkron olduğunu belirtir.
public async Task VerileriGetirAsync()
{
    Console.WriteLine("Veriler çekiliyor...");
    
    // await: İşlem bitene kadar bu satırda bekle, ama Thread'i serbest bırak!
    await Task.Delay(3000); // 3 saniye süren bir veritabanı sorgusu simülasyonu
    
    Console.WriteLine("İşlem tamamlandı!");
}
```

## 3. Geri Dönüş Tipleri (`Task` ve `Task<T>`)
Asenkron metotlar `void` dönemezler (Event'ler hariç). Bunun yerine `Task` kullanılır.

*   **`void` yerine:** `Task`
*   **`int` yerine:** `Task<int>`
*   **`string` yerine:** `Task<string>`

```csharp
// Geriye string dönen asenkron metot
public async Task<string> KullaniciAdiGetirAsync(int id)
{
    await Task.Delay(1000); // Veritabanına gidildi
    return "Ahmet Yılmaz"; // C#, bunu otomatik olarak Task<string> içine sarar.
}

// Çağrıldığı yer
string isim = await KullaniciAdiGetirAsync(5);
```

## 4. `Task.WhenAll` (Paralel İşlemler)
Birden fazla asenkron metodu aynı anda (paralel) başlatıp, hepsinin bitmesini beklemek istediğimizde kullanılır. Müthiş bir performans artışı sağlar.

```csharp
// 3 farklı API'ye aynı anda (paralel) istek atıyoruz
Task<string> görev1 = ApiDenVeriGetir("URL1");
Task<string> görev2 = ApiDenVeriGetir("URL2");
Task<string> görev3 = ApiDenVeriGetir("URL3");

// Hepsini aynı anda bekle
await Task.WhenAll(görev1, görev2, görev3);
```
