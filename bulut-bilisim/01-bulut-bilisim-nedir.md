# Bölüm 01: Bulut Bilişim Nedir? (Başkasının Bilgisayarı)

Yazılım dünyasında o harika C# API'lerini yazdık, HTML'i bağladık, CI/CD kurduk ve uygulamanın "Canlıya (Production)" çıkması gerekti. Eskiden şirketlerin bodrum katlarında klimalarla soğutulan "Sistem Odaları (On-Premise)" olurdu.
Günümüzde ise herkes "Bulut" kullanıyor.

---

## 1. Bulut (Cloud) Nedir?
Bulut, sihirli bir gökyüzü teknolojisi değildir. **Bulut, basitçe başkasının (genellikle Amazon, Google veya Microsoft'un) devasa veri merkezlerindeki bilgisayarıdır.**
Siz bir sunucu satın almazsınız, onların bilgisayarlarındaki işlem gücünü, RAM'i ve hard diski "kiralarsınız".

## 2. Neden Kendi Sunucularımızdan Vazgeçtik?
Eğer kendi ofisinize fiziksel bir sunucu alırsanız şu dertlerle uğraşırsınız:
1. **Elektrik Kesintisi:** Jeneratör almak zorundasınız.
2. **Yangın / Deprem:** Odanız yanarsa tüm şirket verisi yok olur.
3. **Donanım Eskimesi:** Her 3 yılda bir yeni işlemci ve RAM almak zorundasınız.
Bulutta ise bunların hiçbirini düşünmezsiniz, sorumluluk Amazon veya Microsoft'tadır.

## 3. Asıl Sihir: Ölçeklenebilirlik (Scalability)
Bulutun dünyayı ele geçirmesinin asıl sebebi **Esneklik (Elasticity)**'tir.
Diyelim ki bir e-ticaret siteniz var ve tek bir sunucuda çalışıyor. **Efsane Cuma (Black Friday)** günü geldi ve sitenize aniden 1 milyon kişi saldırdı.
- *Eski Sistemde:* Siteniz anında çöker, müşteri kaybedersiniz. Yeni sunucu sipariş edip kurmak 1 ay sürer.
- *Bulut Sisteminde:* Otomatik Ölçeklendirme (Auto Scaling) sayesinde, sistem trafiğin arttığını anlar ve gece yarısı saat 00:01'de saniyeler içinde **100 tane yeni sunucu kiralayıp** ayağa kaldırır. Müşteriler sıfır kasma ile alışverişini yapar. Sabah trafik düştüğünde sistem fazladan açtığı 99 sunucuyu anında çöpe atar ve siz sadece o gece kullanılan 8 saatlik fazladan gücün faturasını ödersiniz.
İşte Bulut tam olarak budur!
