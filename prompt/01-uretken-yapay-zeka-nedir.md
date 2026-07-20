# Bölüm 01: Üretken Yapay Zeka (Generative AI) Nedir?

Geçmişteki Yapay Zeka sistemleri satranç oynamak, hava durumunu tahmin etmek veya kredi kartı sahtekarlığını tespit etmek (Analitik AI) gibi matematiksel ve kurala dayalı görevler yapıyordu.

**Üretken Yapay Zeka (GenAI)** ise daha önce hiç var olmayan yepyeni bir metin, resim, kod veya ses "üretebilen" teknolojilere verilen isimdir (Örn: ChatGPT, Midjourney).

---

## 1. LLM (Büyük Dil Modeli) Nedir?
ChatGPT ve Claude gibi sistemlerin arkasındaki beyne **LLM (Large Language Model)** denir. 
İnsanlar genellikle yapay zekanın düşünüp karar verdiğini sanır, ancak LLM'lerin çalışma mantığı çok daha basit ve ilginçtir: **Sıradaki kelimeyi tahmin etmek (Next Word Prediction).**

Klavye uygulamanızda kelime yazarken üstte çıkan tahmin kelimelerinin milyarlarca kez daha akıllı ve milyarlarca metinle eğitilmiş versiyonudur.

- Siz *"Bugün hava çok..."* yazdığınızda, model milyarlarca parametresini kullanarak sıradaki en mantıklı kelimenin "Güzel" veya "Kötü" olduğuna matematiksel bir olasılıkla karar verir. 

## 2. Token Mantığı (Harf değil, Heceler)
Yapay Zeka kelimeleri bizim gibi harflerle okumaz. Onları **Token** denen hece parçalarına böler ve sayılara çevirir. 
*Ortalama 1 Token = 4 İngilizce karakter veya 1 kelimenin dörtte üçü (3/4) kadardır.*

- Örneğin "Hamburger" kelimesi model için tek kelime değil; "Ham" - "bur" - "ger" olarak 3 token olabilir.
- Bu yüzden bazen ChatGPT'den kelime saymasına dair bir şey istediğinizde başarısız olur, çünkü o kelimeleri değil Token'ları sayar.

## 3. Halüsinasyon (Uydurma)
LLM'ler birer arama motoru (Google) değildir. Bir veritabanından bilgi "çekip" getirmezler, bir kelimeden sonra gelmesi muhtemel diğer kelimeyi "üretirler". 

Bu yüzden, bilmedikleri veya çok nadir geçen bir konu sorulduğunda, matematiksel olarak en mantıklı gelen kelimeleri yan yana dizerek **tamamen uydurma, ancak son derece ikna edici** cevaplar verirler. Buna yapay zeka jargonuyla **Halüsinasyon (Hallucination)** denir.
