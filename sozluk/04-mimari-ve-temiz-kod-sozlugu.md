# Teknik Sözlük 4: Mimari, Tasarım ve Temiz Kod (Clean Code)

Bir kodun sadece çalışması yetmez; 5 yıl sonra şirkete yeni giren biri tarafından da okunabilmesi ve geliştirilebilmesi gerekir. İşte mühendisliğin kalitesi.

---

*   **Spaghetti Code (Spagetti Kod):** Nereden başladığı, nerede bittiği belli olmayan, her şeyin birbirine girdiği çirkin ve okunamaz kod.
*   **Code Smell (Kod Kokusu):** Bir kodda, "Burada bir şeyler yanlış, sistem gelecekte patlayacak" hissini veren tasarım kusurları (Örn: 2000 satırlık devasa bir sınıf).
*   **Refactoring (Yeniden Yapılandırma):** Çalışan, işini yapan bir kodu; ÇALIŞMASINI BOZMADAN silip güzelleştirerek tekrar yazma işlemidir.
*   **SOLID:** Kodun esnek, değiştirilebilir ve bozulmaz olmasını sağlayan 5 evrensel prensibin baş harfi. 
*   **Design Pattern (Tasarım Şablonu):** Sizden önce yaşamış milyonlarca yazılımcının aynı sorunu çözmek için bulduğu ve kabul gördüğü "Hazır Mimari Reçeteler".
*   **Singleton Pattern:** Sistemde bir nesnenin (Örn: Veritabanı bağlantısı) sadece "1 Kez (Single)" yaratılmasını sağlayan kalıp.
*   **Factory Pattern:** Nesneleri "new" kelimesiyle dağınık üretmek yerine, üretim işini tek bir Fabrikaya (Sınıfa) devretme kalıbı.
*   **Dependency Injection (Bağımlılık Enjeksiyonu):** Bir sınıfın, çalışmak için ihtiyaç duyduğu diğer sınıfları kendi içinde üretmeyip, DIŞARIDAN (Parametre olarak) hazır almasıdır. Sistemi LEGO gibi sök-tak yapar.
