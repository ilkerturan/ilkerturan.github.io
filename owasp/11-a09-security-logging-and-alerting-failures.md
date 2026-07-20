# A09:2025 - Security Logging and Alerting Failures (Güvenlik Günlüğü ve Uyarı Hataları)

Ortalama bir şirketin "Sistemlerine bir Hacker'ın sızdığını" fark etme süresi (Endüstri araştırmalarına göre) **ortalama 200 gündür**. Zafiyet, saldırının kendisi değil; saldırıya uğradığınızı görmemenizi (Körlük) sağlayan loglama eksikliğidir.

---

## 1. Zafiyetin Mantığı
Eğer sisteminizde kamera yoksa (Loglama), bir hırsızın içeri girip aylarca kalıp kalmadığını asla bilemezsiniz. Uygulama düzgün çalışmaya devam eder, ancak arka planda tüm veritabanınız azar azar dışarı sızdırılıyor olabilir. Veya hacker sistemi bozduğunda, geriye dönük "Nasıl girdiler?" sorusunu cevaplayacak bir kayıt (Adli Bilişim izi) bulamazsınız.

## 2. En Sık Görülen Hatalar
- **Kritik Olayların Loglanmaması:** Kullanıcıların siteye girişleri, hatalı parola denemeleri, şifre sıfırlama talepleri ve yetki değişimi (Kullanıcıyken admin olma) gibi hayati işlemlerin hiçbir iz bırakılmadan yapılması.
- **Sadece Yerel Loglama (Local Logging):** Logların uygulamanın çalıştığı sunucunun kendi içine (text dosyası olarak) yazılması. Hacker sunucuyu ele geçirdiğinde yapacağı ilk iş kendi izlerini (logları) silmektir.
- **Alarmların (Alerts) Olmaması:** Loglar tutuluyor olsa bile, bir saldırgan saniyede 10.000 hatalı login (Brute-force) denemesi yaptığında, sistemin hiçbir güvenlik ekibine e-posta/SMS gibi uyarılar (Alert) atmaması.
- **Log Forgery (Log Zehirlenmesi):** Loglanan verinin sanitize edilmemesi (Örn: Kullanıcı Adı kısmına zararlı kod yazan hacker, sistemin log ekranını açan adminin tarayıcısını hackleyebilir - Log XSS).

## 3. Nasıl Korunuruz? (Mimari Savunma)
1. **Merkezi Log Yönetimi (SIEM):** Logları asla uygulamanın olduğu makinede bırakmayın. ELK Stack (Elasticsearch, Logstash, Kibana), Splunk veya Azure Monitor gibi dışarıdaki izole ve merkezi (Centralized) bir log sunucusuna anında (Stream) gönderin.
2. **Kapsamlı Loglama:** Başarılı/Başarısız tüm kimlik doğrulamalarını (Auth), erişim reddi hatalarını (403 Forbidden) ve kritik veri değişimlerini Mutlaka Time-Stamp (Zaman Damgası) ve IP adresleriyle loglayın.
3. **Erken Uyarı Sistemleri (Alerts):** Anormal trafik artışı veya ardışık 50 başarısız giriş gibi senaryolarda otomatik tetiklenen uyarı (Slack, Email) mekanizmaları kurun.
