# Bölüm 08: Modüller, Paket Yönetimi (Pip) ve İzole Ortamlar (venv)

Bütün kodlarınızı (Binlerce satır) tek bir `main.py` dosyasına yazarsanız o dosya bir Spagetti canavarına dönüşür. 
Clean Code der ki: Veritabanı kodları ayrı dosyada, Matematik hesaplamaları ayrı dosyada (Modüllerde) durmalıdır ve gerektiğinde birbirlerini çağırmalıdır.

## 1. Modül Kavramı ve Import (İçe Aktarma)
Python'da sonu `.py` ile biten her fiziksel dosya bir **Modül**'dür. Bir modüldeki kodu diğerinde kullanmak için onu İthal Edersiniz (`import`).
```python
# Sizin yazdığınız veya Python'un içinde hazır gelen kütüphaneler
import math # Tüm matematik dükkanını belleğe indirir

print(math.sqrt(16)) # 4.0 (Karakök alır)

# Veya dükkanın tamamını değil, SADECE o eşyayı alırsanız daha az RAM yakarsınız:
from datetime import datetime
suan = datetime.now()
```

## 2. PİP (Python Paket Yöneticisi) ve Devasa Ekosistem
Python'un dünyada 1 numara olmasının sebebi, diğer şirketlerin ve yazılımcıların yazıp internete bedava koyduğu Yüzbinlerce Kütüphanedir. (Örn: Excel okuma, web sitesi kazıma, Yapay Zeka botu yapma).
Bu dışarıdaki kütüphaneleri (Paketleri) bilgisayarınıza kurmanızı sağlayan komut satırı programının adı **PIP (Pip Installs Packages)** dir.

Terminalinize yazarsınız: `pip install requests` (İnternetten veri çekme kütüphanesini anında indirir ve projeye dahil eder).

## 3. Profesyonelliğin Sırrı: Virtual Environment (Sanal Ortam / venv)
Yeni başlayanların en çok düştüğü ölümcül hata şudur: "A Projesi" için X kütüphanesinin `1.0` sürümünü bilgisayara (Global olarak) kurarlar. 1 yıl sonra "B Projesi"ne başlarlar, aynı kütüphanenin `2.0` sürümünü kurarlar. Yeni sürüm, eskisini Ezer! Geri dönüp A Projesini açtıklarında proje ÇÖKER! (Buna Dependency Hell - Bağımlılık Cehennemi denir).

**Çözüm: venv (Virtual Environment)**
Her yeni bir Python projesine başladığınızda, o projenin klasörünün GÖBEĞİNE görünmez bir "Sanal ve İzole Fanus (venv)" kurarsınız. Artık indireceğiniz tüm PIP paketleri SADECE O FANUSUN içine kurulur, bilgisayarın geneline bulaşmaz. Proje silindiğinde paketler de yok olur. Her projenin kendi izole ekosistemi olur.

**Nasıl Kurulur? (Terminal Komutları):**
1. Proje klasörüne git: `cd benim_projem`
2. Sanal fanusu yarat: `python -m venv ortamim`
3. Fanusun içine gir (Aktifleştir):
   - Windows için: `ortamim\Scripts\activate`
   - Mac/Linux için: `source ortamim/bin/activate`
4. (Ekranda (ortamim) yazısı belirir). Şimdi rahatça `pip install pandas` diyerek dünyayı indirebilirsiniz, başka hiçbir proje etkilenmez!
