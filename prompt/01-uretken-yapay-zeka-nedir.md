# Bölüm 01: Üretken Yapay Zeka (Generative AI) Nedir?

Yapay zeka (AI) dünyasında son yıllarda yaşanan patlamanın (ChatGPT, Midjourney) arkasında yatan sihirli kavram **Üretken Yapay Zeka'dır (Generative AI)**. 

Geleneksel makine öğrenmesi (Örn: Yüz tanıma, spam filtreleme) "Analiz eder" ve "Sınıflandırır". (Bu fotoğraf kedi mi, köpek mi?).
Üretken Yapay Zeka ise "Var olmayan, yepyeni bir şeyi İNŞA EDER". (Bana uzayda kaykay kayan mor bir kedinin fotoğrafını çiz veya Shakespeare tarzında kod yazan bir şiir üret).

## 1. LLM (Large Language Model - Büyük Dil Modelleri) Nasıl Çalışır?
ChatGPT (OpenAI), Gemini (Google) veya Claude (Anthropic) gibi modellerin kalbinde LLM yatar. Bunlar aslında "Dünyanın en gelişmiş Otomatik Tamamlama (Auto-complete)" motorlarıdır.

Çalışma prensibi büyü değil, **İstatistik ve Olasılıktır**:
İnternetteki milyarlarca kitap, makale, kod ve yazışma bu modellere okutulur (Eğitim - Training). Model, kelimeler arasındaki ilişkileri (Ağırlıkları/Weights) öğrenir.
Siz ona: "Sabah kalktım ve yüzümü..." dediğinizde, model matematiksel olarak şuna bakar: "Benim okuduğum milyarlarca metinde, bu kelimelerden sonra %99 ihtimalle 'yıkadım' kelimesi geliyor." Ve oraya **Yıkadım** yazar.

Bir LLM, dünyanın ne olduğunu "anlamaz". Duygusu yoktur. Sadece "Hangi kelimeden sonra hangi kelimenin gelme ihtimali yüksektir?" (Next-Token Prediction) hesabı yapan devasa bir istatistik makinesidir.

## 2. Halüsinasyon (Hallucination) Olgusu
LLM'lerin en büyük kusurudur. Siz "Tarihte ilk uçan Osmanlı Padişahı kimdir?" diye sorarsanız, LLM size bilmediğini söylemek (Genelde) yerine, muazzam ikna edici ve süslü cümlelerle uydurma bir padişah ismi (Örn: Sultan Hezarfen) icat eder ve onu savunur.

Neden? Çünkü Olasılık motoru "Cevap vermemek" üzere değil, "Kelime üretmek" üzere kurgulanmıştır. Yalan söylemez, sadece mantıklı görünen ama gerçekte var olmayan ihtimaller zinciri (Halüsinasyon) üretir. Bu yüzden yapay zekanın yazdığı kod veya hukuki bilgi mutlaka bir İnsan (Human-in-the-loop) tarafından teyit edilmelidir!
