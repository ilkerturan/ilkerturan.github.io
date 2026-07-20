# A06:2025 - Insecure Design (Güvensiz Tasarım)

**"Hatasız kod yazabilirsiniz, ancak tasarımınız (mantığınız) kusurluysa hacklenirsiniz."** 
OWASP'ın güvenlik yaklaşımında "Sola Kaydır (Shift-Left)" felsefesini temsil eden en önemli maddedir. Güvenlik, kod yazıldıktan sonra değil, Mimari Tasarım aşamasında başlar.

---

## 1. Zafiyetin Mantığı
Bir koda dışarıdan yama (Patch) yaparak "Güvensiz Tasarımı" düzeltemezsiniz. 
Örneğin; bir e-ticaret sitesinde ürünleri sepete eklerken fiyatı istemciden (Kullanıcının tarayıcısından) alıyorsanız, kodunuzda açık yoktur, ancak tasarımınız faciadır. Kullanıcı sepetteki ürünün fiyatını 1 TL yapıp gönderebilir.

## 2. En Sık Görülen Hatalar
- **Sınırsız Deneme Hakkı:** Parola ekranında veya OTP (SMS Şifresi) ekranında kullanıcıya sınırsız deneme hakkı (Rate Limiting yokluğu) sunulması (Brute Force saldırılarına kapı açar).
- **Gizli Sorular:** Şifre sıfırlama mekanizmasında "En sevdiğiniz renk?" gibi sosyal mühendislikle (Instagram'a bakarak) çok kolay bulunabilecek sorular sormak.
- **Toplu Veri İndirme:** Sistemde bir kullanıcının günde 100 işlem yapması normalken, saniyede 10.000 veri çekmesine mimari olarak (İş mantığı) izin vermek (Botlarla veri hırsızlığı / Scraping).
- **Business Logic Flaws:** Promosyon kodunu aynı anda 5 farklı sekmeden gönderip, kodun Race Condition (Yarış Durumu) yaratarak 5 kez kullandırılması.

## 3. Nasıl Korunuruz? (Mimari Savunma)
1. **Threat Modeling (Tehdit Modelleme):** Kod yazmaya başlamadan önce beyaz tahta üzerinde "Bir hacker bu sisteme nasıl saldırır? En zayıf halkamız neresi?" sorularını sormak (STRIDE metodolojisi).
2. **Rate Limiting (Hız Sınırlandırma):** API'lere ve login ekranlarına mutlaka kişi, IP veya Token bazlı istek sınırı (Örn: Dakikada 10 istek) koymak.
3. **Kritik İşlemlerde Çift Onay:** Para transferi veya parola değişimi gibi hassas iş mantıklarında her zaman sunucu tarafında ekstra güvenlik kontrolleri (Örn: Eski şifreyi tekrar sormak) sağlamak.
