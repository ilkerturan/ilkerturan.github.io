# Bölüm 06: RNN (Recurrent Neural Networks), NLP ve LLM'lere Giden Yol

Geçmiş bölümlerde Çiçek tahmini (Standart) ve Kedi Fotoğrafı (CNN) işledik. Ancak bu modellerin ÇOK BÜYÜK BİR KUSURU (Eksikliği) vardır: **ZAMAN VE HAFIZA KAVRAMLARI YOKTUR!**
Siz CNN'e bir kedi fotoğrafı gösterirsiniz, tanır. Sonra ikinci resmi gösterirsiniz, onu da tanır. Ama 1. resim ile 2. resim arasında HİÇBİR BAĞ KURAMAZ. (Örn: Bu resimler bir videonun ardışık kareleri mi? Geçmişten haberi yoktur).

Peki ya biz Cümle (Metin) yazıyorsak veya Konuşuyorsak?
*"Bugün hava çok soğuk, üzerime bir ....... almalıyım."*
Bu cümleyi tamamlamak (Doğal Dil İşleme - NLP) için, o "........" yerine gelecek kelimenin mantığı (Mont/Ceket), cümlenin taa başındaki (Zaman eksenindeki) "Soğuk" kelimesine bağlıdır! Yani modelin GEÇMİŞİ (HAFIZAYI) HATIRLAMASI GEREKİR.

İşte zamanla akan Verileri (Ses dalgaları, Cümleler/Kelimeler dizisi, Borsa/Hisse senedi fiyatları) analiz etmek için "HAFIZALI (Döngüsel)" mimari olan **Recurrent Neural Networks (RNN - Yinelenen Sinir Ağları)** icat edildi.

## 1. RNN'in Mantığı (Döngü ve Hafıza)
Standart ağlarda bilgi hep İleriye (Girdiden Çıktıya) akar.
RNN'de ise nöronun Çıktısı (Sonucu), bir sonraki kelimeyi okurken tekrar aynı Nöronun İÇİNE GİRDİ (Input) OLARAK DÖNER (Loop). 
- 1. Adım: "Bugün" kelimesini okur, bir durum (Gizli Hafıza/State) oluşturur.
- 2. Adım: "hava" kelimesini okur, O ÖNCEKİ HAFIZAYLA BİRLEŞTİRİR, yeni bir hafıza oluşturur.
- Böylece en sona geldiğinde cümlenin geçmiş tüm bağlamını (Soğukluğu) aklında tutarak mantıklı kelime (Mont) üretir.

## 2. RNN'in Büyük Çöküşü ve LSTM'in (Kısa-Uzun Vadeli Bellek) Kurtarışı
**Sorun:** Düz RNN'ler bir paragrafın taa başındaki kelimeyi (Eğer paragraf uzunsa), sona geldiğinde UNUTUYORDU! Matematiği o kadar geriye gidemiyor, sinyal yolda silinip gidiyordu (Vanishing Gradient).
**Çözüm (LSTM):** 1997'de icat edilen LSTM ağları, Nöronun içine "Unutma Kapısı" ve "Hatırlama Kapısı" adında akıllı bekçiler koydu. "Soğuk" kelimesinin çok önemli olduğunu anlayıp onu uzun vadeli hücre bankasına koyar, "bir, ve, ile" gibi önemsiz kelimeleri ise saniyesinde unutup silerdi. Google Çeviri (Translate) yıllarca bu teknolojiyle ayakta kaldı.

## 3. Transformers (Devrim) ve "Attention Is All You Need"
LSTM harikaydı ama kelimeleri SIRA SIYRA (Tek tek - Sequential) okumak zorundaydı. Savaş ve Barış romanını LSTM'e tek tek kelime olarak okutmak haftalar sürüyordu (Paralel İşleme uygun değildi).

**Ve 2017'de Google araştırmacıları tüm dünyayı sarsan makaleyi yayınladı: "Attention Is All You Need (İhtiyacın Olan Tek Şey Dikkat Mekanizması)."**
- Bu makale ile **Transformers** mimarisi doğdu. (Tüm ChatGPT, Gemini vb. modellerin sonundaki **T** harfi Transformers'ı temsil eder - Generative Pre-Trained **Transformer**).
- **Mantığı (Dikkat/Self-Attention):** Kelimeleri sırayla okumayı ÇÖPE ATTI! Cümledeki 1000 kelimenin HEPSİNİ AYNI ANDA (Paralel/GPU'ların binlerce çekirdeğinde) ağa fırlattı! 
- Cümlenin içindeki her bir kelimenin, DİĞER TÜM KELİMELERLE olan "Matematiksel İlişkisine (Attention/Dikkat Puanına)" bakıp, cümlenin ANLAMINI ve RUHUNU (Context) milyarlarca kez daha hızlı ve daha zekice kavramaya başladı. Bu sayede, trilyonlarca kelimelik İnternet verisini sadece birkaç ayda okuyup bugünkü LLM'leri (Yapay Zeka Patlamasını) yarattı!
