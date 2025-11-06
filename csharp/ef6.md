# Entity Framework 6

## Giriş

Entity Framework 6 (EF6), Microsoft tarafından geliştirilen açık kaynaklı bir Object-Relational Mapping (ORM) framework'üdür. .NET Framework uygulamalarında veritabanı işlemlerini nesne yönelimli bir şekilde gerçekleştirmeyi sağlar.

**Avantajları:**
- SQL yazmadan veritabanı işlemleri yapabilme
- Tip güvenliği (Type Safety)
- Veritabanı bağımsızlığı
- Hızlı geliştirme imkanı
- LINQ desteği

---

## Entity Framework Nedir?

Entity Framework, veritabanı tablolarını C# sınıflarına (entity) eşleştiren bir ORM aracıdır. Geliştiricilerin SQL sorguları yazmak yerine, C# nesneleri üzerinden veritabanı işlemlerini gerçekleştirmesine olanak tanır.

**Temel Bileşenler:**
- **Entity:** Veritabanı tablolarını temsil eden C# sınıfları
- **Context:** Veritabanı ile uygulama arasındaki köprü
- **LINQ to Entities:** Veritabanı sorgularını LINQ ile yazma imkanı
- **Change Tracker:** Nesnelerdeki değişiklikleri izleme mekanizması

---

## Kurulum ve Yapılandırma

### NuGet ile Kurulum

```bash
Install-Package EntityFramework
```

Veya .NET CLI ile:

```bash
dotnet add package EntityFramework --version 6.4.4
```

### App.config / Web.config Yapılandırması

```xml
<configuration>
  <connectionStrings>
    <add name="MyDbContext" 
         connectionString="Server=.;Database=MyDatabase;Integrated Security=true;" 
         providerName="System.Data.SqlClient" />
  </connectionStrings>
</configuration>
```

**Açıklama:** Connection string, uygulamanın hangi veritabanına, hangi kimlik bilgileriyle bağlanacağını belirtir. `providerName` ise kullanılacak veritabanı sağlayıcısını (SQL Server, MySQL, vb.) tanımlar.

---

## Code First Yaklaşımı

Code First, önce C# sınıflarını oluşturup, bu sınıflardan veritabanını otomatik olarak oluşturan yaklaşımdır. Veritabanı şeması kod tarafından kontrol edilir.

### Örnek Entity Sınıfı

```csharp
public class Product
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedDate { get; set; }
    
    // Navigation Property
    public virtual Category Category { get; set; }
    public int CategoryId { get; set; }
}

public class Category
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    
    // Navigation Property
    public virtual ICollection<Product> Products { get; set; }
}
```

### DbContext Oluşturma

```csharp
public class MyDbContext : DbContext
{
    public MyDbContext() : base("name=MyDbContext")
    {
    }
    
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    
    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        // Fluent API konfigürasyonları
        base.OnModelCreating(modelBuilder);
    }
}
```

**Açıklama:** `DbContext` sınıfı, veritabanı ile uygulamanız arasındaki ana iletişim noktasıdır. Constructor'daki `base("name=MyDbContext")` ifadesi, config dosyasındaki connection string'i kullanmasını sağlar.

---

## Database First Yaklaşımı

Mevcut bir veritabanından Entity sınıfları ve DbContext otomatik olarak oluşturulur. Bu yaklaşım, özellikle legacy sistemlerde veya DBA'ların veritabanını yönettiği projelerde tercih edilir.

### Adımlar:

1. Visual Studio'da projeye sağ tıklayın
2. Add > New Item > ADO.NET Entity Data Model seçin
3. "EF Designer from database" seçeneğini işaretleyin
4. Veritabanı bağlantısını yapılandırın
5. Tablolarınızı seçin ve Finish'e tıklayın

**Açıklama:** Bu işlem sonucunda `.edmx` (Entity Data Model XML) dosyası oluşturulur. Bu dosya, veritabanı şemasını ve entity sınıflarını içerir.

---

## Model First Yaklaşımı

Visual Studio'daki Entity Framework Designer'ı kullanarak görsel olarak model oluşturulur, ardından hem entity sınıfları hem de veritabanı bu modelden üretilir.

**Kullanım Senaryoları:**
- Görsel tasarım tercih edildiğinde
- Takım içinde veritabanı şemasını görsel olarak paylaşmak istendiğinde
- Prototipler oluşturulurken

**Not:** Model First günümüzde Code First'e göre daha az tercih edilmektedir.

---

## DbContext ve DbSet

### DbContext Özellikleri

```csharp
public class MyDbContext : DbContext
{
    public MyDbContext() : base("name=MyDbContext")
    {
        // Lazy Loading varsayılan olarak açık
        this.Configuration.LazyLoadingEnabled = true;
        
        // Proxy oluşturmayı kapat (performans için)
        this.Configuration.ProxyCreationEnabled = false;
        
        // SQL loglarını göster
        this.Database.Log = sql => Debug.WriteLine(sql);
    }
    
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Customer> Customers { get; set; }
}
```

**Açıklama:**
- `LazyLoadingEnabled`: İlişkili verilerin otomatik yüklenmesini kontrol eder
- `ProxyCreationEnabled`: EF'in proxy sınıflar oluşturmasını kontrol eder
- `Database.Log`: Oluşturulan SQL sorgularını loglama imkanı verir

### DbSet Kullanımı

`DbSet<T>` bir entity türü için tüm CRUD işlemlerini ve sorgulamaları sağlar:

```csharp
using (var context = new MyDbContext())
{
    // Ekleme
    context.Products.Add(new Product { Name = "Laptop" });
    
    // Sorgulama
    var products = context.Products.Where(p => p.Price > 1000).ToList();
    
    // Güncelleme
    var product = context.Products.Find(1);
    product.Price = 2000;
    
    // Silme
    context.Products.Remove(product);
    
    // Değişiklikleri kaydet
    context.SaveChanges();
}
```

---

## CRUD İşlemleri

### Create (Ekleme)

```csharp
using (var context = new MyDbContext())
{
    var product = new Product
    {
        Name = "Laptop",
        Price = 15000,
        Stock = 10,
        CreatedDate = DateTime.Now,
        CategoryId = 1
    };
    
    context.Products.Add(product);
    context.SaveChanges();
    
    // product.ProductId artık veritabanından gelen ID değerini içerir
}
```

**Açıklama:** `SaveChanges()` metodu çağrılana kadar değişiklikler veritabanına yazılmaz. Bu metod, tüm değişiklikleri tek bir transaction içinde işler.

### Read (Okuma)

```csharp
using (var context = new MyDbContext())
{
    // Tüm ürünleri getir
    var allProducts = context.Products.ToList();
    
    // Primary key ile getir
    var product = context.Products.Find(1);
    
    // Filtreleme
    var expensiveProducts = context.Products
        .Where(p => p.Price > 5000)
        .ToList();
    
    // Tek kayıt getir
    var firstProduct = context.Products.FirstOrDefault(p => p.CategoryId == 1);
    
    // Sıralama
    var sortedProducts = context.Products
        .OrderByDescending(p => p.Price)
        .ToList();
}
```

### Update (Güncelleme)

```csharp
using (var context = new MyDbContext())
{
    // Yöntem 1: Find ile
    var product = context.Products.Find(1);
    if (product != null)
    {
        product.Price = 20000;
        product.Stock = 5;
        context.SaveChanges();
    }
    
    // Yöntem 2: Attach ile (disconnected senaryo)
    var updatedProduct = new Product { ProductId = 1, Name = "Updated Laptop" };
    context.Products.Attach(updatedProduct);
    context.Entry(updatedProduct).Property(p => p.Name).IsModified = true;
    context.SaveChanges();
}
```

**Açıklama:** İlk yöntem entity'nin takip edildiği (tracked) durumda kullanılır. İkinci yöntem ise entity'nin context dışından geldiği durumlarda (örneğin web API'de) tercih edilir.

### Delete (Silme)

```csharp
using (var context = new MyDbContext())
{
    // Yöntem 1: Find ve Remove
    var product = context.Products.Find(1);
    if (product != null)
    {
        context.Products.Remove(product);
        context.SaveChanges();
    }
    
    // Yöntem 2: Attach ve Remove (veritabanına gitmeden)
    var productToDelete = new Product { ProductId = 1 };
    context.Products.Attach(productToDelete);
    context.Products.Remove(productToDelete);
    context.SaveChanges();
}
```

---

## İlişkiler (Relationships)

### One-to-Many (Bire-Çok)

```csharp
public class Category
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    
    // Bir kategori birçok ürüne sahip olabilir
    public virtual ICollection<Product> Products { get; set; }
}

public class Product
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    
    // Her ürün bir kategoriye aittir
    public int CategoryId { get; set; }
    public virtual Category Category { get; set; }
}
```

**Açıklama:** `virtual` anahtar kelimesi Lazy Loading'i etkinleştirir. `ICollection<T>` ise çoklu ilişkiyi temsil eder.

### Many-to-Many (Çoka-Çok)

```csharp
public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    
    public virtual ICollection<Course> Courses { get; set; }
}

public class Course
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
    
    public virtual ICollection<Student> Students { get; set; }
}

// DbContext içinde
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    modelBuilder.Entity<Student>()
        .HasMany(s => s.Courses)
        .WithMany(c => c.Students)
        .Map(m =>
        {
            m.ToTable("StudentCourses");
            m.MapLeftKey("StudentId");
            m.MapRightKey("CourseId");
        });
}
```

**Açıklama:** Many-to-Many ilişkide EF otomatik olarak ara tablo (junction table) oluşturur. Fluent API ile bu tablonun adını ve sütun isimlerini özelleştirebiliriz.

### One-to-One (Bire-Bir)

```csharp
public class Person
{
    public int PersonId { get; set; }
    public string Name { get; set; }
    
    public virtual Passport Passport { get; set; }
}

public class Passport
{
    [Key, ForeignKey("Person")]
    public int PassportId { get; set; }
    public string PassportNumber { get; set; }
    
    public virtual Person Person { get; set; }
}
```

---

## Migration İşlemleri

Migration, veritabanı şemasındaki değişiklikleri versiyon kontrolü altında yönetmemizi sağlar.

### Migration Etkinleştirme

```bash
Enable-Migrations
```

Bu komut `Migrations` klasörü ve `Configuration.cs` dosyası oluşturur.

### Configuration.cs

```csharp
internal sealed class Configuration : DbMigrationsConfiguration<MyDbContext>
{
    public Configuration()
    {
        AutomaticMigrationsEnabled = false;
        ContextKey = "MyProject.MyDbContext";
    }

    protected override void Seed(MyDbContext context)
    {
        // Seed data (başlangıç verileri)
        context.Categories.AddOrUpdate(
            c => c.CategoryName,
            new Category { CategoryName = "Elektronik" },
            new Category { CategoryName = "Giyim" }
        );
    }
}
```

**Açıklama:** `Seed` metodu, migration uygulandıktan sonra başlangıç verilerini eklemek için kullanılır. `AddOrUpdate` metodu, veri zaten varsa günceller, yoksa ekler.

### Migration Oluşturma

```bash
Add-Migration InitialCreate
```

Bu komut `Migrations` klasöründe timestamp'li bir migration dosyası oluşturur:

```csharp
public partial class InitialCreate : DbMigration
{
    public override void Up()
    {
        CreateTable(
            "dbo.Products",
            c => new
            {
                ProductId = c.Int(nullable: false, identity: true),
                Name = c.String(),
                Price = c.Decimal(nullable: false, precision: 18, scale: 2),
            })
            .PrimaryKey(t => t.ProductId);
    }
    
    public override void Down()
    {
        DropTable("dbo.Products");
    }
}
```

### Migration Uygulama

```bash
Update-Database
```

Belirli bir migration'a geri dönmek için:

```bash
Update-Database -TargetMigration: MigrationName
```

**Açıklama:** `Up()` metodu migration'ı uygular, `Down()` metodu ise geri alır. Bu sayede veritabanı değişikliklerini ileri ve geri alabiliriz.

---

## LINQ Sorguları

LINQ (Language Integrated Query), C# içinde veritabanı sorgularını yazmanızı sağlar.

### Temel Sorgular

```csharp
using (var context = new MyDbContext())
{
    // Where - Filtreleme
    var electronics = context.Products
        .Where(p => p.Category.CategoryName == "Elektronik")
        .ToList();
    
    // Select - Projeksiyon
    var productNames = context.Products
        .Select(p => new { p.Name, p.Price })
        .ToList();
    
    // OrderBy - Sıralama
    var sortedProducts = context.Products
        .OrderBy(p => p.Price)
        .ThenBy(p => p.Name)
        .ToList();
    
    // GroupBy - Gruplama
    var groupedProducts = context.Products
        .GroupBy(p => p.CategoryId)
        .Select(g => new
        {
            CategoryId = g.Key,
            Count = g.Count(),
            AvgPrice = g.Average(p => p.Price)
        })
        .ToList();
    
    // Join - Birleştirme
    var query = from p in context.Products
                join c in context.Categories on p.CategoryId equals c.CategoryId
                select new { p.Name, c.CategoryName };
}
```

### Aggregate Fonksiyonlar

```csharp
using (var context = new MyDbContext())
{
    // Count
    var productCount = context.Products.Count();
    
    // Sum
    var totalStock = context.Products.Sum(p => p.Stock);
    
    // Average
    var avgPrice = context.Products.Average(p => p.Price);
    
    // Min / Max
    var minPrice = context.Products.Min(p => p.Price);
    var maxPrice = context.Products.Max(p => p.Price);
    
    // Any
    bool hasExpensiveProducts = context.Products.Any(p => p.Price > 10000);
    
    // All
    bool allInStock = context.Products.All(p => p.Stock > 0);
}
```

**Açıklama:** Bu aggregate fonksiyonlar doğrudan SQL'e çevrilerek veritabanında çalışır, bu da performans açısından önemlidir.

---

## Eager, Lazy ve Explicit Loading

### Lazy Loading (Tembel Yükleme)

```csharp
public class MyDbContext : DbContext
{
    public MyDbContext()
    {
        this.Configuration.LazyLoadingEnabled = true; // Varsayılan
    }
}

using (var context = new MyDbContext())
{
    var product = context.Products.Find(1);
    
    // Category'ye erişildiğinde otomatik olarak yüklenir
    var categoryName = product.Category.CategoryName; // SELECT sorgusu burada çalışır
}
```

**Açıklama:** Lazy Loading, ilişkili verileri ihtiyaç duyulduğunda yükler. Navigation property'ye erişildiğinde EF otomatik olarak veritabanına gider. Bu N+1 sorgu problemine yol açabilir.

### Eager Loading (Hevesli Yükleme)

```csharp
using (var context = new MyDbContext())
{
    // Include ile ilişkili veri tek sorguda yüklenir
    var products = context.Products
        .Include(p => p.Category)
        .ToList();
    
    // Çoklu Include
    var products2 = context.Products
        .Include(p => p.Category)
        .Include(p => p.Supplier)
        .ToList();
    
    // İç içe Include
    var categories = context.Categories
        .Include(c => c.Products.Select(p => p.Supplier))
        .ToList();
}
```

**Açıklama:** `Include()` metodu ilişkili verileri JOIN kullanarak tek sorguda getirir. Bu, performans açısından genellikle daha iyidir.

### Explicit Loading (Açık Yükleme)

```csharp
using (var context = new MyDbContext())
{
    var product = context.Products.Find(1);
    
    // Category'yi manuel olarak yükle
    context.Entry(product).Reference(p => p.Category).Load();
    
    // Veya koleksiyon için
    var category = context.Categories.Find(1);
    context.Entry(category).Collection(c => c.Products).Load();
    
    // Filtreleme ile
    context.Entry(category)
        .Collection(c => c.Products)
        .Query()
        .Where(p => p.Price > 1000)
        .Load();
}
```

**Açıklama:** Explicit Loading, ilişkili verileri manuel olarak kontrol ederek yüklememizi sağlar. Bu yaklaşım performans optimizasyonunda kullanışlıdır.

---

## Fluent API

Fluent API, entity yapılandırmalarını kod ile yapmamızı sağlar. Data Annotations'a göre daha güçlü ve esnektir.

### Temel Yapılandırmalar

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    // Table adı belirleme
    modelBuilder.Entity<Product>()
        .ToTable("tbl_Products");
    
    // Primary Key
    modelBuilder.Entity<Product>()
        .HasKey(p => p.ProductId);
    
    // Composite Key (Birleşik Anahtar)
    modelBuilder.Entity<OrderDetail>()
        .HasKey(od => new { od.OrderId, od.ProductId });
    
    // Property yapılandırması
    modelBuilder.Entity<Product>()
        .Property(p => p.Name)
        .IsRequired()
        .HasMaxLength(100);
    
    modelBuilder.Entity<Product>()
        .Property(p => p.Price)
        .HasPrecision(18, 2);
    
    // Ignore - Veritabanında sütun oluşturma
    modelBuilder.Entity<Product>()
        .Ignore(p => p.TemporaryProperty);
}
```

### İlişki Yapılandırmaları

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    // One-to-Many
    modelBuilder.Entity<Product>()
        .HasRequired(p => p.Category)
        .WithMany(c => c.Products)
        .HasForeignKey(p => p.CategoryId)
        .WillCascadeOnDelete(false);
    
    // Optional relationship
    modelBuilder.Entity<Product>()
        .HasOptional(p => p.Supplier)
        .WithMany()
        .HasForeignKey(p => p.SupplierId);
    
    // One-to-One
    modelBuilder.Entity<Person>()
        .HasRequired(p => p.Passport)
        .WithRequiredPrincipal(pp => pp.Person);
}
```

**Açıklama:** 
- `HasRequired`: Zorunlu ilişki tanımlar (NOT NULL)
- `HasOptional`: İsteğe bağlı ilişki tanımlar (NULL)
- `WithMany`: Çoklu ilişkinin karşı tarafı
- `WillCascadeOnDelete`: Silme işleminde cascade davranışını kontrol eder

---

## Data Annotations

Data Annotations, entity sınıflarına attribute'lar ekleyerek yapılandırma yapmamızı sağlar.

### Temel Annotations

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("tbl_Products")]
public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ProductId { get; set; }
    
    [Required(ErrorMessage = "Ürün adı zorunludur")]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; set; }
    
    [Range(0.01, 999999.99)]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    
    [Required]
    [EmailAddress]
    public string SupplierEmail { get; set; }
    
    [Url]
    public string Website { get; set; }
    
    [Phone]
    public string ContactPhone { get; set; }
    
    [NotMapped] // Veritabanında sütun oluşturulmaz
    public decimal DiscountedPrice
    {
        get { return Price * 0.9m; }
    }
    
    [ForeignKey("Category")]
    public int CategoryId { get; set; }
    
    public virtual Category Category { get; set; }
}
```

### Validasyon Attributes

```csharp
public class Customer
{
    [Key]
    public int CustomerId { get; set; }
    
    [Required]
    [Display(Name = "Müşteri Adı")]
    public string Name { get; set; }
    
    [RegularExpression(@"^\d{11}$", ErrorMessage = "TC Kimlik 11 haneli olmalı")]
    public string IdentityNumber { get; set; }
    
    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    public DateTime BirthDate { get; set; }
    
    [CreditCard]
    public string CreditCardNumber { get; set; }
    
    [Compare("Password", ErrorMessage = "Şifreler eşleşmiyor")]
    public string ConfirmPassword { get; set; }
}
```

**Açıklama:** Data Annotations hem veritabanı yapılandırması hem de validasyon için kullanılır. MVC projelerinde view validasyon ile entegre çalışır.

---

## Teknik Terimler Sözlüğü

### A-E

**ADO.NET:** Microsoft'un veri erişim teknolojisi. Entity Framework, ADO.NET üzerine inşa edilmiştir.

**Aggregate Functions:** Toplulaştırma fonksiyonları (Sum, Count, Average, Min, Max gibi).

**Annotation:** C# sınıflarına metadata eklemek için kullanılan attribute'lar.

**AsNoTracking:** Change Tracker'ın entity'leri izlememesini sağlar, read-only sorgularda performans artışı sağlar.

**Cascade Delete:** Ana kayıt silindiğinde ilişkili kayıtların otomatik silinmesi.

**Change Tracker:** DbContext içinde entity'lerdeki değişiklikleri izleyen mekanizma.

**Code First:** Önce C# sınıfları yazılır, veritabanı bu sınıflardan oluşturulur.

**Complex Type:** Primary key'i olmayan, başka bir entity'ye gömülü olarak kullanılan tip.

**Connection String:** Veritabanı bağlantı bilgilerini içeren metin.

**Convention:** EF'in varsayılan olarak uyguladığı kurallar (örn: Id veya ClassName+Id primary key olur).

**CRUD:** Create, Read, Update, Delete - Temel veritabanı işlemleri.

**Database First:** Mevcut veritabanından entity sınıfları üretilir.

**Data Annotations:** Entity sınıflarına attribute'lar ekleyerek yapılandırma yapma yöntemi.

**DbContext:** Veritabanı ile uygulama arasındaki köprü görevi gören ana sınıf.

**DbSet:** Belirli bir entity türü için veritabanı tablolarını temsil eden koleksiyon.

**Deferred Execution:** LINQ sorgularının ToList(), FirstOrDefault() gibi metodlar çağrılana kadar çalıştırılmaması.

**Disconnected Entity:** DbContext tarafından takip edilmeyen entity.

**EF Designer:** Visual Studio'da entity modeli görsel olarak tasarlamak için kullanılan araç.

**EDMX:** Entity Data Model XML - Model First ve Database First yaklaşımlarında oluşturulan XML dosyası.

**Entity:** Veritabanı tablosunu temsil eden C# sınıfı.

**Entity State:** Entity'nin durumu (Added, Modified, Deleted, Unchanged, Detached).

**Explicit Loading:** İlişkili verilerin manuel olarak yüklenmesi.

### F-O

**Fluent API:** Entity yapılandırmalarını metod zincirleme ile yapma yöntemi.

**Foreign Key:** Bir tabloda başka bir tablonun primary key'ini referans alan alan (yabancı anahtar).

**Identity Column:** Otomatik artan sütun (auto-increment).

**Include:** Eager Loading için kullanılan, ilişkili verileri JOIN ile getiren metod.

**Index:** Veritabanında hızlı arama için oluşturulan indeks.

**Junction Table:** Many-to-Many ilişkilerde ara tablo.

**Lambda Expression:** LINQ sorgularında kullanılan anonim fonksiyon sözdizimi (=>).

**Lazy Loading:** İlişkili verilerin ihtiyaç duyulduğunda otomatik yüklenmesi.

**LINQ:** Language Integrated Query - C# içinde sorgu yazma dili.

**Migration:** Veritabanı şeması değişikliklerini versiyon kontrolü altında yönetme sistemi.

**Model First:** Entity modelini görsel olarak tasarlayıp, hem kod hem veritabanını bu modelden üretme.

**N+1 Problem:** Lazy Loading nedeniyle ana sorgu + her kayıt için ek sorgu çalışması.

**Navigation Property:** Entity'ler arası ilişkileri temsil eden property'ler.

**Nullable:** NULL değer alabilen tipler (örn: int?, DateTime?).

**ORM:** Object-Relational Mapping - Nesne-ilişkisel eşleştirme.

### P-Z

**POCO:** Plain Old CLR Object - EF'den bağımsız, sade C# sınıfları.

**Primary Key:** Tablodaki her kaydı benzersiz şekilde tanımlayan alan.

**Projection:** Select ile sadece ihtiyaç duyulan alanları getirme.

**Provider:** Verit
