# Bölüm 01: OWASP ve Yazılım Güvenliği

Yazılım geliştirirken odak noktamız genellikle "Uygulama çalışıyor mu?" sorusudur. Ancak günümüzde daha önemli olan soru şudur: **"Uygulama saldırı altında çalışmaya devam edebiliyor mu ve verileri koruyabiliyor mu?"**

---

## 1. Bilgi Güvenliğinin Temeli: CIA Triad
Siber güvenlik sadece "Hacker'lardan korunmak" değildir. Güvenliğin 3 temel saç ayağı vardır (CIA):
- **C (Confidentiality - Gizlilik):** Veriyi sadece görmeye yetkisi olanların görmesi. (Örn: Parolaların şifrelenmesi).
- **I (Integrity - Bütünlük):** Verinin yolda veya veritabanında değiştirilmemesi. (Örn: Banka hesabındaki bakiyenin manipüle edilmemesi).
- **A (Availability - Erişilebilirlik):** Sistemin yetkili kişilere 7/24 hizmet vermeye devam etmesi. (Örn: DDoS saldırılarıyla sunucunun çökertilmemesi).

## 2. OWASP Nedir?
**OWASP (Open Worldwide Application Security Project)**, web ve yazılım güvenliğini artırmak için kurulmuş, kar amacı gütmeyen dünyanın en büyük güvenlik vakfıdır.

OWASP'ın amacı şirketlere veya yazılımcılara bir şey satmak değildir. Yüzlerce güvenlik uzmanının gönüllü katılımıyla dünyadaki siber saldırıları analiz eder ve "Şu anda en çok can yakan 10 kritik güvenlik zafiyeti şunlardır" şeklinde periyodik listeler (Top 10) yayınlar.

## 3. Koddan Bağımsız Güvenlik Mimarisi
Güvenlik belirli bir programlama dilinin (C#, Java, Python) veya framework'ün sorunu değildir. 
Bir yazılımda SQL sorgusu yazmayı bilirsiniz, ancak "Parametrik" yazmazsanız hacklenirsiniz. API (Endpoint) yazmayı bilirsiniz, ancak Authorization (Yetki Kontrolü) koymazsanız verilerinizi çaldırırsınız.

Bu eğitim serisindeki zafiyetler dilden bağımsızdır. Amaç, kod yazarken veya mimari çizerken bir **Siber Korsan (Hacker)** gibi düşünebilme refleksini kazanmaktır.
