# Bölüm 04: Popüler AI Modelleri ve Kodlama için Prompt Şablonları

Şu an dünyada yapay zeka alanında tek bir krallık yok, 3 büyük ekosistemin (ve açık kaynağın) dev savaşı yaşanıyor. Her modelin güçlü ve zayıf yanı vardır.

## 1. Pazardaki Büyük Oyuncular (LLM'ler)

1. **OpenAI (GPT-4 / ChatGPT):** Şu an sektör standardıdır. Kod yazma (Coding), karmaşık mantıksal sorgular ve muhakeme (Reasoning) yeteneği en üst düzey modeldir. Ancak kapalı bir kutudur (API ücretlidir).
2. **Anthropic (Claude 3 - Opus/Sonnet):** OpenAI'ın en büyük rakibidir. Özellikle devasa belgeleri okuma (Büyük Context Penceresi) ve insani (Doğal / Şiirsel) metin yazma konusunda ChatGPT'den çok daha başarılıdır.
3. **Google (Gemini Pro/Ultra):** Avantajı Google'ın devasa veri ekosistemine entegre olmasıdır (Google Docs, Workspace). Hız ve internette anlık (Gerçek zamanlı) arama yapma konusunda iyidir.
4. **Meta (Llama 3 - Açık Kaynak):** Herkesin kendi bilgisayarına (Local) ücretsiz indirip, internetsiz ortamda bile çalıştırabildiği (Ollama gibi araçlarla) devasa açık kaynak devrimidir. Şirket verilerinin dışarı çıkmasını istemeyen (Veri Gizliliği) şirketler için 1 numaradır.

## 2. Yazılımcılar İçin "Kopyala/Yapıştır" Prompt Şablonları

**Kod İnceleme (Code Review) Promptu:**
> "Sen Senior bir Yazılım Mimarı'sın. Aşağıdaki kod bloğunu [SOLID, Clean Code ve Performans] standartlarına göre acımasızca eleştir. Bana sadece şunları ver: 1) Bulduğun mantıksal hatalar, 2) Güvenlik riskleri (OWASP), 3) Refactoring edilmiş (Temize çekilmiş) ve Best Practice'lere uygun yeni kod. Kod dili: C#."

**Birim Test (Unit Test) Yazdırma Promptu:**
> "Aşağıdaki fonksiyona XUnit kullanarak kapsamlı bir Unit Test dosyası yaz. Lütfen 'AAA (Arrange, Act, Assert)' formatını kesinlikle uygula. Hem Happy Path (Doğru çalışan) senaryoları hem de Edge Case'leri (Null girilmesi, negatif sayı, sınır değerleri) test eden en az 5 farklı [Fact] ve [Theory] metodu yaz. Moq kütüphanesini kullan."

**Hata (Bug) Çözme Promptu:**
> "Şu an terminalimde aşağıdaki hatayı alıyorum: [Hatayı Yapıştır]. Kodum şu şekilde: [Kodu Yapıştır]. 
Lütfen bana hatanın NE OLDUĞUNU açıklama (Teorik bilgi istemiyorum). Direkt hatanın sebebini bul ve ÇÖZÜLEN KODU ver. Kodun çalışması için gereken paket/kütüphane varsa indirme komutunu da ekle."
