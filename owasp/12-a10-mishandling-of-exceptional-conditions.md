# Bölüm 12: A10 - SSRF (Sunucu Tarafı İstek Sahteciliği)

*Server-Side Request Forgery* (SSRF), modern Bulut (Cloud) ve Mikroservis dünyasının gelişmesiyle listeye 10. sıradan hızlı bir giriş yapan çok popüler bir saldırıdır.

Felsefesi Şudur: Hacker dış dünyadan (İnternetten) şirketin içindeki özel sunuculara DİREKT erişemez (Çünkü araya devasa Firewall'lar kurulmuştur). Hacker şöyle bir kurnazlık düşünür: "Ben o içerideki sunucuya giremiyorum... Peki Dışarıya açık olan (ve iç sunucularla sohbet edebilen) Web Sunucusunu (Benim kullandığım siteyi) KANDIRIRSAM ve o iç sunucuya benim yerime SİTENİN KENDİSİNİ saldırtırsam?"

## 1. SSRF Saldırısı Nasıl Yapılır?

**Senaryo:** Sitenizde bir özellik var. Kullanıcı kendi sitesindeki bir resmi sizin profil resminiz yapmak için, sizin sitenize bir URL yazıyor. Sizin Arka plan kodunuz (Server), o URL'ye gidip resmi indiriyor.

Hacker formdaki o "Resim URL'si" kutucuğuna gidip şu adresi yazar: 
`http://localhost:8080/admin/db_backup.zip` (veya bulutta AWS'nin metadata ip'si olan `http://169.254.169.254/latest/meta-data/`)

Sizin Dış Web Sunucunuz (Saf kodunuz) ne yapar? "Kullanıcı benden buraya gitmemi istedi" der, gider "Kendi iç ağına (Localhost)" bağlanır, devasa veritabanı yedeğini (veya Cloud gizli AWS keylerini) indirir ve "Al kardeşim resmin" diyerek Hacker'a yollar!

Saldırgan, SİZİN SUNUCUNUZU SİLAH OLARAK KULLANARAK kendi arka bahçenize saldırtmıştır! 

## 2. Nasıl Engellenir (Savunma)?

SSRF'yi engellemek oldukça zordur çünkü sunucunun internete çıkması bir ihtiyaçtır.

1. **Deny by Default (Varsayılan Olarak Yasakla):**
   Uygulamanızın sadece ve sadece belirli IP'lere veya güvenilir alan adlarına (Whitelist) gitmesine izin verin. Eğer "Resim URL" kutucuğuna `127.0.0.1` (Localhost) veya `192.168.x.x` (İç ağ) gibi kelimeler yazılmışsa, kod bu isteği ANINDA DURDURMALI ve engellemelidir.
2. **Kullanıcı Girdisini Doğrula:**
   Dışarıya HTTP isteği atacak kod (Örn: C#'ta `HttpClient`), kullanıcıdan gelen ham URL metnini asla direkt kabul etmemelidir. Önce bu URL'nin bir resim (png/jpg) olup olmadığı ve yasal bir alan adında olup olmadığı regex ve format kontrollerinden geçirilmelidir.
3. **Ağ İzolasyonu (Network Segmentation):**
   Dışarıya açık Web Sunucunuz, arkadaki Veritabanına ulaşabilmeli ama sistem yönetimi (Admin) panellerine ulaşamamalıdır. Araya iç ağ güvenlik duvarları (Firewall) konmalıdır.
