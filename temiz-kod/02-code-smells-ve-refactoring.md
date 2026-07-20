# Bölüm 02: Kod Kokuları ve Refactoring

Kodunuz çalışıyor olabilir, ancak kötü mühendislik belirtileri veriyorsa bu "Kod Kokusu (Code Smell)" olarak adlandırılır. Refactoring (Yeniden Düzenleme) ise sistemin dış davranışını (çalışmasını) bozmadan, iç yapısını temizleme sanatıdır.

---

## 1. En Ünlü Kod Kokuları (Code Smells)

### A. Spaghetti Code (Spagetti Kod)
İç içe geçmiş sayısız `if-else` blokları, karmaşık `for` döngüleri. Akışın nereden başlayıp nerede bittiğini anlamak için saatler harcarsınız.
*Çözüm:* Erken Çıkış (Guard Clauses) kullanın. Hata durumlarında `if` ile bloğu uzatmak yerine doğrudan `return` edip kodun düz akmasını sağlayın.

### B. God Object (Tanrı Sınıfı)
Projede bir `Manager` veya `Helper` sınıfı vardır ve tam 5000 satırdır. Kullanıcı kaydeder, mail atar, fatura keser. Her şeyi bilir, her şeyi yapar.
*Çözüm:* Bu devasa sınıfı, her biri tek bir iş yapan (SRP) küçük sınıflara bölün.

### C. Sihirli Sayılar (Magic Numbers)
Kodun ortasında aniden `if (status == 4)` yazar. 4 nedir? Neden 4? Okuyan kişi bunu bilemez.
*Çözüm:* O sayıyı `const int APPROVED_STATUS = 4;` veya bir Enum olarak tanımlayın. 

### D. Duplicated Code (Tekrarlayan Kod - Kopyala/Yapıştır)
Aynı kod bloğu projenin 3 farklı yerinde kopyalanmıştır. O koddaki bir hatayı düzeltmek istediğinizde, 3 yeri de bulup düzeltmeniz gerekir (Unutursanız sistem patlar).
*Çözüm:* O kod parçasını bir fonksiyona çıkarın ve 3 yerden de o fonksiyonu çağırın. (DRY Prensibi)

## 2. Refactoring Ne Zaman Yapılır?
Refactoring ayrı bir "görev (Task)" değildir. Kod yazarken aynı anda yapılır. 
TDD (Test Driven Development) yaklaşımında döngü şudur: **Red** (Testi yaz ve patlat) -> **Green** (Çalışan en çirkin kodu yaz) -> **Refactor** (Kodu şimdi temizle).
