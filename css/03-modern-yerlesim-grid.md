# Bölüm 03: Modern Yerleşim - CSS Grid (Izgara Sistemi)

Flexbox tek boyutlu (sadece yan yana VEYA sadece alt alta) harikalar yaratırken; karmaşık iki boyutlu (hem satır hem sütun) dergi mizanpajı, e-ticaret ürün listesi veya satranç tahtası gibi yapılar için **CSS Grid** icat edilmiştir.

---

## 1. Neden Grid?
Ekranda 3 sütunlu ve 2 satırlı bir fotoğraf galerisi yapmak istiyorsunuz. Bunu Flexbox ile yapmak zordur çünkü satırlar kendi başına hareket eder. Grid ise ekrana görünmez bir "Izgara" çizer.

## 2. Satır ve Sütunları Tanımlamak
Yine Flexbox'taki gibi bir "Anne" taşıyıcıya (Container) komut veriyoruz.

```css
.galeri {
    display: grid; /* Izgara sistemini başlat */
    
    /* Yan yana 3 sütun olsun, her biri eşit yer (1 fraction) kaplasın */
    grid-template-columns: 1fr 1fr 1fr; 
    
    /* Kutuların (resimlerin) arasına 20 piksel boşluk bırak */
    gap: 20px; 
}
```

Sadece bu kodla, HTML'in içine attığınız ilk 3 resim yan yana dizilir, 4. resim otomatik olarak alt satıra geçer. Kutuların arasına boşluk vermek için margin'lerle uğraşmanıza gerek kalmaz, `gap` (boşluk) komutu tüm ızgara çizgilerinin arasını kusursuzca açar.
