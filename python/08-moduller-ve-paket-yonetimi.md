# Bölüm 08: Modüller, Paket Yönetimi (Pip) ve İzole Ortamlar (venv)

Bütün kodlarınızı (Binlerce satır) tek bir `main.py` dosyasına yazarsanız o dosya bir Spagetti canavarına dönüşür. 
Clean Code der ki: Veritabanı kodları ayrı dosyada, Matematik hesaplamaları ayrı dosyada (Modüllerde) durmalıdır. Python'da sonu `.py` ile biten her fiziksel dosya bir **Modül**'dür. İçinde birden fazla modül barındıran klasörlere ise **Paket (Package)** denir.

## 1. Import Mantığı ve Bellek Optimizasyonu
Bir modülü içeri aktarırken arka planda Python o dosyayı ÇALIŞTIRIR ve içindeki fonksiyonları belleğe yükler.
```python
# KÖTÜ VE AĞIR YÖNTEM:
import math # Tüm matematik dükkanını (Sinüs, Cosinüs, Logaritma) komple RAM'e indirir.
print(math.sqrt(16))

# HARİKA (OPTİMİZE) YÖNTEM:
from math import sqrt # Sadece ama sadece bana lazım olan karekök eşyasını dükkandan al!
print(sqrt(16))
```

## 2. Meşhur Koşul: `if __name__ == "__main__":`
Bir kütüphane (Modül) yazdığınızı düşünün. Modülün en altına da test etmek için bir `print("Çalıştı")` yazdınız.
Eğer başka bir geliştirici sizin modülünüzü `import benim_kutuphane` diyerek projesine çekerse, sizin o en alttaki test kodunuz ONUN PROJESİNDE EKRANA YANSIYACAKTIR! (Çünkü import, dosyayı okuyup çalıştırır).
Bunu engellemek için kodlar şu güvenlik bloğunun içine alınır:
```python
def topla(a, b):
    return a + b

# Bu blok demek ki: Eğer bu dosya BİZZAT ÇALIŞTIRILDIYSA (ana dosyaysa) altındakileri yap.
# Ama başka bir dosyadan IMPORT EDİLDİYSE altındakileri ASLA ÇALIŞTIRMA!
if __name__ == "__main__":
    print("Test ediyorum:", topla(5, 5))
```

## 3. Paket Mimarisi ve `__init__.py`
Eğer `veritabani` isimli bir klasörünüz ve içinde birden fazla `.py` dosyanız varsa, bu klasörün Python tarafından sıradan bir klasör değil, bir "Paket (Package)" olarak algılanması için içine içi boş (veya ayar dolu) bir `__init__.py` dosyası koymanız gerekir. (Not: Python 3.3'ten sonra bu zorunluluk esnetilmiştir (Namespace packages), ama hala standart bir best-practice'dir).

## 4. PİP ve Profesyonelliğin Sırrı: Virtual Environment (Sanal Ortam / venv)
Dünyadaki diğer yazılımcıların yazıp bedavaya açtığı (PyPI) paketleri bilgisayarınıza kurmanızı sağlayan aracın adı **PIP (Pip Installs Packages)** dir.

Yeni başlayanların ölümcül hatası şudur: "A Projesi" için Django'nun `1.0` sürümünü bilgisayara kurarlar. 1 yıl sonra "B Projesi" için Django `2.0` kurarlar. Yeni sürüm, eskisini EZER! Geri dönüp A Projesini açtıklarında proje ÇÖKER! (Dependency Hell).

**Çözüm: venv (Virtual Environment)**
Her yeni bir Python projesine başladığınızda, o projenin klasörünün GÖBEĞİNE görünmez bir "Sanal Fanus (venv)" kurarsınız. İndireceğiniz tüm paketler SADECE O FANUSUN içine kurulur, bilgisayarın geneline bulaşmaz. 

**Nasıl Kurulur? (Terminal Komutları):**
1. Proje klasörüne git: `cd benim_projem`
2. Sanal fanusu yarat: `python -m venv ortamim`
3. Fanusun içine gir (Aktifleştir):
   - Mac/Linux için: `source ortamim/bin/activate`
   - Windows için: `ortamim\Scripts\activate`
4. (Ekranda `(ortamim)` yazısı belirir). Şimdi rahatça `pip install pandas` diyerek dünyayı indirebilirsiniz, başka hiçbir proje etkilenmez!

**Projeyi Taşınabilir Yapmak (requirements.txt):**
Projeyi arkadaşınıza atarken, indirdiğiniz paketleri de atmazsınız (Çok büyüktür). Bunun yerine paketlerin SÜRÜM numaralarının bir listesini çıkarırsınız:
`pip freeze > requirements.txt`
Arkadaşınız projeyi açınca sadece `pip install -r requirements.txt` yazar ve tüm paketler milimetrik aynı sürümüyle onun fanusuna kurulur.
