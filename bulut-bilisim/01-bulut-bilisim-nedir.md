# Bölüm 01: Bulut Bilişim (Cloud Computing) Nedir?

2010'lu yıllardan önce, bir web sitesi veya girişim kurmak istediğinizde, gerçekten fiziksel bir "Sunucu (Server - Güçlü bilgisayar)" kasası satın almanız, ofisinizde klima olan bir odaya koymanız, internet kablolarını bağlamanız ve elektrik kesintilerine karşı jenaratör kurmanız gerekiyordu. Bu modele **On-Premise (Kurum İçi)** denir.

**Bulut Bilişim (Cloud Computing)** ise devasa bir teknolojik devrimdir. İşlemci gücünü, RAM'i, veritabanını ve depolamayı kendi ofisinizdeki teneke kasalardan çıkarıp, internet üzerinden "kullandığın kadar öde" mantığıyla kiralama felsefesidir. Aslında "Bulut" diye bir şey yoktur, bulut sadece "başka birinin devasa bilgisayarıdır" (Örn: Amazon'un, Google'ın, Microsoft'un data centerları).

## 1. Bulut Bilişimin Temel Avantajları

Neden şirketler milyarlarca dolar harcayarak kendi sunucularından Cloud'a göç ettiler?
- **Ölçeklenebilirlik (Scalability):** E-Ticaret sitenizin "Efsane Cuma (Black Friday)" gününde trafiği anlık olarak 100 katına çıkabilir. Kendi ofisinizde sunucunuz olsa, yeni RAM ve CPU sipariş edip takmanız haftalar sürer ve o gün siteniz çöker. Bulut bilişimde ise sadece bir butona basarak (veya otomatik olarak) sunucunuzu saniyeler içinde 100 kat güçlendirebilir (Scale-Up), kampanya bitince ertesi gün eski haline (Scale-Down) döndürebilirsiniz.
- **Kullandığın Kadar Öde (Pay-as-you-go):** Sadece motoru çalıştırdığınız saat ve dakika bazında elektrik/su faturası gibi ödeme yaparsınız. 100 bin dolarlık fiziksel yatırım (CapEx) yapmak yerine, aylık giderlere (OpEx) dönüşür.
- **Yüksek Erişilebilirlik (High Availability):** Sitenizi tek bir kasada tutarsanız o bina yanarsa veriler gider. Bulut sağlayıcıları sizin verinizi dünyadaki farklı ülkelerdeki veri merkezlerine yedekleyerek %99.999 oranında kesintisizlik sunarlar.
- **Sıfır Bakım Maliyeti:** Harddiskiniz mi yandı? İnternet kablosu mu koptu? Bunları dert etmezsiniz, Amazon/Microsoft bunu sizin yerinize saniyeler içinde değiştirir.

## 2. On-Premise (Geleneksel) vs Cloud (Bulut) Örneği

**On-Premise (Kendi Sunucun):** Bir araba satın almaya benzer. Sigortası, bakımı, benzini, arızası tamamen sana aittir. Otoparkta aylarca yatsa bile parasını ödemişsindir, boşa gider. Büyütmek istersen yeni araba alman gerekir.

**Cloud (Bulut):** Bir Uber / Taksi veya araç kiralama çağırmaya benzer. Sadece gittiğin kilometre kadar para ödersin. Arıza yaparsa şoför ilgilenir, sen başka araca geçersin. 2 kişiysen taksi çağırırsın, 10 kişiysen saniyeler içinde minibüs (ölçekleme) çağırabilirsin.

## 3. Bulut Dağıtım Modelleri (Deployment Models)

- **Public Cloud (Genel Bulut):** Donanımların (Sunucuların) AWS, Azure gibi dev şirketler tarafından aynı binada yüzlerce şirkete paylaştırıldığı modeldir. En ucuz ve standart yoldur.
- **Private Cloud (Özel Bulut):** Şirketin çok katı güvenlik kuralları (Örn: Askeri veya çok büyük Bankacılık verisi) varsa, donanımları kimseyle paylaşmaz, tamamen kendine izole edilmiş, fiziksel olarak ayrılmış özel bulut ortamı kurar. Maliyeti inanılmaz yüksektir.
- **Hybrid Cloud (Hibrit Bulut):** İkisinin karışımıdır. Şirket saniyede milyonlarca tıklanan web sitesini Public Cloud'a (AWS) koyar esnesin diye, ama çok gizli müşteri TC kimlik veritabanını ofisteki kendi yeraltı sunucusunda (On-Prem) tutar. En popüler kurumsal modeldir.
