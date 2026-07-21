# Bölüm 01: Python'a Giriş, Mimari ve Felsefe

Dünyanın en popüler dili unvanını yıllardır kimseye kaptırmayan Python'a hoş geldiniz. Adını sanılanın aksine "Piton yılanından" değil, yaratıcısı Guido van Rossum'un çok sevdiği İngiliz komedi grubu "Monty Python'dan" alır. Ancak Python sadece popüler bir dil değil, aynı zamanda çok özel bir felsefeye ve mimariye sahip bir ekosistemdir.

## 1. Neden Python Bu Kadar Popüler?
Yazılım dilleri ikiye ayrılır: İnsana yakın olanlar (Yüksek Seviye) ve Makineye yakın olanlar (Düşük Seviye).
C veya C++ ile bir ekrana "Merhaba" yazdırmak için hafıza (RAM) yönetimi yapmak (malloc/free), kütüphaneleri bağlamak ve kodları platforma özel derlemek gerekir. Python ise "İnsan diline (İngilizceye)" en yakın dildir. Düşüncenizi koda dökerken aradaki "Bilgisayar Mühendisliği" bürokrasisini kaldırır.

- **Veri Bilimi ve Yapay Zeka (AI):** Sektörün %99'u Python kullanır (TensorFlow, PyTorch, Pandas). Nedeni Python'un çok hızlı olması değil, Python'un arkasındaki C/C++ ile yazılmış kütüphanelerin çok hızlı olması ve Python'un bunlara sadece mükemmel bir "Köprü (Wrapper)" görevi görmesidir.
- **Web Geliştirme:** Django (Büyük ve monolitik) ve FastAPI (Mikroservisler ve muazzam hız) gibi harika frameworklere sahiptir. Instagram, Spotify ve Pinterest gibi devler Python altyapısını kullanır.
- **Otomasyon (Scripting):** Sunucudaki 10.000 dosyayı isimlendirmek, Excel dosyalarını birleştirmek veya webden veri çekmek (Web Scraping) için 5 satırlık Python kodu yeterlidir.

## 2. Mimari: Derleyici (Compiler) vs Yorumlayıcı (Interpreter)
C# veya Java dilleri **Derlemelidir (Compiled)**. Siz kodu yazarsınız, derleyici (Compiler) bu kodun TÜMÜNÜ okur, hata yoksa makine diline (1 ve 0'lara) çevirip bir `.exe` veya `.dll` (Java'da .class/.jar) dosyası üretir. Program sadece bu derleme bittikten sonra ve platforma uygunsa çalışır.

Python ise **Yorumlamalıdır (Interpreted)**. Aslında arka planda (CPython standart uygulamasında) kodunuz önce bir *Bytecode* formatına (`.pyc` dosyaları) dönüştürülür, ardından bu bytecode, **PVM (Python Virtual Machine - Python Sanal Makinesi)** tarafından satır satır okunup anında çalıştırılır. 
- **Avantajı:** Windows'ta yazdığınız bir `.py` dosyasını alın, hiçbir derleme yapmadan anında Mac veya Linux'ta çalıştırın. Ayrıca 100 satırlık kodun 99. satırında hata varsa bile, ilk 98 satır TIKIR TIKIR çalıştırılır! Bu, inanılmaz hızlı bir geliştirme ve test (Rapid Prototyping) süreci sağlar.
- **Dezavantajı:** Her satır anında çevrildiği için C++ veya Rust'a göre çalışma zamanında (Runtime) çok daha yavaştır.

## 3. GIL (Global Interpreter Lock) Nedir?
Python'da bilmeniz gereken en kritik mimari kısıtlamalardan biri GIL'dir. Python'un standart sürümü (CPython), bellek yönetimini (Garbage Collection - Çöp Toplama) yönetmek için bir "Kilit (Lock)" kullanır.
Bu kilit yüzünden, çok çekirdekli (Multi-core) bir işlemciniz olsa bile, **aynı anda sadece 1 adet Thread (İş Parçacığı) Python Bytecode'unu çalıştırabilir.** Yani Python ile yazılmış bir kod, işlemcinin birden fazla çekirdeğini aynı anda %100 kapasiteyle "Gerçek anlamda" kullanamaz. CPU yoğunluklu işlerde (Video render, ağır matematik) Python Multithreading yerine Multiprocessing (Ayrı ayrı işlemler başlatma) kullanmak zorundadır.

## 4. The Zen of Python (Python'un Felsefesi)
Python, yazılımcının kod yazma stilini ve estetiğini dikte eden nadir dillerdendir. (PEP-8 kodlama standartları). Terminalinize `import this` yazıp Enter'a basarsanız, karşınıza "Tim Peters" tarafından yazılmış Python'un 19 maddelik kutsal felsefesi çıkar.

İşte yazılım mimarisini de şekillendiren en önemli maddeler:
1. **Güzel, çirkinden iyidir.** (Kodunuz göze estetik gelmelidir).
2. **Açık (Explicit), kapalıdan (Implicit) iyidir.** (Kodunuzda sihirli şeyler dönmesin, değişkenlerin isimleri ve yapılan iş açıkça anlaşılsın).
3. **Basit, karmaşıktan iyidir.** (Eğer bir işi tek satırlık anlaşılır bir döngüyle çözebiliyorsanız, karmaşık OOP yapılarına girmeyin).
4. **Düz (Flat), iç içe geçmişten (Nested) iyidir.** (Sürekli if içinde if, döngü içinde döngü yazıp kodu sağa doğru kaydırmayın. Fonksiyonu erken sonlandırın (Early Return)).
5. **Okunabilirlik önemlidir.** (Clean Code'un temelidir).

> "Python'da bir işi yapmanın her zaman o bariz (ve en iyi) bir yolu vardır. Hollandalı değilseniz (Guido van Rossum) ilk başta göremeyebilirsiniz ama o yol hep oradadır."
