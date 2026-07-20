# Bölüm 04: Asenkron Programlama (Tarayıcıyı Dondurmamak)

Eğer bir restoranda tek bir garson (Thread) varsa ve garson bir masadan sipariş alıp mutfağa gittiğinde, aşçı yemeği yapana kadar mutfakta dikilip beklerse, diğer tüm masalar aç kalır (Sistem donar). 
Garson siparişi mutfağa bırakmalı, o yemek pişerken (Asenkron - Arka plan) gidip diğer masalarla ilgilenmeli, aşçı "Yemek hazır!" dediğinde geri dönüp yemeği almalıdır.

JavaScript, tarayıcıda tek bir kanalda (Single Thread) çalışır. Uzun sürecek bir işlemde (İnternetten veri indirmek gibi) tarayıcının kilitlenmemesi (donmaması) için Asenkron programlama zorunludur.

---

## 1. Callback Cehennemi ve Promises (Sözler)
Eskiden bu işlem için içi içe geçen ve okuması imkansız olan Callback'ler kullanılırdı (Callback Hell).
Bunu çözmek için **Promise (Söz)** mimarisi icat edildi. Bir fonksiyon size der ki: *"Benden veriyi istedin, hemen veremem ama sana bir SÖZ (Promise) veriyorum, işim bitince (başarılı veya hatalı) sana döneceğim."*

## 2. Async / Await Mimarisi (Zirve Noktası)
Promises yapısı güzeldi ama bolca `.then().catch()` zinciri yazmak gerekiyordu. Sonunda diğer modern dillerden (C#) ilham alınarak `async/await` mimarisi JavaScript'e getirildi.

Asenkron (Arka planda zaman alan) bir kodu, sanki normal yukarıdan aşağı akan Senkron bir kodmuş gibi tertemiz yazmanızı sağlar.

```javascript
// Fonksiyonun başına "async" (Bu fonksiyon arka planda uzun sürecek) yazılır.
const havaDurumunuGetir = async () => {
    try {
        // Sunucuya git ve cevap gelene kadar burada "bekle (await)".
        // Tarayıcı donmaz, arka planda bekler.
        const cevap = await sunucudanVeriIste(); 
        console.log(cevap);
    } catch (hata) {
        console.log("Sunucuya ulaşılamadı!");
    }
}
```
