# Bölüm 03: İleri Seviye Prompt (Komut) Teknikleri

Prompt Engineering sadece "Rol tanımlamak" değildir. Modeli belli bir analitik derinliğe zorlamak için geliştirilmiş bilimsel yöntemler vardır.

## 1. Zero-Shot Prompting (Sıfır Örnek)
Modele hiçbir örnek vermeden, kapasitesine güvenerek direkt görevi verdiğiniz standart yöntemdir. Sadece basit ve mantığı çok belli işlerde (Çeviri, Özetleme) çalışır.
- *Örnek:* "Aşağıdaki metnin duygusu nedir? Metin: 'Bu film hayatımda izlediğim en berbat şeydi.' " (Model hemen "Negatif" der).

## 2. Few-Shot Prompting (Az Örnekli)
Karmaşık veya sizin kendi özel şirket formatınıza uygun çıktılar istediğinizde kullanılır. Modele önce "Benim dünyamda işler böyle yürür, şu örneklere bak" dersiniz. (Model desenleri (pattern) kapar).
- *Örnek:* 
  "Aşağıdaki formatı öğren ve son satırı sen doldur:
  Girdi: Ev kredisi başvurusu -> Çıktı: Kategori_Finans
  Girdi: Şifremi unuttum -> Çıktı: Kategori_Teknik_Destek
  Girdi: Maaşlar ne zaman yatacak -> Çıktı: Kategori_IK
  Girdi: İnternetim koptu -> Çıktı: ????" (Model deseni çözüp Kategori_Teknik_Destek yazar).

## 3. Chain of Thought - CoT (Düşünce Zinciri)
LLM'ler zeki değildir, direkt "Sonucu" vermeye çalıştıklarında matematik ve mantık sorularında çuvallarlar. Onları "Adım Adım Düşünmeye" zorladığınızda başarı oranları %40'tan %90'lara çıkar! Modele, sonuca giden yolu hesaplaması için "Düşünme Vakti (Kelime alanı)" vermiş olursunuz.
- *Kötü:* "Ahmet'in 5 elması var, Ayşe 3 verdi, Mehmet yarısını yedi, kaç kaldı?" (Direkt sormak hataya yol açar).
- *İyi (CoT Eklentisi):* "Ahmet'in 5 elması var... vs. **Lütfen cevabı vermeden önce ADIM ADIM SESLİ DÜŞÜNEREK hesapla (Let's think step by step).**"

## 4. Model Parametreleri (Temperature ve Top-P)
API kullanırken bu ayarları değiştirebilirsiniz.
- **Temperature (Sıcaklık) (0.0 ile 2.0 arası):** Modelin ne kadar "Yaratıcı (Çılgın)" olacağını belirler. 
  - `0.0 veya 0.1` (Soğuk): Aşırı robotiktir. Her sorduğunuzda tamamen aynı, garantici ve sıkıcı cevabı verir. (Kod yazdırırken, Hukuk, Tıp metni yazdırırken zorunludur! Halüsinasyonu sıfırlar).
  - `0.8 veya 1.0` (Sıcak): Yaratıcılık zirvededir. Şiir, senaryo veya pazarlama metni yazdırırken kullanılır. Çok fazla halüsinasyon riski vardır.
