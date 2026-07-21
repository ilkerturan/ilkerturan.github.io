# Bölüm 02: Kutu Modeli (Box Model)

Web tasarımında her HTML elemanı (buton, div, paragraf) gizli bir **kutu** olarak düşünülür. Bu kutuyu anlamadan web sitesi yapılamaz.

## 1. Kutu Modelinin Parçaları

İçten dışa doğru 4 temel katman vardır:
1. **İçerik (Content):** Yazının veya resmin kendisi (width ve height ile ayarlanır).
2. **Padding (İç Boşluk):** İçerik ile kutunun çerçevesi arasındaki boşluktur.
3. **Border (Kenarlık):** Kutuyu saran çizgidir.
4. **Margin (Dış Boşluk):** Sizin kutunuz ile yandaki diğer kutular arasındaki mesafedir.

```css
.kutu {
    /* 1. İçerik Boyutu */
    width: 200px;
    height: 100px;
    
    /* 2. İç Boşluk (Yazı çerçeveden 20px uzaklaşsın) */
    padding: 20px;
    
    /* 3. Kenarlık (2px kalınlığında, düz, siyah çizgi) */
    border: 2px solid black;
    
    /* 4. Dış Boşluk (Etrafındaki diğer kutulardan 15px uzaklaşsın) */
    margin: 15px;
}
```

## 2. Hayat Kurtaran Özellik: Box-Sizing

Normalde 200px genişlik verdiğiniz bir kutuya 20px padding eklerseniz, kutunun gerçek genişliği 240px'e çıkar ve tasarımınız bozulur. Bunu önlemek için daima şu kodu kullanın:

```css
/* Sayfadaki HER ŞEYE (*) uygula */
* {
    box-sizing: border-box;
}
```
Bu kod, "Ben sana 200px verdiysem 200px kal, padding'i içe doğru daraltarak ver" demektir.
