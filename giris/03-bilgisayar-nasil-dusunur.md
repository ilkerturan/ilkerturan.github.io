# Bölüm 03: Bilgisayar Nasıl Düşünür? (1 ve 0 Felsefesi)

Siz ekranda renkli videolar izlerken, muazzam grafikli oyunlar oynarken veya bu metni okurken, bilgisayarın arka planda gördüğü tek şey vardır: **1 ve 0'lar (Binary/İkilik Sistem).**

Peki bilgisayar neden bizim gibi Türkçe veya İngilizce değil de sadece 1 ve 0'larla çalışır?

## 1. Elektriğin Mantığı ve Transistörler
Bilgisayar temelde devasa bir elektrik devresidir. İçindeki işlemcide (CPU) milyarlarca küçük anahtar (şalter) bulunur. Bu mikroskobik şalterlere **Transistör** denir.
Bir transistörün (şalterin) sadece iki durumu olabilir:
- **0 (Açık Devre - Kapalı):** O kablodan elektrik geçmiyor demektir.
- **1 (Kapalı Devre - Açık):** O kablodan elektrik geçiyor (Örn: 5 Volt) demektir.

Bilgisayarın "İngilizce" öğrenecek bir beyni yoktur. Onun tek algılayabildiği şey, elektriğin "Var (1)" veya "Yok (0)" olmasıdır. Tüm o devasa dijital evren, bu milyarlarca şalterin saniyede milyarlarca kez açılıp kapanmasıyla yaratılır.

## 2. Bit ve Byte Kavramları
- **Bit:** Bilgisayardaki en küçük veri birimidir. Sadece tek bir `0` veya tek bir `1` değerini alır. Bir adet transistörü temsil eder.
- **Byte:** 8 adet Bit'in yan yana gelmesiyle oluşan gruba **Byte** denir (Örn: `01000001`). 

### Neden 8 Bit (1 Byte)?
Bilgisayarlar harfleri anlayamaz. Onlara A harfini öğretmek için bir standart geliştirmemiz gerekiyordu. İnsanlık bir araya geldi ve (ASCII Tablosu) adında bir sözlük yarattı.
Bu sözlüğe göre:
A harfi = 65 sayısı.
Peki 65 sayısı Binary (İkilik) sistemde nasıl yazılır? -> `01000001`
Yani siz klavyede 'A' tuşuna bastığınızda, işlemciye "elektrik yok, var, yok, yok, yok, yok, yok, var" sinyali gider. İşlemci bu 8'li elektrik kombinasyonunu okur ve ekrana 'A' harfini basar.

## 3. Derleyiciler (Compilers) ve Yorumlayıcılar (Interpreters)
Biz yazılımcılar kod yazarken `01101001` diye elektrik sinyalleri yazmayız. Bizim yazdığımız kodlar İngilizce kelimelerden (Örn: `print("Merhaba")`, `if (x > 5)`) oluşur.

İşte insanların anlayabildiği bu Yüksek Seviyeli kodları (C#, Java, Python vb.), işlemcinin anlayabileceği 1 ve 0'lara çeviren (tercüme eden) devasa yazılımlara **Derleyici (Compiler)** veya **Yorumlayıcı (Interpreter)** denir.

Siz `print("Merhaba")` yazdığınızda Derleyici devreye girer, bu metni parçalar ve işlemciye milyarlarca 1 ve 0 yollar. Derleyiciler olmasaydı yazılım dünyası var olamazdı.
