# Bölüm 02: Versiyon Kontrol (Git) Stratejileri

CI/CD otomasyonunun tetiklenebilmesi için kodların düzenli ve belirli kurallara göre yönetildiği bir Git deposu (Repository) olması şarttır. Takımların kargaşa (Conflict) yaşamadan kod yazabilmesi için stratejiler kullanılır.

---

## 1. Git Flow
Kurumsal şirketlerin en çok sevdiği, çok katı ve güvenli dallanma (branching) stratejisidir.

**Temel Dalları:**
- `master` / `main`: Sadece çalışan, canlı (Production) kodu barındırır. Buraya asla doğrudan kod yazılamaz.
- `develop`: Tüm geliştiricilerin kodlarının birleştiği ana çalışma dalıdır.

**Geçici Dalları:**
- `feature/*`: Yeni bir özellik (örn: sepet_modulu) yapılacağı zaman develop'tan açılır, bitince develop'a birleştirilir.
- `release/*`: Canlıya çıkmadan hemen önce develop'tan ayrılır, son testler yapılır.
- `hotfix/*`: Canlıda (main) acil bir hata (Bug) çıkarsa doğrudan main'den açılır, düzeltilip hem main hem develop'a atılır.

## 2. GitHub Flow
Çok daha hafif, Agile (Çevik) ekipler için tasarlanmıştır. `develop` dalı yoktur.
- Sadece `main` dalı vardır ve her zaman canlıya çıkmaya hazırdır.
- Yeni bir iş yapılacaksa `main` üzerinden bir dal açılır, iş bitince bir **Pull Request (PR)** açılır, testler (CI) çalışır, kod gözden geçirilir (Code Review) ve doğrudan `main` dalına birleştirilir.

## 3. Trunk-Based Development
DevOps ve CI/CD felsefesine en uygun, ancak uygulaması en zor olan stratejidir (Google ve Facebook bunu kullanır).
- Geliştiriciler özellik dallarında (feature branch) günlerce beklemez. Günde birkaç kez, küçük kod parçalarını doğrudan ana dala (`trunk` veya `main`) atarlar (Push).
- **Sırrı:** Kod yarım bile olsa canlıya atılır, ancak **Feature Flags (Özellik Bayrakları)** kullanılarak arayüzde müşteriden gizlenir. Çok sağlam otomatik testler gerektirir.
