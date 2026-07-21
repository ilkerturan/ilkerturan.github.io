# Bölüm 01: Tasarım Kalıpları (Design Patterns) Nedir ve Felsefesi

Yazılım geliştirirken karşılaştığınız sorunların %90'ı, sizden yıllar önce yaşamış olan başka yazılımcıların karşılaştığı sorunların birebir aynısıdır. Siz bir e-ticaret sitesinde sepete ürün ekleme sistemi yazarken, "Tüm sistemde tek bir sepet nesnesi olmasını nasıl sağlarım?" diye düşünürken aslında 30 yıllık bir problemi çözmeye çalışıyorsunuz.

**Tasarım Kalıpları (Design Patterns)**, yazılımda sıkça karşılaşılan, tekrarlayan yapısal ve mimari problemlere karşı, endüstri standardı haline gelmiş, test edilmiş ve "En İyi Pratik (Best Practice)" kabul edilen **hazır çözüm şablonlarıdır.**

## 1. Neden Tasarım Kalıplarına İhtiyacımız Var?

- **Tekerleği Yeniden İcat Etmemek:** Sorunu çözmek için günlerce mimari düşünmek yerine, "Ha, bu tam bir Observer Pattern vakası" diyerek kanıtlanmış çözümü 10 dakikada koda dökersiniz.
- **Ortak Dil (Ortak Terminoloji):** Ekibinizdeki diğer yazılımcıya "Veritabanına bağlanan objeyi sadece ilk seferde üretip, sonraki her çağrıda hafızadaki aynı kopyayı geri dönen bir sistem yazdım" demek yerine, "Veritabanı bağlantısı için **Singleton** yazdım" dersiniz. Karşınızdaki tam olarak ne yaptığınızı tek kelimeyle anlar.
- **Esneklik ve Sürdürülebilirlik:** Doğru kalıp kullanılmış kod, ileride müşteri "Yeni bir özellik ekleyelim" dediğinde spagettiye dönüşmeden, mevcut koda dokunmadan sadece yeni kod eklenerek (Open/Closed Prensibi) genişletilebilir.

## 2. Tasarım Kalıplarının Ortaya Çıkışı (Gang of Four)
1994 yılında dört yetenekli yazılım mühendisi (Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides), yazılım dünyasını sonsuza dek değiştiren bir kitap yayınladılar: *"Design Patterns: Elements of Reusable Object-Oriented Software"*. Bu dörtlüye yazılım dünyasında "Gang of Four - GoF (Dörtlü Çete)" denir.
Kitapta tam **23 adet klasik tasarım kalıbı** tanımlanmıştır.

## 3. Tasarım Kalıplarının Üç Ana Ailesi

Tasarım kalıpları, çözdükleri problemin doğasına göre üç ana kategoriye (aileye) ayrılır:

1. **Yaratılışsal (Creational) Kalıplar:**
   Nesnelerin (Objelerin) "nasıl yaratılacağı (üretileceği)" ile ilgilenir. Klasik `new Object()` diyerek nesne yaratmak bazı durumlarda sistemi yorar veya esnekliği bozar. (Örn: Singleton, Factory, Builder).
2. **Yapısal (Structural) Kalıplar:**
   Farklı nesnelerin veya sınıfların birbiriyle nasıl bağlanacağı, daha büyük yapılar oluşturmak için nasıl organize edileceği ile ilgilenir. (Örn: Adapter, Decorator, Facade).
3. **Davranışsal (Behavioral) Kalıplar:**
   Nesnelerin birbirleriyle nasıl iletişim kuracağı, aralarındaki sorumluluk ve görev dağılımının nasıl olacağı ile ilgilenir. (Örn: Observer, Strategy, Command).

> **Uyarı (Anti-Pattern):** Tasarım kalıpları birer "Altın Çekiç" değildir. Sadece gerçekten ihtiyaç olduğunda kullanılmalıdır. Sırf kodunuzda "kalıp olsun" diye basit bir projeyi 10 farklı kalıpla doldurursanız, buna **Over-engineering (Aşırı Mühendislik)** denir ve kodunuz okunamayacak kadar karmaşıklaşır.
