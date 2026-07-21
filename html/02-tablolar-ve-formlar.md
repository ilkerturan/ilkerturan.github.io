# Bölüm 02: Kullanıcı ile Etkileşim (Formlar ve Tablolar)

Sitenize gelen kullanıcılardan veri almak (Örn: Giriş Yap ekranı) veya çoklu verileri excel tablosu gibi göstermek için özel HTML yapıları kullanırız.

## 1. Formlar ve Girdiler (Inputs)

Kullanıcının metin yazabildiği, butonlara tıklayabildiği alanlara Form denir. Bütün girdi elemanları `<form>` etiketinin içine yazılır.

```html
<form action="/kaydet" method="POST">
    
    <!-- Metin Girişi -->
    <label for="isim">Adınız:</label>
    <input type="text" id="isim" placeholder="Adınızı girin">

    <!-- Şifre Girişi -->
    <label for="sifre">Şifreniz:</label>
    <input type="password" id="sifre">

    <!-- Açılır Menü (Select) -->
    <label for="sehir">Şehir Seçin:</label>
    <select id="sehir">
        <option value="34">İstanbul</option>
        <option value="06">Ankara</option>
    </select>

    <!-- Onay Kutusu (Checkbox) -->
    <input type="checkbox" id="kabul">
    <label for="kabul">Şartları kabul ediyorum.</label>

    <!-- Gönder Butonu -->
    <button type="submit">Kayıt Ol</button>

</form>
```
> **Önemli:** `id` değeri etiketin kimliğidir, `label` etiketindeki `for` ile eşleştiğinde, kullanıcı yazıya tıklasa bile kutucuk aktif olur.

## 2. Tablolar (Tables)

Verileri satır ve sütunlar halinde göstermek için `<table>` kullanılır.
- `<tr>` (Table Row) = Satır
- `<th>` (Table Header) = Başlık Hücresi (Kalın yazar)
- `<td>` (Table Data) = Veri Hücresi

```html
<table border="1">
    <!-- Tablo Başlığı -->
    <thead>
        <tr>
            <th>Ad Soyad</th>
            <th>Yaş</th>
        </tr>
    </thead>
    <!-- Tablo Gövdesi -->
    <tbody>
        <tr>
            <td>Ali Yılmaz</td>
            <td>25</td>
        </tr>
        <tr>
            <td>Ayşe Kaya</td>
            <td>30</td>
        </tr>
    </tbody>
</table>
```
