# Bölüm 03: GitHub Actions (Modern CI/CD)

GitHub Actions, günümüzün en popüler, ücretsiz (açık kaynak projeler için) ve entegre CI/CD aracıdır. Başka bir sunucu kurmanıza (Jenkins gibi) gerek kalmadan tüm otomasyonu GitHub üzerinde çalıştırırsınız.

---

## 1. Temel Kavramlar

- **Workflow (İş Akışı):** Belirli olaylarda tetiklenen (Örn: "main dalına Push atıldığında çalış") otomasyon senaryolarıdır. Projenin ana dizininde `.github/workflows/` klasöründeki `.yml` dosyalarıyla tanımlanır.
- **Runner:** Kodunuzu derleyen ve test eden GitHub'ın (veya sizin kendi) sanal makineleridir (Ubuntu, Windows, macOS).
- **Job (İş):** Bir workflow içindeki görev gruplarıdır (Örn: `build_job`, `test_job`, `deploy_job`). Job'lar varsayılan olarak aynı anda (Paralel) çalışır, istenirse birbirine bağlanabilir (`needs: build_job`).
- **Step (Adım):** Bir Job içindeki tekil komutlardır (Örn: `npm install`, `dotnet test`).
- **Action:** Başkalarının yazıp GitHub markete koyduğu hazır komutlardır (Örn: `actions/checkout@v4` kodunuzu Runner'a indirir).

## 2. Secrets (Güvenlik)
Veritabanı şifreleri veya Sunucu SSH anahtarları asla `.yml` dosyasına açıkça yazılmaz. GitHub arayüzünden **Settings -> Secrets** bölümüne eklenir ve yml dosyasında `${{ secrets.DB_PASSWORD }}` şeklinde çağrılır.

## 3. Örnek Bir Workflow (.NET Web API için)

```yaml
name: .NET CI Pipeline

# Ne zaman tetiklenecek?
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build_and_test:
    runs-on: ubuntu-latest # Hangi sunucuda çalışacak?

    steps:
    # 1. Kodu sunucuya indir
    - name: Kodu Checkout Yap
      uses: actions/checkout@v4

    # 2. .NET 8 Kur
    - name: .NET 8 Kurulumu
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: 8.0.x

    # 3. Kütüphaneleri Yükle
    - name: Bağımlılıkları Yükle (Restore)
      run: dotnet restore

    # 4. Kodu Derle
    - name: Projeyi Derle (Build)
      run: dotnet build --no-restore

    # 5. Testleri Çalıştır
    - name: Unit Testleri Çalıştır
      run: dotnet test --no-build --verbosity normal
```
