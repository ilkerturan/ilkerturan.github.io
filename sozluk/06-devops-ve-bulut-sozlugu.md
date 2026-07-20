# Teknik Sözlük 6: DevOps, Konteyner ve Bulut Bilişim (Cloud)

Kodu yazdık ve test ettik. Peki bu kod müşterinin bilgisayarına (veya sunucuya) "Otomatik" olarak nasıl ulaşır ve nasıl hayatta kalır?

---

*   **DevOps (Development + Operations):** Yazılımcılar (Kodu yazanlar) ile Sistemcilerin (Kodu sunucuda yayınlayanlar) arasındaki duvarı yıkan ve her şeyi OTOMATİZE eden kültür.
*   **Commit & Push:** Yaptığınız kod değişikliğini onaylayıp (Commit) uzak sunucuya (GitHub'a vb.) fırlatma (Push) işlemi.
*   **Pipeline (Boru Hattı):** Kodu GitHub'a attığınız anda otomatik olarak testlerinin çalışmasını, kodun paketlenmesini ve sunucuya aktarılmasını sağlayan yürüyen bant sistemi.
*   **Deploy / Deployment (Dağıtım):** Yazdığınız kodun sunucuya atılarak müşterinin (Canlının) kullanımına açılması. (O meşhur "Canlıya Çıkış" terimi).
*   **Docker:** Bir uygulamanın çalışması için gereken her şeyi (Kod, Windows, Ayarlar) bir kutuya (Container) koyup mühürleyen teknoloji. "Benim bilgisayarımda çalışıyordu" bahanesini yok eder.
*   **Image (Kalıp/İmaj):** Docker'da uygulamanın mühürlenmiş (çalışmaya hazır ama henüz çalışmayan) kalıbı (CD/DVD gibi düşünün).
*   **Container (Konteyner):** Image'ın çalıştırılmış halidir.
*   **Kubernetes (K8s):** Yüzlerce Docker Konteynerini aynı anda yöneten, çökeni ayağa kaldıran Orkestra Şefi.
*   **Pod:** Kubernetes'in içindeki en küçük yapı. Genelde içinde tek bir Docker Container taşır.
*   **Cloud Computing (Bulut Bilişim):** Fiziksel bir sunucu (Bilgisayar) almak yerine, Amazon (AWS), Microsoft (Azure) veya Google'ın devasa bilgisayarlarını "Kiralama" mantığı.
*   **Serverless (Sunucusuz):** Arka planda sunucu olmasına rağmen, sizin onu hiç yönetmediğiniz ve sadece *Kodunuz tıklandığı an, çalıştığı milisaniye* kadar para ödediğiniz sistem.
*   **Auto-Scaling (Otomatik Ölçekleme):** Trafik aniden artınca (Örn: Black Friday), bulutun saniyeler içinde 1 sunucuyu kopyalayıp 50 sunucu yapması işlemi.
