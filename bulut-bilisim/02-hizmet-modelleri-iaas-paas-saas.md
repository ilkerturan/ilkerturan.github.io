# Bölüm 02: Hizmet Modelleri (Pizza Analojisi)

Buluttan bir hizmet kiralarken "Sorumluluk kimde olacak?" sorusuna göre 3 ana model vardır. Dünyadaki en ünlü analoji olan **"Pizza as a Service" (Hizmet Olarak Pizza)** ile bu modelleri anlatalım.

---

## 0. On-Premise (Yerel Sunucu) - Evde Kendi Pizzanı Yapmak
Hamurunu sen yoğurursun, malzemeyi sen dizersin, fırını sen alırsın, elektriği sen ödersin ve masayı sen kurarsın.
**Yazılımda:** Sunucuyu satın almak, işletim sistemini kurmak, güvenliği sağlamak, kodu yazmak ve veritabanını kurmak... Her şey (100%) sizin sorumluluğunuzdadır.

## 1. IaaS (Infrastructure as a Service) - Dondurulmuş Pizza Almak
Markete gidip hazır dondurulmuş pizzayı alırsınız. Ama onu evdeki fırında yine sizin pişirmeniz, elektrik yakmanız ve masayı kurmanız gerekir.
**Yazılımda (Örn: AWS EC2, Azure VM):** Amazon size boş bir işletim sistemi (Windows/Linux) ve donanım verir. Ancak içine veritabanı kurmak, güvenlik güncellemelerini yapmak ve programı kurmak yine size aittir. Altyapı onundur, yönetim sizindir.

## 2. PaaS (Platform as a Service) - Pizzayı Eve Sipariş Etmek
Pizzayı pişirmekle veya malzemesiyle uğraşmazsınız, hazır kapınıza gelir. Sadece masayı kurup içeceğinizi koyarsınız.
**Yazılımda (Örn: Azure App Service, Heroku):** Sunucu, işletim sistemi, veritabanı kurulumu... Hiçbirini siz yapmazsınız (Hatta Windows veya Linux mu kullanıldığını bile göremezsiniz). Sizin tek bir sorumluluğunuz vardır: **Yazdığınız kodu klasör olarak oraya sürükleyip bırakmak.** Geri kalan tüm ayağa kaldırma ve yayınlama işini platform kendisi yapar.

## 3. SaaS (Software as a Service) - Restorana Gidip Pizza Yemek
Hiçbir şeye elinizi sürmezsiniz. Gidersiniz, sipariş verirsiniz, yersiniz ve hesabı ödersiniz. Bulaşıkları bile onlar yıkar.
**Yazılımda (Örn: Gmail, Netflix, Salesforce):** Ortada bir kod yazma, veritabanı veya kurulum yoktur. Her şey mükemmel şekilde internette (tarayıcıda) hazırdır. Sadece kullanıcı adı ve şifrenizle girip "Son Kullanıcı" olarak sistemi kiralarsınız (Aylık abonelik).
