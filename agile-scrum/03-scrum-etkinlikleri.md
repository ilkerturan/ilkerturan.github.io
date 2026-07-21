# Bölüm 03: Scrum Etkinlikleri (Toplantılar) ve Ritüeller

Scrum, iletişimsizliği yok etmek ve projenin gidişatını şeffaflaştırmak için 5 resmi ritüel (Etkinlik) tanımlar. Scrum'da "Gizli kapaklı işler" veya "Sürprizler" olamaz. Eğer bir proje başarısız olacaksa, Scrum sayesinde "erkenden başarısız olur" (Fail Fast) ve para israfı önlenir.

## 1. Sprint Planlama (Sprint Planning)
Sprint'in (Örn: 2 haftalık koşunun) **ilk gününde** yapılır. Tüm Scrum takımı katılır.
- **Amacı:** Bu sprint'te "Neyi" ve "Nasıl" yapacağımızı belirlemektir.
- Product Owner (PO), Product Backlog'un en tepesindeki (en acil) işleri masaya getirir. 
- Geliştirme ekibi bu işleri inceler ve kapasitesine göre (kaç iş yapabileceğine inanıyorsa) o kadar işi **Sprint Backlog**'a çeker. (PO ekibe iş dikte edemez, ekip yapabileceği kadarını alır).
- Maksimum Süresi: 1 aylık bir sprint için 8 saati geçemez (2 haftalık sprint için 4 saattir).

### Efor Tahmini ve Story Point
Scrum'da işlerin ne kadar süreceği saat veya gün (Örn: "Bunu 3 günde yazarım") ile KESİNLİKLE tahmin edilmez. Çünkü junior biri için 3 gün olan iş, senior için 2 saat olabilir.
Bunun yerine **Story Point (Hikaye Puanı)** kullanılır (Genellikle Fibonacci dizisi: 1, 2, 3, 5, 8, 13...). Story Point, işin "Karmaşıklığına, Eforuna ve Belirsizliğine" verilir. 1 puanlık bir butona kıyasla, Veritabanı kurmak 8 puanlık bir zorluk/karmaşıklık taşıyordur. "Planning Poker" oyunu ile herkes kapalı zarfla puan verir, sonra tartışılarak ortak puanda uzlaşılır.

## 2. Daily Scrum (Günlük Ayaküstü Toplantı)
Her gün aynı saatte ve aynı yerde yapılan, Sprint'in nabzının ölçüldüğü etkinliktir.
- **En Büyük Kuralı:** Maksimum 15 dakika sürer. Uzamasın diye genellikle ayakta yapılır. Geyik muhabbetine veya detaylı teknik tartışmalara izin verilmez (Tartışılacaksa 15 dk bittikten sonra ilgili kişiler ayrı toplanır). Sadece Geliştiriciler katılır (PO ve Scrum Master dinleyici olabilir ama konuşamazlar).
- **Herkes sırayla 3 soruyu yanıtlar:**
  1. Dün ne yaptım?
  2. Bugün ne yapacağım?
  3. Önümde beni engelleyen bir sorun (Bloker) var mı? (Örn: "Sunucu şifresini alamadığım için bekliyorum" der, Scrum Master hemen o engeli çözmek için koşturmaya başlar).

## 3. Sprint İnceleme (Sprint Review / Demo)
Sprint'in **son günü** yapılır.
- **Amacı:** Müşteriye (veya paydaşlara) son 2 haftada yapılan işleri (Çalışan Ürünü) ekranda "Demo" ederek (Tıklayarak, göstererek) sunmaktır. Slayt veya sunum yapılması yasaktır, doğrudan yazılım kullanılmalıdır.
- Müşteri ürünü görür ve geri bildirim (Feedback) verir. ("Şu butonu kırmızı yapsak daha iyi olur" vb.)

## 4. Sprint Retrospektifi (Geçmişe Bakış)
Sprint Review'dan hemen sonra, takımın kendi içine kapandığı, müşterinin olmadığı, Sprint'in **son toplantısıdır**.
- **Amacı:** "Bu sprintte NELERİ DOĞRU YAPTIK? NELERİ YANLIŞ YAPTIK? BİR SONRAKİ SPRINT'TE NEYİ DAHA İYİ YAPABİLİRİZ?" sorularını tartışmaktır.
- Yazılımla veya ürünle ilgili DEĞİL, takımın süreçleriyle ve ilişkileriyle ilgili tartışılır. (Örn: "Planlamayı çok kötü yaptık, uykusuz kaldık", "Kod testlerini son güne bıraktık"). Scrum'ın sürekli iyileşme (Kaizen) kalbidir.
