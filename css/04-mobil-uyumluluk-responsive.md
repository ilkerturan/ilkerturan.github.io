# Bölüm 04: Mobil Uyumluluk (Responsive Design)

Kullanıcıların %80'i web sitenize cep telefonundan girecektir. Bilgisayarda yan yana 4 sütun halinde harika görünen e-ticaret ürünleriniz, telefonda yan yana sığmaya çalışırsa ürünler ezilir ve karınca duasına döner.

Masaüstünde yan yana 4, tablette 2, telefonda ise alt alta 1 ürün gösterme sanatına **Duyarlı/Uyumlu Tasarım (Responsive Design)** denir.

---

## 1. Media Queries (@media)
CSS'in "Eğer ekran şu boyuttan küçükse, tasarım kurallarını değiştir" deme yöntemidir.

```css
/* STANDART MASAÜSTÜ TASARIMI */
.urun-listesi {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; /* 4 Sütun */
}

/* TABLET İÇİN KURAL (Genişliği en fazla 900px olan ekranlar) */
@media (max-width: 900px) {
    .urun-listesi {
        grid-template-columns: 1fr 1fr; /* 2 Sütuna düşür */
    }
}

/* TELEFON İÇİN KURAL (Genişliği en fazla 600px olan ekranlar) */
@media (max-width: 600px) {
    .urun-listesi {
        grid-template-columns: 1fr; /* Tek sütun (Alt alta) yap */
    }
}
```

## 2. Mobile-First (Önce Mobil) Yaklaşımı
Modern dünyada kod yazmaya önce Masaüstü tasarımdan başlanmaz. Önce Telefon (`max-width` yerine telefona uygun ana kodlar) için kod yazılır. Sonra ekran büyüdükçe (`min-width: 768px`) tasarım genişletilir. Bu felsefeye **Mobile-First** denir ve çok daha performanslıdır.
