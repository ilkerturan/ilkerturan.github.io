# C# 12 - Bölüm 15: Entity Framework Core (EF Core 8)

Entity Framework (EF) Core, Microsoft'un .NET için geliştirdiği modern, hızlı ve açık kaynaklı bir ORM (Object-Relational Mapper) aracıdır. EF Core sayesinde SQL sorguları yazmadan (sadece C# kodları ve LINQ kullanarak) veritabanı işlemleri (CRUD) yapabiliriz.

## 1. Code-First Yaklaşımı Nedir?
Günümüzde en çok kullanılan yöntemdir.
Önce C# tarafında nesnelerimizi (Sınıflarımızı/Entity) yazarız, EF Core arka planda bu sınıflara bakarak SQL tablolarını otomatik olarak yaratır.

### Entity (Varlık) Sınıfı Oluşturma
```csharp
// C# 12 formatı ile yazılmış bir Model sınıfı
public class Urun
{
    public int Id { get; set; } // Otomatik Primary Key olur
    public required string Ad { get; set; } // required: C# 11+ özelliği, zorunlu alan.
    public decimal Fiyat { get; set; }
}
```

## 2. DbContext Sınıfı (Veritabanı Köprüsü)
Uygulama ile veritabanı arasındaki bağlantıyı yöneten ana sınıftır.

```csharp
using Microsoft.EntityFrameworkCore;

public class ECommerceContext : DbContext
{
    // Veritabanındaki 'Urunler' tablosuna denk gelir
    public DbSet<Urun> Urunler { get; set; }
    
    // Bağlantı ayarları
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Gerçek projelerde connection string appsettings.json dosyasından okunur.
        optionsBuilder.UseSqlServer("Server=localhost;Database=ECommerceDb;Trusted_Connection=True;TrustServerCertificate=True;");
    }
}
```

## 3. Migration (Göç) İşlemleri
C# kodlarımızı yazdıktan sonra, bu kodların SQL veritabanına dönüştürülmesi için .NET CLI kullanılır:

1. **`dotnet ef migrations add InitialCreate`**: Kodlardaki değişiklikleri paketler.
2. **`dotnet ef database update`**: Paketi SQL veritabanına yazar (tabloları oluşturur).

## 4. Temel CRUD İşlemleri (Ekle, Oku, Güncelle, Sil)

### Veri Ekleme (Create)
```csharp
using var context = new ECommerceContext(); // C# 8 using deklarasyonu

var yeniUrun = new Urun { Ad = "Laptop", Fiyat = 25000m };
context.Urunler.Add(yeniUrun); // Belleğe eklendi
await context.SaveChangesAsync(); // Veritabanına yazıldı (INSERT)
```

### Veri Okuma ve LINQ Filtreleme (Read)
```csharp
// Fiyatı 10.000'den büyük olan ürünleri asenkron olarak liste halinde getir
var pahaliUrunler = await context.Urunler
                                 .Where(u => u.Fiyat > 10000)
                                 .ToListAsync(); // Veritabanına SELECT atılır
```

### Veri Güncelleme (Update)
```csharp
// Önce güncellenecek veri veritabanından bulunur
var urun = await context.Urunler.FindAsync(1);

if (urun is not null) // C# 9 Pattern Matching
{
    urun.Fiyat = 27500m; // Değişiklik yapıldı (Change Tracker izliyor)
    await context.SaveChangesAsync(); // UPDATE atılır
}
```

### Veri Silme (Delete)
```csharp
var silinecekUrun = await context.Urunler.FindAsync(1);
if (silinecekUrun is not null)
{
    context.Urunler.Remove(silinecekUrun);
    await context.SaveChangesAsync(); // DELETE atılır
}
```

## Özet
- **EF Core:** SQL yazmadan C# nesneleri ile veritabanı yönetimi sağlar.
- **LINQ ile Entegre:** `Where`, `Select` gibi yapıları doğrudan SQL komutlarına (örn: `SELECT * FROM ... WHERE ...`) çevirir.
- **Asenkron Çalışma:** `.ToListAsync()`, `.SaveChangesAsync()` gibi metotlarla uygulamanın bloklanmasını engeller.
