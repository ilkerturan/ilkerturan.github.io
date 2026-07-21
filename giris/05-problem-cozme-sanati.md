# Bölüm 05: Yazılımcı Olmak ve Problem Çözme Sanatı (Debugging)

Bir yazılımcının (Developer) günlük mesaisinin %10'u yeni kod yazmakla, %90'ı ise çalışmayan kodu okumak ve düzeltmekle (Debugging) geçer. Hollywood filmlerindeki gibi aralıksız klavye tıklatan ve hiç hata yapmayan hacker figürleri tamamen kurgudur.

Gerçek bir kıdemli (Senior) yazılımcıyı, yeni başlayandan (Junior) ayıran şey bildiği dillerin sayısı değil, **hata ile karşılaştığında gösterdiği psikolojik direnç ve araştırma yeteneğidir.**

## 1. Hata (Bug) Nedir ve Neden Çıkar?
Yazılım dünyasında hatalara **Bug (Böcek)** denir. Bunun sebebi 1947 yılında dünyanın ilk bilgisayarlarından olan Mark II'nin bir rölesinin arasına giren gerçek bir güve böceğinin sistemi çökertmesidir.
Bug'lar üç çeşittir:
1. **Syntax Errors (Yazım Hataları):** En masumudur. Noktalı virgülü unutmak, tırnağı kapatmamak gibi sebeplerle çıkar. Derleyici (Compiler) programı başlatmadan önce sizi uyarır, nerede hata olduğunu satır satır söyler.
2. **Runtime Errors (Çalışma Zamanı Hataları):** Program çalışırken, hiç beklenmedik bir durum olduğunda programın "patlaması" (Çökmesi) dir. Örneğin sistem bir sayıyı 0'a bölmeye çalıştığında veya olmayan bir veritabanı dosyasına erişmek istediğinde yaşanır.
3. **Logic Errors (Mantık Hataları):** En tehlikelisi ve en zorusudur. Program çökmeksizin tıkır tıkır çalışır, hiçbir kırmızı hata mesajı vermez. Ancak Maaş Hesaplarken sonucun "25.000" çıkması gerekirken "2.500" çıkıyordur. Hatayı sizin matematiksel algoritmanızda aramanız gerekir.

## 2. Debugging (Hata Ayıklama) Sanatı
Çalışmayan bir kodu düzeltirken izlenmesi gereken bilimsel adımlar şunlardır:

1. **Hatayı Kabullenmek:** "Kodumda hata yok, bilgisayar bozuldu veya dilin kendisinde sorun var" cümlesi amatörlüğün zirvesidir. Hata her zaman sizdedir.
2. **Hata Mesajını (Log) Okumak:** Ekrana basılan kırmızı yazıyı anında kapatıp koda dönmeyin. Hata mesajı size sorunun KİMDEN ve HANGİ SATIRDAN kaynaklandığını bağırarak söyler (Örn: `NullReferenceException at line 45`).
3. **Böl ve Yönet (Divide and Conquer):** 500 satırlık bir kod çalışmıyorsa, tamamına boş boş bakmayın. Kodun yarısını yoruma (comment) alın. Çalışıyorsa, demek ki hata yoruma aldığınız yarıdadır. Böyle böyle şüpheli alanı daraltın.
4. **Kauçuk Ördek Yöntemi (Rubber Duck Debugging):** Çok ünlü bir yöntemdir. Masanıza plastik bir oyuncak ördek koyun. Çalışmayan kodunuzu ördeğe sesli bir şekilde, satır satır ne yaptığını anlatın. "Burada veriyi aldım, burada ikiyle çarptım..." Sesli anlatım yaparken beyniniz mantık hatasını %80 oranında kendi kendine fark edecektir.

## 3. Google ve StackOverflow Kullanımı
Bir yazılımcının en büyük silahı hafızası değil, doğru anahtar kelimelerle araştırma yapabilmesidir.
Hata mesajını aynen kopyalayıp Google'a yapıştırdığınızda karşınıza çıkacak ilk site muhtemelen **Stack Overflow** olacaktır. Sizin yaşadığınız hatayı dünyada daha önce yüzlerce kişi yaşamış ve oraya çözümü yazmıştır.

Kodu ezberlemeyin. Felsefeyi (Algoritmayı) öğrenin, dili ise dokümantasyonlardan ve internetten araştırarak kullanın.
