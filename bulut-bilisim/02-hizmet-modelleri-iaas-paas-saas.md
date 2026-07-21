# Bölüm 02: Bulut Hizmet Modelleri (IaaS, PaaS, SaaS)

Buluttan bir hizmet (sunucu vs) kiralarken, "sorumluluğun" ne kadarını sizin, ne kadarını Bulut Şirketinin (Amazon, Google) alacağına göre hizmet modelleri üç ana kategoriye ayrılır. 

Bunu anlamak için dünyaca ünlü **"Pizza (Pizza as a Service)"** benzetmesini kullanacağız.

## 0. Geleneksel IT (Evde Pizza Yapmak - On Premise)
Her şey sizin sorumluluğunuzdadır. Peyniri satın alırsınız, hamuru siz açarsınız, fırını siz alırsınız, elektriği siz ödersiniz, masayı siz kurarsınız. Yazılım dünyasındaki karşılığı: Ağı (Network), donanımı, işletim sistemini, güncellemeleri ve yazdığınız kodu tamamen kendi şirketinizin ayarlamasıdır.

## 1. IaaS (Infrastructure as a Service) - Altyapı Hizmeti
**Pizza Örneği:** Dondurulmuş pizza satın alıp (Peyniri, hamuru hazır), kendi evinizdeki fırında pişirip kendi masanızda yemektir. Alt katmanı başkası hazırlamıştır.

**Yazılım Karşılığı:** AWS (EC2) veya Azure (Virtual Machines). Amazon size sadece "Sanal bir Bilgisayar (Sunucu)" verir. Bu bilgisayarın içine hangi İşletim Sistemini (Windows mu, Linux mu) kuracağınız, virüs programı ayarlamaları, güncelleme (Patch) yapma sorumluluğu TAMAMEN SİZE AİTTİR. Amazon sadece fişin takılı olduğunu ve bilgisayarın çalıştığını garanti eder. En fazla özgürlüğün, ama aynı zamanda en fazla yönetim sorumluluğunun olduğu yerdir.

## 2. PaaS (Platform as a Service) - Platform Hizmeti
**Pizza Örneği:** Pizzayı Domino's (Paket servis) sipariş edip kapıya getirtmek, ancak masayı, kola bardağını ve yemeyi kendi evinizde kendi sorumluluğunuzda yapmaktır. Pizzayı pişirme derdinden kurtuldunuz.

**Yazılım Karşılığı:** AWS (Elastic Beanstalk) veya Heroku. Siz sadece Python veya Java **kodlarınızı** sisteme yüklersiniz. Arkada hangi işletim sistemi dönüyor, Windows'a güncelleme mi gelmiş, donanım mı yanmış zerre kadar umurunuzda olmaz. Platform tüm bu alt yapıyı sizin için otomatik yönetir, ölçekler ve kodunuzu ayağa kaldırır. Yazılımcıların sadece kod yazmaya odaklanmasını sağlar.

## 3. SaaS (Software as a Service) - Yazılım Hizmeti
**Pizza Örneği:** Doğrudan çok lüks bir Pizza restoranına gidip oturmaktır. Fırınla, hamurla, masayı silmekle hiçbir alakanız yoktur. Önünüze gelir, yersiniz ve çıkarsınız. Sorumluluğunuz sıfırdır, sadece menüyü seçersiniz (Kullanırsınız).

**Yazılım Karşılığı:** Google Gmail, Netflix, Spotify, Microsoft Office 365, Salesforce. Ürünün içindeki kodlar nedir, arkada nerede barındırılıyor hiçbirini bilmezsiniz ve yönetemezsiniz. İnternet üzerinden doğrudan Son Kullanıcı (End User) olarak uygulamaya girer ve kullanırsınız. Güncellemeleri şirket kendi kendine gece yapar, sizin ruhunuz duymaz.

## Özet Tablosu

| Sorumluluk Kime Ait? | IaaS (Altyapı) | PaaS (Platform) | SaaS (Yazılım) |
|----------------------|----------------|-----------------|----------------|
| **Uygulama Kodu**    | SİZ            | SİZ             | Bulut Sağlayıcı|
| **Veriler**          | SİZ            | SİZ             | Bulut Sağlayıcı|
| **İşletim Sistemi**  | SİZ            | Bulut Sağlayıcı | Bulut Sağlayıcı|
| **Sunucu Donanımı**  | Bulut Sağlayıcı| Bulut Sağlayıcı | Bulut Sağlayıcı|
| **Network (Ağ)**     | Bulut Sağlayıcı| Bulut Sağlayıcı | Bulut Sağlayıcı|
