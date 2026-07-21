# Bölüm 03: Regresyon (Regression) ve Fiyat Tahminleri

Gözetimli Öğrenmenin (Supervised Learning) iki büyük kolu vardır: Biri Sınıflandırma, diğeri Regresyon.
Eğer hedefiniz (Bulmak istediğiniz cevap) "Kedi mi Köpek mi?" gibi bir Kategori DEĞİLSE ve sonucun **SÜREKLİ BİR SAYI (Para, Sıcaklık, Kilometre, Boy vb.)** olmasını istiyorsanız, o zaman kullanacağınız şeyin adı **REGRESYON'dur.**

- Evin özellikleri girildiğinde Fiyatının 3.250.000 TL olarak çıkması (Regresyon).
- Yarınki havanın 24.5 Derece olması (Regresyon).
- Önümüzdeki ay Şirketin Ciro beklentisinin 100 Milyon Dolar olması (Regresyon).

## 1. Doğrusal Regresyon (Linear Regression)
İstatistiğin 200 yıllık babasıdır ve makine öğrenmesinin en basit (KISS) ama en güçlü algoritmasıdır. Lisedeki Matematik formülüne dayanır: `y = mx + b`

**Nasıl Çalışır? (Ev Fiyatı Örneği):**
- X (Bağımsız Değişken / Girdi) = Evin Metrekaresi
- Y (Bağımlı Değişken / Hedef) = Evin Fiyatı

Koordinat düzlemine (X,Y grafiğine) daha önceki yıllarda satılmış 1000 adet evin noktasını koyarsınız. 
Doğrusal Regresyon algoritması, bu 1000 noktanın **TAM ORTASINDAN GEÇECEK VE TÜM NOKTALARA EN YAKIN OLACAK DÜMDÜZ BİR ÇİZGİ (Doğru/Line)** çizer. (Buna En Küçük Kareler Yöntemi - OLS denir).

Artık o çizgi, sizin Sihirli Formülünüzdür.
Yeni bir müşteri gelip "Benim evim 150 metrekare (X), fiyatı ne olur?" dediğinde; X ekseninden 150'yi bulursunuz, yukarı çıkıp "Düz Çizgiye (Line)" çarparsınız, o çizginin Y Eksenindeki karşılığı (Örn: 2 Milyon TL) sizin **TAHMİNİNİZ (Prediction)** olur.

## 2. Çoklu Doğrusal Regresyon (Multiple Linear Regression)
Dünyadaki hiçbir evin fiyatını SADECE Metrekaresi belirlemez.
Denkleme yeni X'ler girmeye başlar: `X1: Metrekare`, `X2: Oda Sayısı`, `X3: Binanın Yaşı`.
Formül uzar: `Y (Fiyat) = W1*X1 + W2*X2 + W3*X3 + b`
Buradaki "W (Ağırlıklar)", o özelliğin fiyata ne kadar etki ettiğinin katsayısıdır (Makine Öğrenmesi aslında eğitim boyunca sadece bu W katsayılarını bulmaya çalışan bir hesap makinesidir).

## 3. Lojistik Regresyon (Logistic Regression) - İsim Aldatmacası!
İsminde "Regresyon" kelimesi geçmesine RAGMEN, aslen bir "Sınıflandırma (Classification)" algoritmasıdır!
Amacı fiyat (Sonsuz Sayı) bulmak DEĞİLDİR. Amacı "0 ile 1 arasında (Yüzdelik)" bir OLASILIK (İhtimal) bulmaktır.

*Örnek:* Bir e-mailin İstenmeyen (Spam) olma ihtimali %85 çıktı. Lojistik regresyonun sonuna bir Sigmoid Eğrisi (S şeklinde çizgi) konur ve bir EŞİK DEĞER (Örn: %50) belirlenir. Eğer sonuç %50'den büyükse (Örn: %85), makine cevabı "EVET (1 - Spam)", küçükse "HAYIR (0 - Normal)" diye Kategorize eder (Sınıflandırır). (Örn: Tümör iyi huylu mu, kötü huylu mu?).
