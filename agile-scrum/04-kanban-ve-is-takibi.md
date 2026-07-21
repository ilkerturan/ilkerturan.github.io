# Bölüm 04: Kanban Felsefesi ve İş Takibi Mimarisi

Agile (Çevik) felsefenin Scrum'dan sonra en çok bilinen diğer uygulanış biçimi **Kanban**'dır. Aslen 1940'larda Toyota fabrikalarındaki araba üretim süreçlerini (Just-in-Time) optimize etmek, stokları eritmek ve israfı önlemek için icat edilmiştir. Daha sonra yazılım dünyasına çok başarılı bir şekilde uyarlanmıştır.

## 1. Kanban'ın Scrum'dan Farkı Nedir?
Scrum devrimcidir, iş süreçlerinizi (Sprintlerle) baştan aşağı değiştirir, rolleri yıkar. **Kanban ise evrimcidir.** Ekibin rollerine (Müdür, Şef vb.) dokunmaz. "Sprint" denilen zaman kutuları KESİNLİKLE YOKTUR.
- Scrum'da işler 2 haftalık paketler (Sprintler) halinde içeri alınır, kilitlenir ve bitene kadar dokunulmaz.
- Kanban'da ise süreç **Sürekli Akış (Continuous Flow)** halindedir. İş girer, anında yapılır ve canlıya alınır. Bir acil (Hotfix) iş çıktığında sprint'in bitmesini beklemek zorunda kalmazsınız.

## 2. Kanban Board (Kanban Tahtası)

Kanban'ın en temel aracı bir tahtadır (Jira, Trello gibi dijital araçlarda Sütunlardan oluşur). 
Amacı: Tüm işin görünür olmasını sağlamak ve darboğazları (Bottlenecks) şeffaflaştırmaktır.

En basit Kanban Tahtası 3 sütundan oluşur:
1. **To-Do (Yapılacaklar):** Henüz başlanmamış işlerin beklediği yığın.
2. **In Progress (Yapılıyor):** Ekibin şu an bizzat üzerinde kod yazdığı işler.
3. **Done (Bitti):** Canlıya (Production) alınmış ve tamamlanmış işler.

Daha gelişmiş bir yazılım ekibinde tahta şöyle olabilir:
`Backlog` -> `To-Do` -> `In Progress` -> `Code Review (Kod İncelemesi)` -> `Testing (Test Aşamasında)` -> `Deploy (Yayında)`

## 3. Kanban'ın Kalbi: WIP Limitleri (Work In Progress)

Kanban'ın sadece işleri sütunlar arasında kaydırmak olduğunu sananlar fena yanılır. Kanban'ın asıl sihri **WIP (Aynı Anda Yapılan İş) Limitidir**.

Eğer `In Progress` sütununda bir geliştiricinin üzerinde aynı anda 5 tane iş (Task) gözüküyorsa, bu korkunç bir durumdur (Multitasking). İnsan beyni aynı anda 5 koda odaklanamaz, sürekli bağlam değiştirir (Context Switching) ve üretkenlik %80 düşer.

- Kanban der ki: Her sütuna bir **WIP Limiti** koyun. Örneğin "In Progress" sütununun limiti "3" olsun.
- Eğer o sütunda 3 iş varsa, yeni bir işi `To-Do` listesinden çekip alamayız (Sistem kilitlenir). Ekip mecbur kalıp, önce elindeki yarım kalmış 3 işten birini bitirip `Done` sütununa kaydırmalıdır ki yeni işe yer açılsın.
- Bu kuralın felsefesi: **"Yeni işlere başlamayı bırak, elindeki işleri bitirmeye odaklan! (Stop starting, start finishing!)"**

## 4. Kullanım Senaryosu (Hangi Projede Hangisi?)
- Eğer baştan aşağı yeni bir proje kodluyorsanız (Örn: 6 ay sürecek yeni bir mobil uygulama), hedef ve kapsam bellidir. Planlama gerektirir. **Scrum mükemmeldir.**
- Eğer canlıda (Production) olan mevcut bir sitenin Bakımını (Maintenance) ve Destek biletlerini (Support Tickets) yapıyorsanız, yarın hangi sunucunun çökeceği veya müşteriden hangi anlık hatanın geleceği belli olmadığı için Sprint yapamazsınız. Esneklik gerekir. Sürekli akışa dayalı **Kanban mükemmeldir.**
