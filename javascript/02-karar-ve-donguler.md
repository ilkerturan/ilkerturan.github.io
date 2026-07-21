# Bölüm 02: Karar Yapıları ve Döngüler

Programlamanın temel mantığı "Eğer şöyleyse şunu yap" veya "Bu işlemi 10 kere tekrarla" temellerine dayanır.

## 1. Mantıksal Kararlar (If - Else)

```javascript
const kullaniciYasi = 16;

if (kullaniciYasi >= 18) {
    // Şart doğruysa (True) burası çalışır
    console.log("Ehliyet alabilirsiniz.");
} else if (kullaniciYasi === 17) {
    // İkinci ihtimal
    console.log("Seneye alabilirsiniz.");
} else {
    // Hiçbir şart uymuyorsa (False) burası çalışır
    console.log("Ehliyet alamazsınız.");
}
```
> **Not:** JavaScript'te eşitlik kontrolü yaparken daima **üç eşittir (`===`)** kullanın. (Çünkü `==` kullanırsanız metin olan "5" ile sayı olan 5'i aynı sanabilir).

## 2. Döngüler (Loops)

Aynı işi tekrar tekrar yapmak (Örneğin listedeki 100 kullanıcının ekrana basılması) için döngüler kullanılır.

### For Döngüsü (Klasik)
```javascript
// i 0'dan başlasın, 5'ten küçük olduğu sürece dönsün, her turda 1 artsın.
for (let i = 0; i < 5; i++) {
    console.log("Döngü tur sayısı: " + i);
}
// Çıktı: 0, 1, 2, 3, 4
```

### While Döngüsü (Şarta Bağlı)
```javascript
let pilSeviyesi = 3;

// Şart doğru olduğu sürece döner
while (pilSeviyesi > 0) {
    console.log("Çalışmaya devam. Pil: " + pilSeviyesi);
    pilSeviyesi--; // Pili 1 azalt
}
console.log("Cihaz kapandı.");
```
