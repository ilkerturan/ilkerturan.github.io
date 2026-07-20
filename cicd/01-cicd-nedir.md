# Bölüm 01: CI/CD (Sürekli Entegrasyon ve Dağıtım) Nedir?

Yazılım geliştirme sürecinde kod yazmak işin sadece yarısıdır. Yazdığınız kodun hatalardan arındırılarak, güvenli ve hızlı bir şekilde canlı sunucuya (Production) ulaşması gerekir. İşte bu "Otomatik Otobana" **CI/CD Pipeline** denir.

---

## 1. CI (Continuous Integration - Sürekli Entegrasyon)
Geliştiricilerin (Developer) yazdıkları kodları günde birkaç kez ana kod deposuna (GitHub, GitLab) birleştirmesi (Merge) işlemidir.
- **Amacı:** "Benim bilgisayarımda çalışıyordu!" bahanesini yok etmektir.
- **Süreç:** Siz kodu `Push` ettiğiniz anda sistem otomatik olarak uyanır, kodu derler (Build) ve yazdığınız Birim Testlerini (Unit Test) çalıştırır. Testlerden biri bile patlarsa kod ana sürüme eklenmez (Reddedilir).

## 2. CD (Continuous Delivery - Sürekli Teslimat)
CI sürecinden başarıyla geçen (Testleri geçen) kodun, sunucuya yüklenmeye (Deploy edilmeye) hazır bir paket (Örn: Docker Image, .dll, .jar) haline getirilip bekletilmesidir. 
- Bu aşamada kod canlıya (Production) **otomatik gitmez**, test veya staging (sahne) sunucusuna gider. Canlıya geçiş için bir yöneticinin manuel olarak **"Onayla" (Approve)** butonuna basması gerekir.

## 3. CD (Continuous Deployment - Sürekli Dağıtım)
Continuous Delivery'nin bir adım ötesidir. 
- Kod testleri geçerse, kimsenin onayını beklemeden **doğrudan canlı sunucuya (Production) yüklenir.**
- Günde onlarca kez güncelleme yapan Amazon, Netflix ve Facebook gibi dev şirketler bu yapıyı kullanır. Muazzam bir test altyapısı gerektirir (Çünkü hata doğrudan müşteriye yansır).

## DevOps Kültürü
CI/CD, DevOps (Development + Operations) kültürünün kalbidir. Eskiden Yazılımcı (Dev) kodu yazar, Sistemciye (Ops) USB bellek veya FTP ile verirdi. Sistemci kurarken kod patlar ve kavga çıkardı. CI/CD bu insan faktörünü ortadan kaldıran muazzam bir barış elçisidir.
