# Bölüm 03: Yapısal Kalıplar (Structural Patterns)

Yapısal kalıplar, bağımsız sınıfların bir araya gelerek nasıl "Uyum İçinde" daha büyük sistemler (yapılar) oluşturacağını açıklar. 

---

## 1. Adapter (Adaptör) Kalıbı
**Problem:** İki farklı sistem birbiriyle konuşmak zorundadır, ancak veri tipleri veya arayüzleri (Interface) tamamen uyumsuzdur. Biri JSON istiyordur, diğeri XML veriyordur. Kodu değiştiremezsiniz (Çünkü kod dışarıdan bir kütüphanedir).
**Analoji:** Çok basittir. İngiltere'ye tatile gittiniz ve prizleri üç dişli. Sizin şarj aletiniz ise iki dişli. İngiliz prizini kıramayacağınız için araya bir **Priz Adaptörü (Adapter)** takarsınız. Sizin cihazınız elektriği bildiği dilden almaya devam eder.

## 2. Facade (Cephe / Önyüz) Kalıbı
**Problem:** Arka planda 15 farklı sınıfın (Veritabanı, Ödeme, SMS, Fatura vb.) sırayla çalışması gereken devasa karmaşık bir iş vardır. Kullanıcıyı (İstemciyi) bu kaosun içine sokmak istemezsiniz.
**Analoji:** Modern bir Ev Sinema Sistemi. Film izlemek istediğinizde (1) Perdeyi indir, (2) Projeksiyonu aç, (3) Işıkları kapat, (4) Ses sistemini sinema moduna al... gibi 20 işlemi tek tek kumandalardan yapmazsınız. Akıllı eve "Film Modunu Aç (Facade)" dersiniz, o arka plandaki tüm alt sistemleri sizin adınıza koordine eder.

## 3. Decorator (Dekoratör / Süsleyici) Kalıbı
**Problem:** Bir sınıfın davranışını değiştirmek istiyorsunuz ama o sınıfı miras almak (Inheritance) işleri içinden çıkılmaz bir hale (Sınıf patlaması) getiriyor. Yeni özellikleri çalışma anında (Run-time) eklemek istiyorsunuz.
**Analoji:** Starbucks'a girip "Sade Kahve" aldınız. Sonra üzerine "Süt" eklettiniz (Dekore ettiniz - Fiyatı arttı). Sonra üzerine "Karamel" eklettiniz (Bir kez daha dekore ettiniz). Kahve nesneniz bozulmadı, sadece üstüne giydirmeler yapılarak özellikleri ve davranışı değiştirildi.
