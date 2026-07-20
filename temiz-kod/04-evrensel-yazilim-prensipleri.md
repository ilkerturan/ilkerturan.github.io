# Bölüm 04: Evrensel Yazılım Prensipleri (Senior Vizyonu)

SOLID dışında, bir yazılımcının tecrübesini (Junior vs Senior) ortaya koyan, gündelik hayatı kurtaran efsanevi kısaltmalar vardır.

---

## 1. KISS (Keep It Simple, Stupid)
*"Aptalca olacak kadar basit tut."*
Yazılımcılar genellikle karmaşık (aşırı mühendislik - over-engineering) çözümler üretmeyi "Zeka göstergesi" sanırlar. Aslında zeka, en karmaşık problemi en okunabilir, en basit koda indirebilmektir. Eğer basit bir `if` ile çözülecek bir soruna 3 tane Design Pattern yazıyorsanız, KISS prensibini ihlal ediyorsunuz demektir.

## 2. YAGNI (You Aren't Gonna Need It)
*"Buna ihtiyacın olmayacak."*
Geliştiriciler kod yazarken genellikle *"Belki seneye buraya SMS sistemi de ekleriz"* deyip, SMS altyapısını kodlamaya başlarlar. YAGNI der ki: **Gelecekte olabilecek (ama şu an istenmeyen) hiçbir şey için bugünden kod yazma.** Geleceği tahmin edemezsiniz, yazdığınız kod ölü koda (Dead Code) dönüşür ve sistemi boşuna karmaşıklaştırır. Sadece bugünün problemini çözün.

## 3. DRY (Don't Repeat Yourself)
*"Kendini tekrar etme."*
Yazılımda kopyala-yapıştır en büyük düşmandır. Aynı mantığı (örneğin TC Kimlik numarası doğrulama algoritmasını) projenin iki farklı yerine yazdıysanız, sisteminiz saatli bir bombadır. O mantık bir gün değiştiğinde, diğer yeri güncellemeyi unutursanız sistem patlar. Mantığı tekilleştirin (Fonksiyon/Sınıf).

## 4. Fail-Fast (Hızlı Çök) ve Defensive Programming
Kötü bir sistem hatayı yutar (Gizler) ve çalışmaya devam etmeye çalışır (Örn: Null referanslarla ilerlemek). Bu, hatanın çok alakasız bir yerde (Örn: Veritabanına kayıt atarken) patlamasına neden olur ve sorunu bulmak günlerinizi alır.
**Fail-Fast** der ki: Sistemde ters bir şey (Gelen veri null veya yanlış tipte) gördüğün an, **EN BAŞTA SİSTEMİ ÇÖKERT (Exception Fırlat).** Hatayı olduğu yerde, anında yakalamak (Savunmacı Programlama), yazılımın sağlamlığını (Robustness) artırır.
