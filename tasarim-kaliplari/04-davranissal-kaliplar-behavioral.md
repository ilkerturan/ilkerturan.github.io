# Bölüm 04: Davranışsal Kalıplar (Behavioral Patterns)

Davranışsal kalıplar, sistem içindeki farklı nesnelerin birbirleriyle nasıl iletişim (haberleşme) kuracağını, görevleri birbirlerine nasıl paslayacaklarını düzenler. En büyük amacı sınıflar arasındaki "Bana sıkı sıkıya bağlı olma, beni haberdar et yeter" mantığını (Loose Coupling) kurmaktır.

## 1. Observer (Gözlemci / Abonelik) Kalıbı
Dünya üzerinde tartışmasız en çok kullanılan davranışsal kalıptır. Günümüzdeki tüm Event (Tıklama, Klavye basımı) mekanizmaları bu felsefeyle çalışır.

- **Problem:** Bir E-Ticaret sitesinde "iPhone 16" stoklarda tükenmiş. Müşteri fiyatın yanındaki "Stoklara gelince haber ver" butonuna basmış. Sistem arka planda ne yapmalı? Her saniye veritabanına gidip "Stok geldi mi? Stok geldi mi?" diye (Polling yöntemi) sorarsa sunucu saniyeler içinde çöker.
- **Çözüm (Observer):** Müşteri (Observer/Aboneler), Ürünün (Subject/Yayıncı) listesine ismini yazdırır. Müşteri hiçbir şey sormaz, işine bakar. Ürün stoka (1 ay sonra) girdiği O SANİYE, listesindeki herkese (Abonelerine) otomatik olarak `Notify()` (BildirimGönder) fonksiyonunu tetikler ve mail atar. (Youtube'daki Kanal Aboneliği mantığı ile tamamen aynıdır).

```csharp
// Çok Basit Bir Observer Mantığı
public class Iphone16 : ISubject // Yayıncı
{
    private List<IObserver> aboneler = new List<IObserver>();
    private bool stoktaVarMi = false;

    // Müşterinin listeye kaydolduğu yer
    public void AboneEkle(IObserver musteri) { aboneler.Add(musteri); }

    public void StokGuncelle(bool yeniStokDurumu)
    {
        stoktaVarMi = yeniStokDurumu;
        if(stoktaVarMi == true)
        {
            BildirimGonder();
        }
    }

    private void BildirimGonder()
    {
        // Listedeki binlerce müşteriyi dön ve hepsinin HaberVer fonksiyonunu tetikle
        foreach(var abone in aboneler)
        {
            abone.HaberVer("Müjde! iPhone 16 stoklarda!");
        }
    }
}
```

## 2. Strategy (Strateji) Kalıbı
Kullanılacak algoritmanın, program çalışırken (Runtime'da) dinamik olarak değiştirilebilmesini (seçilebilmesini) sağlar.

- **Problem:** Bir harita uygulamanız var (Örn: Google Maps). İki nokta arası "Yol Tarifi" alacaksınız. Ancak yol tarifi Arabayla, Yürüyerek veya Bisikletle olmak üzere 3 farklı karmaşık hesaba (algoritmaya) dayanıyor. Hepsini aynı `YolTarifiHesapla` fonksiyonunun içinde devasa `if-else` bloklarıyla yazarsanız kod felç olur.
- **Çözüm:** Arabayla, Bisikletle ve Yürüyerek hesaplamalarını üç AYRI Sınıf (Strategy) olarak yazarsınız. Ana program (Context) sadece kullanıcı "Bisiklete" tıkladığında, içine "Bisiklet Stratejisi" nesnesini yükler ve ona hesapla komutunu verir. İleride "Uçakla" tarifi eklendiğinde eski kodlara zerre dokunmadan sadece yeni bir strateji sınıfı yaratırsınız.

## 3. Command (Komut) Kalıbı
Sisteme verilecek emirlerin (isteklerin), birer "Nesne" (Obje) haline dönüştürülmesi felsefesidir.

- **Neden Gerekli?** 
  En büyük kullanım amacı **Undo (Geri Al - Ctrl+Z)** mekanizmalarını kurmaktır. Photoshop gibi bir programda her fırça darbesi bir "Command" objesidir ve bir Liste (Array) içinde saklanır. Kullanıcı "Geri Al" butonuna bastığında, sistem listedeki en son objeyi bulur ve onun içindeki "İşlemiTersineCevir()" fonksiyonunu çalıştırır. (Restoranlardaki Garsonun siparişi alıp fişe/objeye yazıp sıraya koyması mantığıdır).
