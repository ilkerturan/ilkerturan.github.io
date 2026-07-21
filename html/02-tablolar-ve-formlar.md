# Bölüm 02: Kullanıcı ile Etkileşim (Formlar ve Tablolar)

Kullanıcılardan bilgi toplamak (üyelik kaydı, iletişim mesajı) veya kompleks verileri düzenli bir yapıda sunmak (ürün fiyat listesi, maç sonuçları) için formları ve tabloları detaylıca bilmemiz gerekir.

## 1. Veri Düzenleme: Tablolar (`<table>`)

Tablolar satırlardan (`<tr>`) ve her satırın içindeki hücrelerden (sütunlar) oluşur. Sütun tanımlaması yoktur, sadece hücreler yan yana dizilerek sütunları oluşturur.

```html
<!-- border özelliği çok eskidir ancak tablonun anlaşılamaması durumunda çizgi ekler. Günümüzde çizgiler CSS ile yapılır. -->
<table border="1" cellpadding="10" cellspacing="0">
    
    <!-- Tablo Başlık (Üst) Kısmı. Tarayıcıya "Burası veri değil, başlık!" der. -->
    <thead>
        <tr> <!-- Table Row (Satır) -->
            <th>İsim</th> <!-- Table Header (Başlık Hücresi): Kalın ve ortalanmış yazar -->
            <th>Departman</th>
            <th>Maaş</th>
        </tr>
    </thead>
    
    <!-- Tablo Gövdesi (Asıl Veriler) -->
    <tbody>
        <tr>
            <td>İlker Turan</td> <!-- Table Data (Veri Hücresi): Normal yazar -->
            <td>Yazılım</td>
            <td>45.000 TL</td>
        </tr>
        <tr>
            <!-- colspan="2": Bu hücrenin iki sütunluk yer kaplamasını sağlar (Hücreleri birleştirir) -->
            <td colspan="2">Genel Toplam</td>
            <td>45.000 TL</td>
        </tr>
    </tbody>
    
</table>
```
- `colspan`: Hücreyi yatayda birleştirir (Örn: `colspan="2"` Excel'deki "Merge Cells" gibidir).
- `rowspan`: Hücreyi dikeyde birleştirir (satırları birleştirir).

## 2. Veri Alma: Formlar (`<form>`)

Formlar, kullanıcının veri girdiği inputları sarmalayan ve bu verileri "Gönder (Submit)" butonuna basıldığında Backend (Sunucu) tarafına ileten ana yapılardır.

```html
<form action="/kaydet" method="POST" autocomplete="off">
```
- `action`: "Gönder" butonuna basıldığında bu form içindeki verilerin HANGİ URL'e (Adrese) gideceğini belirtir (Örn: `https://api.sitem.com/giris`).
- `method`: Verinin nasıl taşınacağını belirler. İki ana metot vardır:
  - `GET`: Form verilerini URL çubuğuna ekleyerek gönderir (Örn: `?isim=ilker`). Güvensizdir, şifreler kabak gibi görünür. Genellikle arama kutularında kullanılır.
  - `POST`: Veriyi gizli bir paket halinde, arka planda (HTTP Body) gönderir. Üyelik, giriş, kredi kartı gibi tüm hassas işlemlerde **kullanılmak zorundadır**.
- `autocomplete="off"`: Tarayıcının geçmişteki verileri (Örn: eski girilen kredi kartları veya mail adresleri) otomatik doldurmasını engeller.

## 3. Girdi Etiketleri (Inputs) ve Kontroller

Kullanıcının veri gireceği asıl alanlardır. `type` özelliği sayesinde aynı `<input>` etiketi farklı kılıklara girer.

```html
    <!-- KURAL 1: Her inputun bir LABEL'ı olmalıdır -->
    <label for="kullanici_adi">Kullanıcı Adınız:</label>
    
    <!-- type="text": Düz metin kutusu -->
    <!-- id: Label ile eşleşmeyi sağlar. "for" ile "id" aynıysa, label'daki metne tıklanıldığında input odaklanır. -->
    <!-- name: Form sunucuya gönderildiğinde, Backend bu kutudaki yazıyı "name" değeri ile yakalar. -->
    <!-- required: Bu alan boş bırakılırsa form gönderilemez, tarayıcı hata verir. -->
    <!-- placeholder: Kutu boşken içinde görünen silik ipucu metnidir. -->
    <input type="text" id="kullanici_adi" name="username" required placeholder="Örn: ilker_turan" maxlength="20">
    <br><br>

    <!-- type="password": Girilen karakterleri nokta veya yıldıza çevirerek gizler. -->
    <label for="sifre">Şifreniz:</label>
    <input type="password" id="sifre" name="password" required>
    <br><br>

    <!-- type="email": Sadece içinde '@' ve '.' olan geçerli mail formatlarını kabul eder. Mobilde klavyeyi "@" işaretli şekilde açtırır. -->
    <label for="eposta">E-Posta:</label>
    <input type="email" id="eposta" name="email">
    <br><br>
    
    <!-- Çok Satırlı Metin (Textarea) -->
    <!-- Uzun yazılar (Hakkımda, Yorum vb.) için input yerine bu kullanılır. -->
    <label for="mesaj">Mesajınız:</label>
    <textarea id="mesaj" name="message" rows="5" cols="40"></textarea>
    <br><br>

    <!-- Açılır Menü (Select/Option) -->
    <label for="sehir">Bulunduğunuz Şehir:</label>
    <select id="sehir" name="city">
        <option value="">Lütfen seçiniz</option>
        <option value="34">İstanbul</option> <!-- Kullanıcı 'İstanbul' görür ama sunucuya value olan '34' gönderilir -->
        <option value="06">Ankara</option>
    </select>
    <br><br>

    <!-- Onay Kutusu (Checkbox): Çoklu seçimler içindir -->
    <input type="checkbox" id="sozlesme" name="sozlesme" value="onaylandi">
    <label for="sozlesme">Okudum, onaylıyorum</label>
    <br><br>

    <!-- Radyo Düğmesi (Radio): Tekli seçim içindir. 
    ÖNEMLİ: Aynı gruptaki radyo butonlarının 'name' değeri AYNI olmak zorundadır. Aksi halde ikisi birden seçilebilir. -->
    <p>Cinsiyetiniz:</p>
    <input type="radio" id="erkek" name="cinsiyet" value="erkek">
    <label for="erkek">Erkek</label>
    <input type="radio" id="kadin" name="cinsiyet" value="kadin">
    <label for="kadin">Kadın</label>
    <br><br>

    <!-- Gönder Butonu -->
    <!-- type="submit": Form içindeki tüm name/value çiftlerini toplayıp 'action' URL'sine fırlatır. -->
    <!-- type="button" yapılsaydı form gönderilmezdi, sadece tıklanabilen ölü bir buton olurdu (Genelde JS ile bir şeyler yapmak için kullanılır). -->
    <button type="submit">Formu Kaydet</button>
```
