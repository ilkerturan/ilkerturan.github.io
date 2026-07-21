# Bölüm 02: Versiyon Kontrol Stratejileri (Git Flow)

Eğer CI/CD (Otomasyon) bir tren ise, **Git (Versiyon Kontrol Sistemi)** o trenin üzerinde gittiği Raylardır. Raylar yamuksa tren kesinlikle raydan çıkar.

Ekibinizdeki 5 yazılımcı "Main (Master)" isimli ana koda (Canlıdaki çalışan mükemmel koda) aynı anda "Palabdır küldür" özellik (Commit) gönderirse, kimin neyi bozduğu anlaşılamaz. Bu yüzden sektörde kurumsallaşmış "Dallanma Stratejileri (Branching Strategies)" kullanılır.

## 1. En Ünlü Strateji: GitFlow (Ağır Abilerin Yolu)
Vincent Driessen tarafından yaratılmış, finans ve bankacılık gibi hata payı sıfır olması gereken kurumsal projelerin vazgeçilmez stratejisidir. Bolca kuralı vardır.

**Temel Dalları (Branches):**
- **Main (veya Master):** Kutsaldır! Yalnızca ve yalnızca Müşterinin şu an internette kullandığı CANLI SÜRÜMÜ (Örn: v1.0.0) barındırır. Buraya asla doğrudan kod (Commit) yazılamaz!
- **Develop (Geliştirme):** Yazılımcıların asıl ana üssüdür. Gelecekte çıkacak olan sürümün (Örn: v1.1.0) test edildiği, son hali alan kararlı daldır.

**Geçici (Destek) Dalları:**
- **Feature (Özellik):** Sizden "Sepete ekle" özelliği istendi. "Develop" dalından bir kopya alıp `feature/sepet-ekle` adında KENDİ özel dalınızı yaratırsınız. 3 gün kendi dalınızda çalışırsınız. İşiniz bittiğinde kodunuzu tekrar "Develop" dalına birleştirirsiniz (Merge / Pull Request).
- **Release (Sürüm Çıkışı):** Develop dalı "Hazır, artık canlıya çıkabiliriz" noktasına geldiğinde, buradan `release/1.1.0` diye bir dal ayrılır. Bu dalda artık SADECE son dakika ufak hataları (Bug) çözülür, yeni bir buton/özellik ASLA eklenemez. Testler bittiğinde bu dal "Main" dalına atılır (ve Canlıya çıkar).
- **Hotfix (Acil Yangın):** Canlı sitede (Main'de) aniden sepet çöktü! Müşteri kredi kartı çekemiyor. Develop dalında da bir sürü yarım iş var. Ne yapacağız? Main dalından ANINDA `hotfix/acil-sepet-sorunu` diye bir dal çıkılır. Hemen hata 10 dakikada düzeltilir ve direkt "Main" dalına (Acil yama olarak) basılır. (Tabi Develop'a da yansıtılır ki unutulmasın).

## 2. GitHub Flow (Agile ve Modern Şirketlerin Yolu)
GitFlow çok hantal, çok fazla dalı olan (Bürokratik) bir yapıdır. Eğer günde 5 defa canlıya kod atıyorsanız (SaaS ürünler), GitFlow size işkence olur. O yüzden GitHub kendi hafif felsefesini yarattı.
- Tek bir ana dal vardır: **Main.**
- Herhangi bir özellik veya hata çözümü için Main'den bir `Feature` branch açarsınız.
- Kodunuzu bitirir, PR (Pull Request - Kod İnceleme Talebi) açarsınız. Başka bir yazılımcı kodunuzu okuyup (Code Review) onaylarsa, kodunuz direkt MAIN'e (Yani canlıya) akar!
- Hızlı, çevik (Agile) ve Sürekli Dağıtıma (Continuous Deployment) en uygun stratejidir.
