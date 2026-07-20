# Bölüm 16: .NET Proje Türleri (Hangisini Ne Zaman Kullanmalı?)

C# ve .NET ekosistemi tek bir dil ile her platforma uygulama yazabilmenizi sağlayan devasa bir çatıdır. Geliştireceğiniz uygulamanın ihtiyacına göre doğru proje türünü seçmek, mimarinin ilk ve en hayati adımıdır.

---

## 1. Console Application (Konsol Uygulaması)
En temel ve ekransız (siyah ekran) uygulama türüdür.
- **Kullanım Yeri:** Arka plan betikleri (scriptler), veri tabanı yedekleme otomasyonları, zamanlanmış küçük görevler veya algoritma testleri.
- **Avantajı:** Çok hafiftir, anında çalışır. Arayüz yükü yoktur.

## 2. Class Library (Sınıf Kütüphanesi - .dll)
Kendi başına çalıştırılamayan (Play tuşuna basıp çalıştıramazsınız), ancak **başka projeler tarafından kullanılmak üzere yazılmış** ortak kod depolarıdır.
- **Kullanım Yeri:** Mimari katmanları ayırırken. (Örn: Veritabanı bağlantı kodlarınızı bir Class Library yapıp, bu kütüphaneyi hem Web sitenize hem de Mobil uygulamanıza referans olarak ekleyebilirsiniz).

## 3. ASP.NET Core Web API
Günümüzün en popüler arka uç (Backend) mimarisidir. Ekrana (HTML) sahip değildir. Sadece dışarıya JSON veri sunar veya alır (RESTful Servisler).
- **Kullanım Yeri:** React, Vue, Angular gibi modern Frontend projelerini, mobil uygulamaları veya diğer mikroservisleri besleyecek ana veri sunucusu olarak kullanılır.

## 4. ASP.NET Core WebUI (MVC ve Razor Pages)
Arayüzü (HTML/CSS) sunucuda (Server-side) oluşturup, kullanıcıya bitmiş bir sayfa olarak gönderen klasik web projeleridir.
- **Kullanım Yeri:** Kurumsal web siteleri, bloglar, e-ticaret siteleri. SEO'nun (Arama Motoru Optimizasyonu) çok kritik olduğu projeler. (Arayüz sunucudan basıldığı için Google botları sitenizi çok iyi okur).

## 5. Blazor (WebAssembly & Server)
C# yazılımcılarının JavaScript bilmeden (Angular veya React kullanmadan) Frontend (Önyüz) yazabilmesini sağlayan devrimsel bir teknolojidir. Kodlar tarayıcının içinde WebAssembly sayesinde direkt olarak çalışır.
- **Kullanım Yeri:** Güçlü ve interaktif iç paneller, admin panelleri veya tüm ekibin sadece C# bildiği SPA (Single Page Application) projeleri.

## 6. Worker Service (Arka Plan Servisleri)
7/24 çalışan, arayüzü olmayan arka plan servisleridir.
- **Kullanım Yeri:** Windows Service veya Linux Daemon olarak kurulan; "Her gece saat 3'te faturaları mail at", "Kuyruktaki video dosyalarını dönüştür" gibi sürekli tetikte bekleyen sistemler.

## 7. .NET MAUI (Multi-platform App UI)
Eski adıyla Xamarin. Tek bir C# kodu yazarak **aynı anda iOS, Android, Windows ve macOS** uygulaması çıkarmanızı sağlayan mobil/masaüstü (Cross-Platform) framework'üdür.
- **Kullanım Yeri:** Çoklu platform desteklemesi gereken kurumsal mobil veya masaüstü projeler.
