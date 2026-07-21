# Bölüm 02: AI ile İletişim (Prompt Engineering Temelleri)

**Prompt (İstem/Komut)**, yapay zekaya ne yapması gerektiğini söylediğiniz metin kutusudur.
**Prompt Engineering (Komut Mühendisliği)** ise, yapay zekadan en doğru, en kaliteli ve en hatasız sonucu alabilmek için bu metin kutusunu belirli stratejiler ve kalıplarla (mühendislik disipliniyle) kullanma sanatıdır.

Yapay zeka "çöp atarsanız çöp üretir" (Garbage In, Garbage Out). "Bana bir web sitesi yaz" derseniz, size çok genel ve dandik bir kod verir.

## Mükemmel Bir Prompt'un Anatomisi (4 Temel Bileşen)

Profesyonel bir komut yazarken şu 4 bloğun mutlaka doldurulması gerekir:

### 1. Rol / Persona (Role)
Yapay zekaya kimlik kazandırırsanız, devasa veritabanından sadece o kimliğe uygun (Uzmanlık) kelimeleri seçmeye başlar.
- *Kötü:* Bana Python'da veri çekmeyi anlat.
- *İyi:* **"Sen 20 yıllık tecrübesi olan Kıdemli (Senior) bir Python Geliştiricisi ve Eğitmeni'sin."** 

### 2. Görev / Talimat (Task/Instruction)
Ne istediğinizi aşırı net ve kesin ifadelerle (Kısa ve emir kipleriyle) yazmalısınız.
- *Kötü:* Kodda bir hata var bulsana.
- *İyi:* **"Aşağıda verdiğim C# kodundaki 'NullReferenceException' hatasının nerede olduğunu tespit et ve sorunu çözen güvenli bir kod bloğu yaz."**

### 3. Bağlam / Detay (Context)
Model nerede olduğunuzu, bu kodu ne için kullandığınızı bilmezse yanlış çözüm üretir.
- *Kötü:* Sitemi hızlandır.
- *İyi:* **"Biz e-ticaret sektörü için yüksek trafikli (saniyede 100.000 istek alan) bir sistem tasarlıyoruz. Veritabanımız PostgreSQL. Amacım okuma hızlarını %50 artırmak."**

### 4. Çıktı Formatı ve Kısıtlamalar (Output Format / Constraints)
Sonucun nasıl görünmesini istediğinizi dikte etmezseniz, model size 5 sayfa felsefe yapar.
- *Kötü:* Cevap ver.
- *İyi:* **"Cevabını sadece bir Markdown Tablosu olarak ver. 3 sütun olsun (Araç Adı, Avantajı, Fiyatı). Tablo dışında hiçbir açıklama veya giriş cümlesi (Elbette, işte tablonuz vb.) YAZMA! Maksimum 100 kelime kullan."**
