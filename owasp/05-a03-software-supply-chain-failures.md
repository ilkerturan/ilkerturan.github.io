# A03:2025 - Software Supply Chain Failures (Yazılım Tedarik Zinciri Hataları)

**2025'in yıldızı ve en sinsi saldırı türüdür.** Eski adıyla "Vulnerable Components" olan bu kategori, CI/CD pipeline'larının ve geliştirme ortamlarının yaygınlaşmasıyla devasa bir "Tedarik Zinciri" sorununa dönüştü.

---

## 1. Zafiyetin Mantığı
Kalenizin duvarlarını (Uygulamanızı) inanılmaz kalın ve güvenli yaptınız. Hacker dışarıdan içeri giremiyor. 
O zaman Hacker ne yapar? Kalenin içine yiyecek taşıyan tüccarların (NPM/NuGet/PyPI Paketleri veya CI/CD Sunucuları) arabasına saklanıp, kaleye **sizin tarafınızdan güvenle taşınmasını** sağlar.

Yani saldırı doğrudan size değil, **kullandığınız araçlara (tedarikçilerinize)** yapılır.

## 2. En Sık Görülen Saldırı Tipleri
- **Dependency Confusion & Typo Squatting:** Geliştiricilerin sıklıkla kullandığı `react-router` paketinin ismini `react-ruter` şeklinde zararlı bir kodla npm kütüphanesine yüklerler. Yazılımcı yanlışlıkla bunu indirirse virüs geliştiricinin bilgisayarına veya sunucusuna (CI/CD) girer.
- **Pipeline Zehirlenmesi (Pipeline Poisoning):** Şirketin Jenkins veya GitHub Actions sunucularına sızıp, derleme anında (Build) koda gizli zararlılar (Backdoor) enjekte ederler (Bknz: Tarihin en büyük hack olayı olan SolarWinds Saldırısı).
- **Zafiyetli (Eski) Kütüphaneler:** Kodunuzun içinde kullandığınız yüzlerce açık kaynaklı kütüphaneden (Örn: Log4j) birinde çıkan sıfırıncı gün (0-day) zafiyeti tüm sisteminizi ele geçirir.

## 3. Nasıl Korunuruz? (Mimari Savunma)
1. **SCA (Software Composition Analysis) Kullanın:** Projenizdeki tüm kütüphaneleri (Dependencies) tarayan araçlar (Dependabot, Snyk, OWASP Dependency-Check) kullanarak eski veya zafiyetli paketleri anında tespit edin.
2. **SBOM (Software Bill of Materials):** Yazılımınızın "İçindekiler Listesini" çıkarın. İçinde tam olarak hangi paketlerin hangi versiyonlarının yaşadığını haritalandırın.
3. **CI/CD Güvenliği:** Geliştiricilerin CI/CD pipeline'ını değiştirmesine kısıtlamalar (Code Review zorunluluğu) getirin. Derleme ortamının dış internetle bağlantısını kısıtlayın.
