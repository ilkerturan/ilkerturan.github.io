# Bölüm 04: Kanban Panosu ve İş Takibi (Jira)

Şirketlerde yüzlerce iş (Ticket/Task) havada uçuşurken bunların kaybolmaması için görsel bir takip sistemine ihtiyaç vardır. Dünyadaki yazılım şirketlerinin %90'ı Jira, Trello veya Azure DevOps gibi araçlarla **Kanban** tahtasını kullanır.

---

## 1. Kanban Tahtası Nedir?
Kanban (Japonca: Görsel Kart), işlerin üretim hattındaki (Örn: Toyota fabrikası) akışını görselleştiren bir sistemdir.
Yazılımda bir pano (Board) genelde şu sütunlardan oluşur:

*   **To Do (Yapılacaklar):** Planlamada takımın üzerine aldığı henüz başlanmamış işler.
*   **In Progress (Devam Edenler - In Dev):** O an yazılımcının kodunu yazdığı iş. Kural: Bir yazılımcı aynı anda In Progress'e 3 iş birden alamaz. Odaklanma şarttır.
*   **In Test (Testte):** Yazılımcı kodlamayı bitirir, kartı buraya sürükler. QA (Testçi) bu kartı alıp testleri çalıştırır.
*   **Done (Bitti):** İş kodlandı, test edildi ve Canlı ortama (Production) çıkmaya hazır.

## 2. Story Points (Hikaye Puanları) Felsefesi
Bir işi yazılımcıya atadığınızda "Bu iş kaç saat sürer?" demek geleneksel hantal yöneticilerin tarzıdır. Yazılımda saati tahmin etmek imkansızdır (Çünkü bazen bir virgül hatasını bulmak 3 gün sürer).

Agile der ki: İşleri zamanla (Saat/Gün) ölçmeyin, **Zorluk / Karmaşıklık Derecesiyle (Effort)** ölçün.
Bunun için Fibonacci Dizisi (1, 2, 3, 5, 8, 13...) kullanılır.

*   **1 Puan:** Çok basit, butona renk verme işi.
*   **3 Puan:** Orta düzey, yeni bir veritabanı tablosu açma.
*   **8 Puan:** Oldukça karmaşık, ödeme sistemini entegre etme.

Takım üyeleri **Planning Poker (Planlama Pokeri)** oynarlar. Bir iş karta yazılır, masadaki her yazılımcı o işin zorluğuna (Puanına) oy verir. Eğer biri 1 Puan, diğeri 8 Puan verdiyse, "Neden bu kadar zıt düşünüyoruz?" diye tartışırlar ve ortak bir puanda uzlaşırlar.
