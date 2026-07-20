# Bölüm 04: Test Driven Development (TDD) Vizyonu

Yazılım sektörünün en prestijli, yazılımcıları "Usta" seviyesine çıkaran geliştirme metodolojisidir. Türkçe meali: **Test Yönelimli Geliştirme.**

---

## 1. Klasik Geliştirme (Yanlış Yöntem)
Geleneksel dünyada süreç şöyledir:
1. Kod yazılır.
2. Yazılan kodu test eden bir Unit Test yazılır.
Bu yaklaşımda genellikle testler angarya (gereksiz yük) olarak görülür. Yazılımcı kendi yazdığı koda aşık olduğu için, testi sadece kendi yazdığı kodun "Çalışan" senaryolarına göre yazar. Kendi hatalarını (Bug) göremez.

## 2. TDD'nin Zihin Devrimi (Red-Green-Refactor)
TDD der ki: **"Eğer ortada patlayan bir test yoksa, tek bir satır bile kod yazamazsın!"**
TDD'de her şey tersine işler. Geliştirme şu 3 efsanevi döngüyle ilerler:

1. **RED (Kırmızı): Önce Testi Yaz.** Ortada henüz hiçbir fonksiyon yokken, o fonksiyon varmış gibi testini yazarsınız. Çalıştırdığınızda ortada kod olmadığı için test HATA (Red/Kırmızı) verir.
2. **GREEN (Yeşil): Sadece Testi Geçecek Kodu Yaz.** Testin kırmızı verdiğini gördünüz. Şimdi asıl koda gidip sadece o testi "Yeşil (Başarılı)" yapacak kadar (bazen en aptalca, en çirkin haliyle) kod yazarsınız.
3. **REFACTOR (Yeniden Düzenle / Temizle):** Test yeşile döndü (Artık bir güvenlik ağınız var). Şimdi asıl koda geri döner, spagetti gibi yazdığınız o çirkin kodu, çalışmasını bozmadan Clean Code (Temiz Kod) prensiplerine göre tertemiz hale getirirsiniz. Test yeşil kalmaya devam ediyorsa, kusursuz bir iş başardınız demektir.

Bu metodoloji sizi gereksiz kod yazmaktan (YAGNI) kurtarır ve kusursuz bir mimari kurmaya zorlar!
