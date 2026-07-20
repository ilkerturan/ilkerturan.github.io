# Bölüm 06: RNN, LSTM ve Doğal Dil İşleme (NLP)

Şimdiye kadar gördüğümüz ağlar (ANN, CNN) sadece o an verdiklerinizle ilgilenir, geçmişi hatırlamazlar. Ancak dil (cümle) kurarken veya borsa tahmini yaparken **geçmiş (bir önceki kelime/gün)** hayati öneme sahiptir.
"Zehirlendiğim için bugün okula _____" cümlesindeki boşluğu bulmak için cümlenin başını (geçmişi) bilmek zorundayız.

İşte zaman veya sıra (Sequence) bağımlı veriler için **RNN (Recurrent Neural Networks - Tekrarlayan Sinir Ağları)** geliştirilmiştir.

---

## 1. RNN ve Hafıza (Memory) Mantığı
RNN'ler, bir veriyi (kelimeyi) işlerken sadece ona bakmaz, bir önceki veriden gelen **Gizli Durumu (Hidden State - Hafıza)** da işin içine katar.
Böylece cümleyi kelime kelime okudukça, bir önceki kelimenin anlamını bir sonraki kelimeye taşımış olur.

## 2. RNN'in Büyük Problemi: Kaybolan Gradyan (Vanishing Gradient)
RNN'in hafızası "Balık Hafızasıdır". Eğer cümle çok uzunsa, cümlenin en başındaki kelimenin anlamı cümlenin sonuna gelene kadar silinip kaybolur (Matematiksel olarak ağırlıklar sıfıra yaklaşır). 

## 3. LSTM (Long Short-Term Memory) - Çözüm
RNN'in unutkanlığını çözmek için 1997'de LSTM icat edilmiştir. Adı üzerinde "Uzun-Kısa Vadeli Hafıza".
İçerisinde **Geçitler (Gates)** bulunur:
- **Forget Gate (Unutma Geçidi):** Gereksiz bilgileri (Örn: "ve, ama" kelimelerini) hafızadan siler.
- **Input Gate (Girdi Geçidi):** Yeni gelen kelimenin ne kadar önemli olduğuna karar verir.
- **Output Gate (Çıktı Geçidi):** Hafızadaki önemli bilgileri bir sonraki hücreye aktarır.

Google Çeviri, Siri ve ilk nesil Chatbot'ların tamamı yıllarca LSTM üzerinde çalışmıştır.

---

## 4. Word Embeddings (Kelimeleri Sayılara Çevirmek)
Bilgisayarlar "Kral" veya "Kraliçe" kelimesini anlayamaz, onlara sayı vermek gerekir. 
Eskiden kelimelere rastgele (Kral=1, Kraliçe=2, Elma=3) gibi sayılar veriliyordu (One-Hot Encoding). Ancak bu yöntemde kelimeler arasındaki "Anlam" kayboluyordu.

**Word2Vec (Word Embeddings)** teknolojisi, kelimeleri devasa bir 3 Boyutlu (hatta 300 Boyutlu) uzaya yerleştirir.
- Kral ile Kraliçe birbirine matematiksel olarak çok yakın yerleştirilir.
- Elma çok uzak bir köşededir.
Hatta matematiğe dökülerek şu işlem yapılabilir: **Kral - Erkek + Kadın = Kraliçe**. (Müthiş bir semantik matematiktir).

---

## 5. Transformers (ChatGPT'nin Atası)
2017 yılında Google, **"Attention is All You Need"** adında efsanevi bir makale yayınladı. 
LSTM kelimeleri sırayla (tek tek) okumak zorunda olduğu için devasa metinlerde çok yavaştı.

**Transformer Mimarisi:**
- Cümledeki kelimelerin hepsine aynı anda bakar.
- Hangi kelimenin hangi kelimeye odaklanması (Attention - Dikkat) gerektiğini matematiksel olarak hesaplar. (Örn: "Elma yedi" cümlesinde "Yedi" kelimesinin odak noktası Elmadır).
- Bu mimari paralel işlem yapabildiği için GPT (Generative Pre-trained Transformer) gibi devasa Dil Modellerinin (LLM) doğmasını ve günümüz Yapay Zeka çağının başlamasını sağlamıştır!
