# Bölüm 05: CNN (Convolutional Neural Networks) ile Görüntü İşleme

Yıllarca standart Yapay Sinir Ağlarına (Geçen bölümdeki 16 Nöronlu düz ağlar vb.) resimler (Örn: Köpek fotoğrafları) gösterdik ve onları eğitmeye çalıştık ama ÇUVALLADIK! 
Neden? Çünkü standart ağ (Dense Network), bir resimdeki "Köpeğin Kulağı" resmin sol üstünde mi, sağ altında mı DİKKATE ALMAZ. Oksijen tüpü gibi tüm pikselleri yan yana dümdüz bir sıraya dizer. Uzamsal (Spatial) özellik (Neyin neyin yanında olduğu) tamamen YOK OLUR.

Bunu çözmek için İnsan Gözünün (Görme Korteksi) çalışma mantığını taklit eden devrimsel bir mimari yaratıldı: **Evrişimli Sinir Ağları (CNN).**

## 1. Evrişim (Convolution) Katmanı - Filtrelerle Bakmak

Siz bir resme bakarken tek tek piksellerine bakmazsınız; resimde "Dikey çizgiler var mı?", "Yuvarlaklar (Göz) var mı?" diye bütüne bakarsınız. CNN de tam bunu yapar.
- CNN, resmin üzerinde bir Fener (Filtre / Kernel - Genelde 3x3 veya 5x5 boyutunda bir kare matris) gezdirir. 
- Bu fener soldan sağa, yukarıdan aşağıya (Stride - Kaydırma adımı) resmin üzerinde dolaşırken "Burada Köşe var mı? Burada Dikey Çizgi var mı?" diye matematiksel çarpım yaparak (Evrişim işlemi) fotoğrafın **Özellik Haritasını (Feature Map)** çıkarır.
- İlk CNN katmanları sadece "Çizgileri" öğrenir. İkinci katman o çizgileri birleştirip "Gözleri/Burunları" öğrenir. Son katmanlar o burunları birleştirip "Köpek/Kedi" yüzünü BÜTÜNSEL OLARAK öğrenir!

## 2. Havuzlama (Pooling) Katmanı - Boyut Küçültme

Eğer 4K çözünürlüğünde (8 Milyon Piksel) bir resim üzerinde fener gezdirip işlem yaparsanız, dünyanın en güçlü bilgisayarının bile RAM'i patlar.
Bunu engellemek ve veriyi SIKIŞTIRMAK için her Evrişim (Görme) katmanından sonra bir **Pooling (Havuzlama)** katmanı atılır.

- **Max-Pooling (En Büyüğü Alma):** Resimdeki her 2x2'lik (4 piksellik) bloğa bakar. "Bu 4 piksel içindeki En Büyük (En Keskin / En önemli Özellik olan) rakam hangisi? Örneğin 255 (Beyaz Çizgi)." Onu alır (Kaydeder), geriye kalan önemsiz 3 karanlık pikseli çöpe atar!
- **Faydası:** Saniyeler içinde, kedi resminin asıl "Köpekten ayıran mantığını / Özünü" kaybetmeden resmin boyutunu 4 KATA KÜÇÜLTÜR. Matematiksel yükü inanılmaz hafifletir. Ayrıca resimdeki köpek sağa kaymış veya sola eğilmiş (Translation) olsa bile model onu tanımaya devam eder (Çünkü detaylar değil "Öz" kalmıştır).

## 3. Tam Bağlantılı (Fully Connected / Dense) Düzleştirme Katmanı
Model, defalarca Evrişim ve Havuzlama yapa yapa 4K'lık resmi, el kadar (10x10'luk) ama içinde "Kedi Kulağı", "Kedi Tüyü" bilgisi olan saf özellik matrislerine dönüştürür.
Son aşamada (Flatten - Düzleştirme işlemiyle) bu matrisler dümdüz tek bir sıraya (Vektöre) dönüştürülür ve standart (Bölüm 3'teki) Yapay Sinir Ağına sokulur. O ağ da (Softmax ile) son noktayı koyar: **"Bu resim %98 ihtimalle Kedidir!"**
