# Bölüm 03: İleri Seviye Etkileşim Teknikleri

Gündelik iletişim kurallarının ötesinde, yapay zekaya karmaşık matematik, kodlama veya analiz işleri yaptırmak istediğimizde, bilimsel olarak kanıtlanmış bazı **İleri Seviye (Advanced)** teknikler kullanmalıyız.

---

## 1. Zero-Shot vs Few-Shot Prompting
Yapay zekaya hiçbir örnek vermeden doğrudan soru sormaya **Zero-Shot** denir. Genellikle basit işlerde çalışır.
Ancak belli bir tonda veya karmaşık bir formatta çıktı istiyorsak, **Few-Shot (Birkaç Örnekli)** tekniği mucizeler yaratır.

**Few-Shot Örneği:**
> Aşağıdaki kelimelerin duygu analizini yap:
> 
> *Örnek 1: "Bu ürüne bayıldım!" -> Duygu: Pozitif*
> *Örnek 2: "Kargom 10 gün gecikti, rezalet." -> Duygu: Negatif*
> *Örnek 3: "Sipariş elime ulaştı." -> Duygu: Nötr*
> 
> **Şimdi bunu sen yap:** "Müşteri hizmetleri ilgisizdi ama ürün idare eder." -> Duygu:

## 2. Chain of Thought (Düşünce Zinciri)
Yapay Zeka (LLM'ler) matematik problemlerini kafadan çözemezler, çünkü bir hesap makinesi değillerdir (Sadece sıradaki kelimeyi tahmin ederler). Ondan sonucu doğrudan isterseniz hata yapar. Ona **"Adım Adım Düşün"** komutunu verirseniz, tahmin zinciri uzadığı için doğru cevaba ulaşma ihtimali katlanarak artar.

**Nasıl Yapılır?**
Komutunuzun en sonuna her zaman şu sihirli cümleyi ekleyin:
*👉 "Sonucu vermeden önce lütfen adım adım düşün ve mantığını açıkla."*

## 3. RAG (Retrieval-Augmented Generation) Mantığı
LLM'ler sadece 2023'e (veya eğitildikleri tarihe) kadar olan bilgileri bilirler. Sizin özel şirket verilerinizi veya bugün çıkan bir haberi bilemezler. Halüsinasyon görmelerini (uydurmalarını) engellemek için **RAG** tekniği kullanılır.

**Nasıl Çalışır?**
1. Yapay zekaya doğrudan soruyu sormazsınız.
2. Önce elinizdeki PDF dosyasını, uzun metni veya güncel haberi sisteme yüklersiniz (Context / Bağlam).
3. Modele şu emri verirsiniz: *"Aşağıdaki metni oku. Soruma **SADECE** bu metindeki bilgilere dayanarak cevap ver. Metinde yoksa 'Bilmiyorum' de."*

Bu sayede yapay zekanın uydurma ihtimali %99 oranında ortadan kalkar ve şirketler için güvenli bir asistan haline gelir.
