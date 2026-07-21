# Bölüm 04: Programlama Dilleri ve Seviyeleri

Dünya üzerinde 700'den fazla programlama dili vardır. Neden sadece mükemmel bir tek dil yapıp hepimiz onu kullanmıyoruz? Çünkü programlama dilleri tornavida, İngiliz anahtarı veya çekiç gibi birer **araçtır.** Nasıl ki her vidayı aynı aletle sökemezseniz, her yazılım projesini (Örn: Yapay zeka, Web sitesi, Otonom sürüş sistemi) aynı dille yazmak da verimsizdir.

## 1. Dillerin Seviyeleri (Low-Level vs High-Level)
Programlama dilleri "İnsana ne kadar yakın" veya "Makineye (Donanıma) ne kadar yakın" olduğuna göre seviyelere ayrılır.

### A. Düşük Seviyeli Diller (Low-Level Languages)
Makine diline (1 ve 0'lara) çok yakındır. Öğrenmesi, okunması ve yazılması insanoğlu için inanılmaz zordur.
- **Assembly:** Donanıma doğrudan müdahale eden dildir. İşlemcinin RAM'deki veriyi hangi adresten alacağını (Örn: `MOV AL, 61h`) elle yazarsınız.
- **Ne İçin Kullanılır?** Çamaşır makinesi çipleri, savaş uçağı radarları, füzeler gibi milisaniyenin bile milyonda birinin hayati olduğu, maksimum hız ve donanım kontrolü gerektiren sistemlerde kullanılır.

### B. Orta Seviyeli Diller
Hem donanıma doğrudan müdahale edebilen (Pointer'lar sayesinde RAM'e dokunabilen) hem de insana kısmen anlaşılır gelen dillerdir.
- **C ve C++:** İşletim sistemleri (Windows, Linux kerneli), yüksek grafikli oyun motorları (Unreal Engine) ve gömülü sistemlerin şahıdır. Dünyadaki diğer birçok dil (Python, PHP vb.) aslında C diliyle yazılmıştır!

### C. Yüksek Seviyeli Diller (High-Level Languages)
İngilizce kelimelere çok yakın, okunması ve öğrenmesi kolay dillerdir. Yazılımcı RAM yönetimi, bellek temizliği (Garbage Collection) gibi donanım dertleriyle uğraşmaz, sistem bunları otomatik yapar.
- **Python:** Veri bilimi ve Yapay Zeka için 1 numaradır. "Yazması en kolay" dildir.
- **Java / C#:** Büyük şirketlerin (Bankalar, e-ticaret devleri) güvenli ve devasa Backend sistemlerini (Sunucularını) yazdıkları en kurumsal dillerdir.
- **JavaScript:** İnternet tarayıcılarının (Web sitelerinin) tek hakimidir. Web dünyasında JS olmadan bir buton bile çalışmaz.

## 2. Hangi Dili Seçmeliyim?
- Amacınız **Web Sitesi yapmak** (Frontend) ise: HTML, CSS ve JavaScript (Tartışmasız).
- Amacınız **Yapay Zeka ve Veri Analizi** ise: Python.
- Amacınız **Kurumsal Sunucu Sistemleri** (Backend) ise: C# veya Java.
- Amacınız **Mobil Uygulama** ise: Swift (iOS), Kotlin (Android) veya Flutter/React Native (Çapraz Platform).
- Amacınız **Oyun Geliştirmek** ise: C++ (Unreal Engine) veya C# (Unity).
