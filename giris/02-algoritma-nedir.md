# Bölüm 02: Algoritma Nedir? (Adımlar Sanatı)

Yazılım dünyasının mutlak temeli kodlar değil, **Algoritmalar**dır. Bir dili (Python, C#, Java) hiç bilmeden harika algoritmalar kurabilirsiniz. Çünkü algoritma, teknolojiden bağımsız bir düşünce sistemidir.

## 1. Algoritmanın Tanımı
**Algoritma**, belirli bir problemi çözmek veya bir amaca ulaşmak için tasarlanmış, **başlangıcı ve sonu olan, kesin ve sıralı adımlar bütünüdür.** 

### Algoritmanın 3 Altın Kuralı:
1. **Kesinlik (Belirlilik):** Hiçbir adım yoruma açık olmamalıdır. "Biraz un ekle" algoritma değildir. "250 gram un ekle" bir algoritmadır. Bilgisayarlar inisiyatif alamazlar.
2. **Sıralılık:** Adımların sırası hayati önem taşır. Önce çayı demleyip sonra suyu ısıtamazsınız.
3. **Sonluluk:** Bir algoritma sonsuza kadar dönemez. Şartlar ne olursa olsun bir noktada sonuca ulaşıp "Bitti" demelidir.

## 2. Günlük Hayattan Algoritma Örneği (Çay Demlemek)

Bir bilgisayara "Çay Demle" emrini verirseniz çöker, çünkü çayın ne olduğunu bilmez. Onu adım adım yönlendirmeliyiz:

1. **Başla**
2. Çaydanlığın alt kısmına 1 litre su koy.
3. Çaydanlığı ocağa yerleştir.
4. Ocağı yak.
5. Su kaynayana kadar BEKLE (Döngü).
6. Su kaynadığında üst demliğe 3 kaşık çay koy.
7. Alt kısımdaki kaynar suyun yarısını üst demliğe dök.
8. Alt kısma tekrar soğuk su ilave et.
9. 15 dakika boyunca çayın demlenmesini BEKLE.
10. Çayı bardaklara servis et.
11. **Bitir**

## 3. Akış Diyagramları (Flowcharts)

Yazılımcılar kod yazmaya başlamadan önce karmaşık algoritmaları kağıt üzerinde şekillerle (Akış diyagramlarıyla) çizerler. Bu, olası mantık hatalarını kodlamadan önce görmeyi sağlar.

- **Elips:** Başla ve Bitir adımlarını temsil eder.
- **Dikdörtgen:** Matematiksel işlemleri veya eylemleri (Örn: `A = A + 1`) temsil eder.
- **Eşkenar Dörtgen:** Karar (If-Else) yapılarını temsil eder. İçinde soru sorulur (Örn: `Şifre Doğru Mu?`). İki çıkışı vardır: Evet ve Hayır.
- **Paralelkenar:** Kullanıcıdan alınan verileri (Girdi) veya ekrana basılan sonuçları (Çıktı) temsil eder.

## 4. Neden Algoritma Öğrenmeliyiz?
Yeni başlayanların en büyük hatası hemen "Hangi dili öğrenmeliyim?" diyerek doğrudan Python veya C# kursuna atlamasıdır. Algoritma bilmeyen bir kişi dili ezberler, ama ekrana boş bir dosya açıldığında "Şimdi ne yazacağım?" diyerek kalakalır. Çünkü dil (Syntax) bir alettir, algoritma ise mühendisliktir. Çekiç kullanmayı bilmek sizi mimar yapmaz.
