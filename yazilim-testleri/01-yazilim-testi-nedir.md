# Bölüm 01: Yazılım Testi Nedir? (Manuel Testlerin Ölümü)

*"Kodu yazdım, F5'e bastım, ekranda denedim çalışıyor. O zaman sorun yok!"* 
Bu cümle, amatör bir yazılımcının kurabileceği en tehlikeli cümledir. Gerçek mühendislikte, insan gözüne ve eline (Manuel Test) asla güvenilmez.

---

## 1. Bir Hatanın (Bug) Keşfedilme Maliyeti
Yazılımda bir kural vardır: **Hata ne kadar geç bulunursa, maliyeti o kadar katlanarak artar.**
1. **Kod yazılırken (Geliştirici bulursa):** Maliyeti 1$ veya 1 dakikadır. Kodu silip düzeltir.
2. **Test aşamasında (Testçi bulursa):** Maliyeti 100$ veya 1 haftadır. İş geri döner, Jira'da süreç uzar.
3. **Canlıda (Müşteri bulursa):** Maliyeti 10.000$ veya itibar kaybıdır. Belki bir banka uygulamasında yanlış kişiye para gider, belki e-ticaret sitesi efsane cuma gecesi çöker.

İşte yazılım testleri, hatayı 3. aşamaya gelmeden, daha 1. aşamadayken "otomatik olarak" yakalamak için yazılır.

## 2. Neden Manuel Test Yetmez?
Manuel test, bir insanın tarayıcıyı açıp forma adını, şifresini yazıp "Kayıt Ol" butonuna basmasıdır. 
Diyelim ki projeye "Şifremi Unuttum" özelliği eklediniz. Bunu eklediğinizde yanlışlıkla "Kayıt Ol" butonunu bozmuş olabilirsiniz (Buna Regresyon - Regression denir).
Bunu anlamak için insanın HER kod eklendiğinde sistemdeki TÜM BUTONLARA tekrar tekrar basması gerekir. Bu imkansızdır.

Ancak **Otomatik Testler (Automated Tests)** saniyeler içinde binlerce butona basar, binlerce form doldurur ve size şunu söyler: *"Yeni yazdığın özellik harika çalışıyor ama Ana Sayfadaki Kayıt butonunu bozdun!"*
