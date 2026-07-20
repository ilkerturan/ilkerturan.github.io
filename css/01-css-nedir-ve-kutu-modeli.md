# Bölüm 01: CSS Nedir ve Box Model (Kutu Modeli)

HTML sadece bir iskelettir demiştik. İskelete et, deri, saç ve renk ekleyen sihirbazın adı **CSS (Cascading Style Sheets - Basamaklı Stil Şablonları)**'dır.

---

## 1. CSS Nasıl Çalışır? (Seçiciler)
CSS'in mantığı basittir: HTML içindeki bir etiketi (veya etiket grubunu) seçersin ve ona stil uygularsın.

*   **Etiket Seçici:** Tüm paragrafları (`<p>`) seç.
*   **Sınıf (Class) Seçici:** Önünde `.` (nokta) olanları seç. Aynı özellik birden fazla yere uygulanacaksa kullanılır.
*   **Kimlik (ID) Seçici:** Önünde `#` (diez) olanları seç. Sayfada sadece tek 1 tane olması gereken çok özel elementler için kullanılır.

```css
/* Tüm butonları kırmızı yap */
button { background-color: red; }

/* Class'ı "onemli-yazi" olanları kalın yap */
.onemli-yazi { font-weight: bold; }

/* Sadece ID'si "ana-baslik" olanın rengini mavi yap */
#ana-baslik { color: blue; }
```

## 2. Kutu Modeli (Box Model) - En Kritik Konu!
Web'deki her şey ama her şey görünmez bir "Kutu"dur. O yuvarlak gördüğünüz butonlar, oval resimler bile aslında dikdörtgen bir kutunun köşelerinin yuvarlatılmış (border-radius) halidir.
Her kutunun 4 temel bileşeni vardır:

1.  **Content (İçerik):** Yazının veya resmin kendisi.
2.  **Padding (İç Boşluk):** Yazı ile kutunun sınır çizgisi (çerçeve) arasındaki mesafe. Butonun "tombul" görünmesini sağlar.
3.  **Border (Sınır/Çerçeve):** Kutuyu saran çizgi.
4.  **Margin (Dış Boşluk):** Sizin kutunuz ile diğer kutular arasındaki "Sosyal Mesafe". Kutuların birbirine yapışmasını engeller.

```css
.kutu {
    padding: 20px; /* İçerik ferahlar */
    border: 2px solid black; /* Çerçeve çizilir */
    margin: 30px; /* Diğer kutuları kendinden uzak tutar */
}
```
