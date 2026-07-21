# Bölüm 01: Python'a Giriş ve The Zen of Python

Dünyanın en popüler dili unvanını yıllardır kimseye kaptırmayan Python'a hoş geldiniz. Adını sanılanın aksine "Piton yılanından" değil, yaratıcısı Guido van Rossum'un çok sevdiği İngiliz komedi grubu "Monty Python'dan" alır.

## 1. Neden Python Bu Kadar Popüler?
Yazılım dilleri ikiye ayrılır: İnsana yakın olanlar (Yüksek Seviye) ve Makineye yakın olanlar (Düşük Seviye).
C veya C++ ile bir ekrana "Merhaba" yazdırmak için hafıza (RAM) yönetimi yapmak, kütüphaneleri bağlamak ve derlemek gerekir. Python ise "İnsan diline (İngilizceye)" en yakın dildir. Düşüncenizi koda dökerken aradaki bürokrasiyi kaldırır.
- **Veri Bilimi ve Yapay Zeka (AI):** Sektörün %99'u Python kullanır (TensorFlow, PyTorch, Pandas).
- **Web Geliştirme:** Django ve FastAPI gibi harika frameworklere sahiptir.
- **Otomasyon (Scripting):** Sunucudaki 10.000 dosyayı isimlendirmek için 5 satırlık Python kodu yeterlidir.

## 2. Derleyici (Compiler) vs Yorumlayıcı (Interpreter)
C# veya Java dilleri **Derlemelidir (Compiled)**. Siz kodu yazarsınız, bir butona basarsınız, program tüm kodları alır, makine diline (1 ve 0'lara) çevirip bir `.exe` veya `.dll` dosyası üretir. Program anca ondan sonra çalışır. Hata varsa hiç çalışmaz.
Python ise **Yorumlamalıdır (Interpreted)**. `.exe` üretmez. Kodu satır satır yukarıdan aşağıya doğru okur ve anında çalıştırır. (Tercüman gibidir). 100 satırlık kodun 99. satırında hata varsa, ilk 98 satırı TIKIR TIKIR çalıştırır, 99'a gelince çöker! Bu ona inanılmaz bir esneklik ve test kolaylığı sağlar.

## 3. The Zen of Python (Python'un Felsefesi)
Terminalinize (Konsola) `import this` yazıp Enter'a basarsanız, karşınıza Python'un 19 maddelik kutsal felsefesi çıkar. İşte en ünlüleri:
1. **Güzel, çirkinden iyidir.** (Kodunuz göze estetik gelmelidir).
2. **Açık, kapalıdan iyidir.** (Kodunuzda sihirli numaralar dönmesin, ne yaptığı anlaşılsın).
3. **Basit, karmaşıktan iyidir.** (KISS Prensibi).
4. **Düz, iç içe geçmişten (spagetti) iyidir.** (Sürekli if içinde if yazmayın).
5. **Okunabilirlik önemlidir.** (Clean Code'un temelidir).

> "Python'da bir işi yapmanın her zaman O bariz (ve en iyi) bir yolu vardır. Hollandalı değilseniz ilk başta göremeyebilirsiniz ama vardır."
