# Bölüm 01: Tasarım Şablonları (Design Patterns) Nedir?

*"Tekerleği yeniden icat etmeyin."*

---

## 1. Neden Tasarım Şablonları Var?
Yazılım mühendisliği tarihi boyunca geliştiriciler (farklı dillerde, farklı ülkelerde olsalar da) aslında hep **aynı temel mimari problemlerle** karşılaşmışlardır. 
1994 yılında efsanevi "Gang of Four (GoF) - Dörtlü Çete" adındaki mühendis grubu bir araya gelip dediler ki: *"Biz bu sorunlara yıllarca uğraşıp ortak ve mükemmel çözümler (Şablonlar) bulduk. Herkes aynı sorunu baştan çözmeye çalışmasın, bu şablonları kullansın."*

İşte bu şablonlar (Patterns), kopyalanıp yapıştırılacak kodlar değil; **mimari problem çözme stratejileridir.**

## 2. Şablonların Üç Ana Ailesi
Tasarım kalıpları, problemin doğasına göre 3 gruba ayrılır:
1. **Yaratılışsal (Creational):** Nesnelerin (Objelerin) "Nasıl Oluşturulacağı (Doğacağı)" ile ilgilenirler. (Örn: `new Class()` demek yerine nesneyi bir Fabrikaya ürettirmek).
2. **Yapısal (Structural):** Sınıfların ve nesnelerin daha büyük ve karmaşık yapılar kurmak için birbirine "Nasıl Bağlanacağı" ile ilgilenirler.
3. **Davranışsal (Behavioral):** Nesnelerin birbirleriyle "Nasıl İletişim Kuracağı (Mesajlaşacağı)" ve sorumlulukları nasıl devredeceği ile ilgilenirler.

## 3. Günümüzde Tasarım Kalıpları
90'larda yazılan kalıpların bazıları günümüzde evrim geçirmiştir. Örneğin, eskiden el üstünde tutulan **Singleton (Tekil)** kalıbı, modern sistemlerde test edilebilirliği yok ettiği ve Global State (Küresel Durum) yarattığı için bir **Anti-Pattern (Kötü Pratik)** olarak anılmaya başlanmıştır. Ancak konsept ölmemiş, Dependency Injection (DI) araçlarına (AddSingleton) devredilmiştir.

Gelecek bölümlerde, en hayati kalıpları hayatın içinden analojilerle öğreneceğiz.
