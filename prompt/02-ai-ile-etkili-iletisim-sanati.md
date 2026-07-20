# Bölüm 02: Yapay Zeka ile Etkili İletişim Sanatı

"Prompt Engineering" (Komut Mühendisliği) sektörel bir jargondur. Aslında yaptığımız iş bir mühendislikten ziyade, **yapay zekaya ne istediğimizi doğru ve net bir biçimde aktarma sanatıdır.** 

Etkili bir iletişim için (tıpkı bir insana iş devrediyormuş gibi) şu 4 altın kuralı uygulamak sonuçların kalitesini %90 oranında artıracaktır:

---

## 1. Bağlam (Context) Kurmak
Yapay Zekanın hafızası boştur. Siz ona "Bana bir reklam metni yaz" derseniz, dünyanın en genel geçer ve sıkıcı metnini yazar. Ona, içinde bulunduğunuz durumu anlatın.

**❌ Kötü İletişim:** "Bana bir e-posta yaz, müşteriden ödeme iste."
**✅ Etkili İletişim:** "Ben bir grafik tasarım ajansı sahibiyim. 'Ahmet Bey' adındaki müşterim 3 haftadır logo tasarım faturasını ödemiyor. Ona kibar ama hukuki işlem başlatabileceğimi de hissettiren profesyonel bir hatırlatma e-postası yaz."

## 2. Rol Atama (Persona - Sistem Komutu)
Yapay Zekaya "Kim olduğunu" söylerseniz, kullandığı kelimeleri ve uzmanlığını anında o yöne çeker.

**Örnek Roller:**
- *Sen 20 yıllık deneyimli bir Kıdemli Yazılım Mimarı'sın (Senior Software Architect). Kodlarımı bu gözle incele ve sadece performans sorunlarına odaklan.*
- *Sen neşeli, enerjik ve emojileri çok seven bir Sosyal Medya Uzmanısın.*
- *Sen acımasız ve detayı seven bir Edebiyat Eleştirmenisin.*

## 3. Format ve Sınırlar (Constraints) Belirleme
İnsanlar genellikle LLM'lerin gevezeliğinden şikayet eder. Sınırları sizin koymanız gerekir.

**Nasıl sınır konur?**
- "Sadece 3 madde halinde yaz."
- "Açıklama yapma, sadece kod bloğunu ver."
- "Cevabı JSON formatında ver."
- "Maksimum 50 kelime kullan."

## 4. Doğru Şablonu Kullanmak (CRF Metodu)
Tüm bu adımları birleştiren basit bir zihinsel şablon kullanın: **C-R-F (Context, Request, Format)** 
Yani (Bağlam, İstek, Format).

**Mükemmel bir örnek:**
- **(Rol + Bağlam):** *Sen uzman bir Diyetisyensin. Benim adım Ayşe, 30 yaşındayım, masa başı çalışıyorum ve glütene alerjim var.*
- **(İstek):** *Bana günlük 1500 kaloriyi geçmeyecek, hazırlaması kolay, glütensiz bir 3 günlük beslenme programı hazırla.*
- **(Format):** *Sonucu her gün için ayrı bir Markdown Tablosu halinde göster. Kalori değerlerini yanına yaz. Ekstra açıklama yapma.*
