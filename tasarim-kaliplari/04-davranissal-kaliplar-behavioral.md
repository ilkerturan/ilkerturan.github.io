# Bölüm 04: Davranışsal Kalıplar (Behavioral Patterns)

Davranışsal kalıplar, nesneler arasındaki iletişimi, mesajlaşmayı ve sorumluluk devirlerini yönetir. 

---

## 1. Observer (Gözlemci) Kalıbı
**Problem:** Sistemde bir nesnenin durumu (State) değiştiğinde, onu bekleyen diğer 10 nesnenin (Örn: Ekrandaki butonlar, e-posta modülü) anında haberdar olması gerekmektedir. Ancak nesneler sürekli "Değiştin mi?" diye sorarak (Polling) sistemi yormamalıdır.
**Analoji:** YouTube'da sevdiğiniz bir kanala **"Abone (Subscribe / Observer)"** olursunuz. Kanal her gün video yükleyip yüklemediğini kontrol etmezsiniz. Kanal (Publisher / Subject) yeni video yüklediğinde (Durum değiştiğinde), abone olan herkese anında bir **Bildirim (Notify)** gönderir.
*(Modern mimarilerde Event-Driven sistemler, RabbitMQ, Kafka ve MediatR bu kalıbın üzerine inşa edilmiştir).*

## 2. Strategy (Strateji) Kalıbı
**Problem:** Bir problemi çözmek için birden fazla yolunuz (Algoritmanız) var. (Örn: Veriyi ZIP'lemek, RAR'lamak veya 7Z yapmak). Bu yolları devasa `switch-case` blokları içine yazmak kodu kirletir ve yeni yollar eklemeyi zorlaştırır (Open-Closed ihlali).
**Analoji:** Evden işe giderken Navigasyon açtınız. Sizin amacınız işe ulaşmaktır. Ancak Navigasyon size sorar: (1) Araba Stratejisi, (2) Otobüs Stratejisi, (3) Yürüme Stratejisi. Çalışma anında (Run-time) istediğiniz stratejiyi (Algoritmayı) seçersiniz, amaç (işe gitmek) değişmez ama davranış (rota) değişir.

## 3. State (Durum) Kalıbı
**Problem:** Bir nesnenin o anki "Durumuna" göre davranışlarının tamamen değişmesi gerekir. (Yine devasa `if-else` bloklarından kurtulmak hedeflenir).
**Analoji:** Vending Machine (Otomat / Kahve Makinesi). 
Makinenin iki durumu vardır:
- *Durum 1 (Para Yok):* Düğmeye basarsanız kahve vermez, "Para at" der.
- *Durum 2 (Para Var):* Düğmeye basarsanız kahve verir, "Teşekkürler" der.
Nesne (Makine) aynıdır, ancak içindeki *State (Durum)* değiştiği an, aynı düğmeye (Metoda) basmanıza rağmen tamamen farklı tepkiler (Davranışlar) verir.
