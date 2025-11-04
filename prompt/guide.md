# Prompt Engineering Rehberi

## Prompt Engineering Nedir?

Prompt engineering, yapay zeka modellerinden istediğiniz sonuçları almak için etkili talimatlar (prompt) yazma sanatıdır. Doğru prompt teknikleriyle modelin performansını önemli ölçüde artırabilirsiniz.

## Temel İlkeler

### 1. Net ve Açık Olun
Belirsiz ifadeler yerine spesifik talimatlar verin.

**Kötü Örnek:**
```
Bir makale yaz.
```

**İyi Örnek:**
```
Yapay zeka etiği hakkında 500 kelimelik bir makale yaz. 
Makale giriş, 3 ana paragraf ve sonuç bölümünden oluşsun.
Akademik ama anlaşılır bir dil kullan.
```

### 2. Bağlam Sağlayın
Model için yeterli arka plan bilgisi verin.

**Örnek:**
```
Sen deneyimli bir pazarlama uzmanısın. 
E-ticaret sitesi için bir ürün açıklaması yazmalısın.
Hedef kitle: 25-40 yaş arası teknoloji meraklıları.
Ürün: Kablosuz kulaklık
```

### 3. Adım Adım Düşünmeyi İsteyin
Karmaşık görevler için modelden mantıksal adımlar izlemesini isteyin.

**Örnek:**
```
Şu problemi adım adım çöz:
1. Önce problemi analiz et
2. Çözüm yöntemlerini listele
3. En uygun yöntemi seç ve uygula
4. Sonucu doğrula

Problem: [probleminiz]
```

## Gelişmiş Teknikler

### Few-Shot Learning (Örnek Verme)
Modele örnekler göstererek istediğiniz formatı öğretin.

```
Cümleleri olumlu/olumsuz olarak sınıflandır:

Örnek 1:
Cümle: "Bu ürünü çok beğendim, harika!"
Sonuç: Olumlu

Örnek 2:
Cümle: "Kalitesi berbat, pişman oldum."
Sonuç: Olumsuz

Şimdi şunu sınıflandır:
Cümle: "Fiyatına göre fena değil ama beklediğim gibi olmadı."
```

### Chain-of-Thought (Düşünce Zinciri)
Modelden akıl yürütme sürecini açıklamasını isteyin.

```
Soruyu cevaplamadan önce düşünce sürecini adım adım açıkla:

Soru: Bir mağazada 3 elma 10 TL. 7 elma kaç TL?
Çözüm sürecini göster ve sonra cevabı ver.
```

### Rol Atama
Modele belirli bir uzmanlık rolü verin.

```
Sen 20 yıllık deneyimli bir yazılım mimarısın.
Mikro servis mimarisi hakkında şirket yönetimine 
teknik olmayan bir dille sunum hazırla.
```

### Sınırlamalar ve Kısıtlamalar Belirtin
Net sınırlar koyun.

```
Python'da bir hesap makinesi yaz:
- Sadece 4 işlem (+, -, *, /)
- Maksimum 50 satır kod
- Yorum satırları ekle
- Hata yönetimi olsun
```

## Format Belirleme

### Yapılandırılmış Çıktı İsteyin

**JSON Format:**
```
Şu bilgileri JSON formatında ver:
{
  "isim": "",
  "yaş": "",
  "şehir": "",
  "meslek": ""
}
```

**Tablo Format:**
```
Sonuçları markdown tablo formatında göster:
| Ülke | Başkent | Nüfus |
```

**XML Tag'leri:**
```
Cevabını şu formatta ver:
<analiz>
  <güçlü_yönler>...</güçlü_yönler>
  <zayıf_yönler>...</zayıf_yönler>
  <öneriler>...</öneriler>
</analiz>
```

## Yaygın Hatalar ve Çözümleri

### ❌ Hata 1: Çok Belirsiz Talimatlar
```
"İyi bir metin yaz."
```

### ✅ Düzeltme:
```
"Sürdürülebilir enerji hakkında 300 kelimelik, 
lise öğrencilerine yönelik bilgilendirici bir metin yaz."
```

### ❌ Hata 2: Çelişkili Talimatlar
```
"Çok kısa ama detaylı bir özet yap."
```

### ✅ Düzeltme:
```
"Ana noktaları 5 madde halinde özetle, 
her madde 1-2 cümle olsun."
```

### ❌ Hata 3: Gereksiz Karmaşıklık
```
"Önce şunu yap sonra bunu yap ama öncesinde onu kontrol et..."
```

### ✅ Düzeltme:
```
Görevleri numaralandırarak sırala:
1. X'i kontrol et
2. Y'yi yap
3. Z'yi tamamla
```

## Özel Kullanım Senaryoları

### Kod Yazımı
```
Python'da bir fonksiyon yaz:
- İsim: hesapla_ortalama
- Girdi: Sayı listesi
- Çıktı: Aritmetik ortalama
- Tip kontrolü yap
- Docstring ekle
- Örnek kullanım göster
```

### Veri Analizi
```
Şu verileri analiz et ve şunları çıkar:
1. Temel istatistikler (ortalama, medyan, mod)
2. Trendler ve örüntüler
3. Aykırı değerler
4. 3 temel içgörü
5. Görselleştirme önerileri
```

### İçerik Düzenleme
```
Bu metni düzenle:
- Yazım hatalarını düzelt
- Cümle yapısını iyileştir
- Tekrarları kaldır
- Daha akıcı hale getir
- Orijinal tonu koru

[metin]
```

## En İyi Pratikler

1. **İteratif Yaklaşım**: İlk promptunuz mükemmel olmayabilir, sonuçlara göre iyileştirin
2. **Test Edin**: Farklı varyasyonları deneyin
3. **Spesifik Olun**: "İyi", "güzel" gibi öznel terimlerden kaçının
4. **Uzunluğu Belirtin**: Kelime/karakter sayısı verin
5. **Ton Belirleyin**: Resmi, samimi, teknik, yaratıcı vb.
6. **Örnekler Verin**: Ne istediğinizi gösterin
7. **Kısıtlamaları Belirtin**: Nelerin olup olmaması gerektiğini söyleyin

## Prompt Şablonları

### Genel Şablon
```
[Rol/Bağlam]
[Görev Tanımı]
[Spesifik Gereksinimler]
[Format/Yapı]
[Örnekler]
[Kısıtlamalar]
```

### Analiz Şablonu
```
Şu konuyu analiz et: [konu]
Perspektif: [açı]
Kapsam: [genişlik/derinlik]
Çıktı formatı: [yapı]
Önemli hususlar: [liste]
```

### Yaratıcı Şablon
```
[Türü] oluştur: [ne]
Stil: [nasıl]
Hedef kitle: [kim]
Ton: [duygu]
Uzunluk: [boyut]
Özel unsurlar: [ekstralar]
```

## Sonuç

İyi prompt engineering:
- Net ve spesifik talimatlar gerektirir
- Bağlam ve örnekler önemlidir
- İteratif iyileştirme ile gelişir
- Deneyimle daha da iyileşir

Pratik yaparak kendi tarzınızı geliştireceksiniz. Her model farklı tepki verebilir, bu yüzden test etmek çok önemlidir.
