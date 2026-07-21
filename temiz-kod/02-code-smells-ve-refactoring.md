# Bölüm 02: Kötü Kod Kokuları (Code Smells) ve Refactoring

Bilgisayar bilimlerinde kodu derlerken hata almazsınız ama ekrana baktığınızda midenizi bulandıran, "Burada mimari bir hata var, bu yapı ileride kesin çökecek veya bakımını imkansızlaştıracak" dediğiniz sezgisel durumlara **Code Smell (Kod Kokusu)** denir.

Kokuşmuş bir kodu, dışarıdan sistemin davranışını (ne iş yaptığını) HİÇ DEĞİŞTİRMEDEN, sadece içerideki tasarımı ve okunaklılığı iyileştirerek baştan yazma işlemine ise **Refactoring (Yeniden Yapılandırma)** denir. Evin dış boyasına dokunmadan iç tesisatını komple yenilemektir.

## 1. En Ünlü Kötü Kod Kokuları (Code Smells)

Aşağıdaki belirtilerden herhangi birini kodunuzda görüyorsanız, burnunuza kötü kokular gelmeli ve hemen Refactoring yapmalısınız.

### A. Tekrar Eden Kod (Duplicated Code - DRY İhlali)
En yaygın kokudur. Bir işlemi (Örn: Veritabanı bağlantı metnini hazırlama) programın 3 farklı dosyasında Kopyala-Yapıştır ile yazdıysanız bu felakettir. İleride şifre değiştiğinde 3 dosyayı da bulup tek tek elinizle güncellemeniz gerekir. Unutursanız sistem patlar.
- **Tedavisi:** O işlemi tek bir Merkez Fonksiyona (Extract Method) çevirip, diğer yerlerden sadece o fonksiyonu çağırmaktır.

### B. Dev Sınıf ve Dev Metot (God Object)
Bir dosyanın 3000 satır sürmesi, bir fonksiyonun 500 satır olması kodun her şeyi kendi başına yapmaya çalıştığını gösterir (Her şeye gücü yeten Tanrı Obje).
- **Tedavisi:** Büyük sınıfı, her biri sadece tek bir konudan sorumlu (Single Responsibility) olan küçük 5 sınıfa parçalamaktır.

### C. Uzun Parametre Listesi (Long Parameter List)
Bir fonksiyona 7 tane parametre göndermek kokudur.
`public void KayitOl(string ad, string soyad, int yas, string mail, string sifre, string tel, bool kvkk)`
- **Tedavisi:** Tüm bu değişkenleri paketleyen bir Sınıf (Örn: `MusteriDTO`) yapıp, fonksiyona sadece 1 tane `MusteriDTO` objesi yollamaktır (Introduce Parameter Object).

### D. Büyülü Sayılar (Magic Numbers)
Kodun tam ortasında nereden geldiği belli olmayan anlamsız sayılar kullanmaktır.
```csharp
// KÖTÜ (Magic Number) - 86400 ne? Kod okuyucu bunu anlamaz.
if (kalanZaman < 86400) { }

// TEDAVİSİ (Refactoring) - Sayıyı Sabit ve Anlamlı bir değişkene atamak.
const int BIR_GUNDEKI_SANIYE_SAYISI = 86400;
if (kalanZaman < BIR_GUNDEKI_SANIYE_SAYISI) { }
```

### E. İçiçe Geçmiş Spagetti (Arrow Anti-Pattern)
5 tane `if`, `for` ve `switch` bloğunun birbirinin içine (sağa doğru ok gibi kayarak) yazılması, kodu tamamen okunamaz hale getirir (İngilizcede Arrow Anti-Pattern denir).
- **Tedavisi:** Hatalı durumları "Guard Clauses (Erken Kaçış/Koruma Kuralları)" ile en tepede `return` edip kodun içine dallanmayı önlemektir.

## 2. Erken Kaçış (Guard Clauses) Refactoring Örneği

**Kirli Spagetti Kod:**
```csharp
public void SiparisOnayla(User user, Order order)
{
    if (user != null) // Kullanıcı varsa içeri gir
    {
        if (order != null) // Sipariş varsa içeri gir
        {
            if (user.Bakiyesi >= order.Fiyat) // Parası yetiyorsa içeri gir
            {
                // Asıl işi burada yap (3 tab içerideyiz)
                OnaylaVeMailAt();
            }
            else { throw new Exception("Bakiye Yetersiz!"); }
        }
        else { throw new Exception("Sipariş Bulunamadı"); }
    }
    else { throw new Exception("Kullanıcı Bulunamadı"); }
}
```

**Tertemiz (Guard Clauses ile Refactor Edilmiş) Kod:**
Dikkati sadece "Asıl İşe" veren, olumsuz ihtimalleri hemen fonksiyonun başında kovalayan mükemmel yaklaşım:
```csharp
public void SiparisOnayla(User user, Order order)
{
    // 1. Kötü durumları hemen kapıda (Erkenden) defet (Guard)
    if (user == null) throw new Exception("Kullanıcı Bulunamadı");
    if (order == null) throw new Exception("Sipariş Bulunamadı");
    if (user.Bakiyesi < order.Fiyat) throw new Exception("Bakiye Yetersiz!");

    // 2. Kötü durumlar geçildiğine göre, fonksiyon asıl işini (Girinti olmadan düz çizgide) yapsın.
    OnaylaVeMailAt();
}
```
