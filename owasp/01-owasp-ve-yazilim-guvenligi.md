# Bölüm 01: OWASP Nedir ve Yazılım Güvenliği Felsefesi

Yazılım geliştiriciler genelde "Kodum çalışıyor mu?" sorusuna odaklanır. Ancak kötü niyetli bir hacker "Bu kod NASIL BOZULUR?" sorusuna odaklanır. Geliştirici sadece olumlu (Happy Path) senaryoları düşünürken, saldırganlar girdi kutularına hiç beklenmedik zehirli veriler göndererek sistemi dizleri üzerine çöktürmeye çalışır.

## 1. OWASP (Open Worldwide Application Security Project) Nedir?
OWASP, dünya çapındaki siber güvenlik uzmanlarının bir araya gelerek kurduğu, kâr amacı gütmeyen, açık kaynaklı devasa bir güvenlik organizasyonudur. Yazılım dünyasının "Sağlık Örgütü" gibidir.

**OWASP Top 10 Nedir?**
Her 3-4 yılda bir, dünyadaki milyonlarca web sitesine yapılan gerçek siber saldırı verilerini analiz ederler ve yazılım dünyasındaki **En Kritik 10 Zafiyeti** (Vulnerability) listeleyen bir rapor yayınlarlar.
Bir şirketin web sitesi eğer "OWASP Top 10" kriterlerini karşılamıyorsa, o site teknik olarak "Halka açık bir mayın tarlasıdır." Bankacılık, Sağlık veya Finans gibi sektörlerde OWASP uyumluluğu yasal bir zorunluluktur.

## 2. Yazılım Güvenliğinin Üç Temel Sütunu (CIA Triad)
Bilgi Güvenliği dünyasında sistemlerin güvenli kabul edilebilmesi için 3 ayağın da sağlam olması gerekir.

- **Confidentiality (Gizlilik):** Veriyi sadece görme yetkisi olan kişiler görebilmelidir. (Örn: Sizin maaş bordronuzu, şirketteki stajyerin görememesi).
- **Integrity (Bütünlük):** Verinin aktarım sırasında veya veritabanında "izinsiz değiştirilmediğinin" garanti edilmesidir. (Örn: Bankadan arkadaşınıza 100 TL gönderdiğinizde, araya giren bir korsanın o rakamı 100.000 TL yapamaması).
- **Availability (Erişilebilirlik):** Sistemin yetkili kişilere 7/24 hizmet verebilmesidir. Eğer bir hacker sisteme 1 milyon sahte istek yollayarak (DDoS) sunucuyu kilitliyor ve gerçek müşteriler siteye giremiyorsa, Erişim hakkı gasp edilmiştir.

## 3. Shift-Left Security (Güvenliği Sola Kaydırmak)
Geleneksel yazılım süreçlerinde geliştiriciler kodu yazar, ürün biter, en son gün "Hadi bir siber güvenlik şirketine sızma testi (Penetration Test) yaptıralım" derler. Bu felakettir! Güvenlik açığı bulunursa kodun mimarisinin baştan değişmesi gerekir ki bu çok pahalıdır.

Modern yaklaşım **DevSecOps** (Shift-Left) der ki: Güvenlik en sağda (sonda) değil, en solda (en başta) başlamalıdır. Geliştirici henüz IDE'sinde kod yazarken dahi güvenlik eklentileri (SonarQube vb.) "Burada SQL açık bıraktın" diye onu uyarmalıdır.
