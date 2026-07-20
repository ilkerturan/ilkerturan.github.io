# Bölüm 03: Sunucusuz (Serverless) Mimari

2000'lerde sunucuları kendimiz kuruyorduk (On-Premise). 2010'larda kiralayıp IaaS/PaaS yapıyorduk. Günümüzde (2020'ler ve sonrası) ise oyunun kurallarını değiştiren devrim geldi: **Serverless (Sunucusuz)**.

---

## 1. Sunucusuz Ne Demek? Gerçekten Sunucu Yok mu?
İsmine aldanmayın; kodlarınız elbette fiziksel bir sunucuda çalışıyor. Ancak buradaki vizyon şudur: **"Ortada sizin kiraladığınız, ayağa kaldırdığınız veya yöneteceğiniz bir sunucu YOK."**

## 2. Neden Serverless? (Faturalandırma Devrimi)
Normal bir IaaS veya PaaS sunucusu kiraladığınızda, sitenize o gün hiç müşteri gelmese bile (gece 03:00'te herkes uyurken bile) sunucu çalıştığı için aylık sabit kiranızı (Örn: 50$) ödersiniz. Motor hep rölantide çalışır.

**Serverless (Örn: AWS Lambda veya Azure Functions)** ise motoru tamamen kapatır.
Müşteri gelip gece 03:00'da "Sepete Ekle" butonuna tıkladığında;
1. Sistem anında tetiklenir (Trigger).
2. Sizin "SepeteEkle" kodunuzu alır.
3. O kodu çalıştırmak için geçici bir sunucuyu 0.1 saniyeliğine ayağa kaldırır.
4. Kod çalışır ve biter.
5. Sunucu anında yok edilir.

Amazon size sadece o 0.1 saniyelik "Çalışma (Execution)" süresi için fatura keser. Yani sitenize 1 ay boyunca hiç kimse girmezse faturanız **0 TL** gelir. Ayda 1 milyon kişi girerse fatura 5$ gelir. Bu inanılmaz bir devrimdir ve kod artık 7/24 uyanık beklemek zorunda değildir.
