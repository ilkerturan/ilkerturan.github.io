# Bölüm 04: Büyük Üçlü (AWS, Azure, GCP) ve Kavram Haritası

Bulut bilişim pazarında trilyon dolarlık rekabet, aslen üç büyük dev (The Big Three) arasında döner. Hepsi birbirinin aynısı çözümler sunar, sadece isimleri farklıdır. (Tıpkı BMW, Mercedes ve Audi'nin hepsinin araba olması, ancak direksiyon düğmelerinin yerinin farklı olması gibi).

## 1. Amazon Web Services (AWS)
Pazarın %32 ile açık ara lideridir (Bulutu ilk icat eden ve pazara sokan firmadır, ilk giren avantajı vardır).
Dünyadaki en büyük şirketlerin, Netflix, Twitch ve Airbnb gibi devlerin altyapısını oluşturur. Sunulan hizmet sayısı o kadar fazladır ki içinde kaybolursunuz.
**Kritik AWS Terimleri Sözlüğü:**
- **EC2 (Elastic Compute Cloud):** Amazon'daki "Sanal Sunucu (IaaS)" kiralama hizmetinin adıdır. (Buluttaki bilgisayarınız).
- **S3 (Simple Storage Service):** Bulutun harddiskidir. Fotoğrafların, videoların, dosyaların depolandığı sınırsız depolama deposudur.
- **RDS (Relational Database Service):** SQL tabanlı (MySQL, PostgreSQL vb.) veritabanlarını bulutta barındırma hizmetidir.
- **Lambda:** Amazon'un Serverless (Sunucusuz) mimari servisidir.

## 2. Microsoft Azure
Pazarın ikincisidir (%22). Amazon kadar esnek olmasa da, gücünü **Microsoft Ekosisteminden** alır.
Dünyadaki kurumsal şirketlerin %80'i zaten bilgisayarlarında Windows Server, Office 365, Active Directory gibi Microsoft ürünleri kullanır. Azure, bu şirketlerin sistemlerini kusursuz ve en güvenilir şekilde buluta entegre etmek için tasarlanmıştır. C# (.NET) ile geliştirilen kurumsal projelerin bir numaralı evidir.
**Kritik Azure Terimleri Sözlüğü:**
- **Azure Virtual Machines (VM):** Azure'un "Sanal Sunucu" servisidir (AWS EC2'nin rakibi).
- **Azure Blob Storage:** Resim ve belgelerin depolandığı dev alan (AWS S3'ün rakibi).
- **Azure Functions:** Azure'un Serverless hizmetidir (AWS Lambda'nın rakibi).

## 3. Google Cloud Platform (GCP)
Pazarın üçüncüsüdür (%11). Pazar payı küçük görünse de, dünyanın en iyi mühendislik felsefesine sahip bulutudur.
Google'ın alametifarikası **Big Data (Büyük Veri), Yapay Zeka (AI) ve Machine Learning (Makine Öğrenmesi)** araçlarındaki tartışılmaz liderliğidir. Ayrıca Kubernetes denilen ve dünyayı kasıp kavuran mimariyi Google icat ettiği için, Konteyner sistemlerini en iyi ve en ucuz çalıştıran bulut sağlayıcısıdır. Spotify gibi veri analizi saniyede petabyteları bulan devler GCP kullanır.
**Kritik GCP Terimleri Sözlüğü:**
- **Compute Engine:** GCP'nin sanal sunucusu.
- **Cloud Storage:** Dosya deposu.
- **BigQuery:** Devasa verileri milisaniyeler içinde SQL ile analiz etmeye yarayan, rakiplerinin çok ötesinde Google'ın harika veri ambarı (Data Warehouse) sistemidir.

### Hangisini Seçmeli?
- Sektör standardı, bol doküman, herkesin bilmesi ve ilk başlayan için en iyisi: **AWS**
- Şirketiniz kurumsalsa, hali hazırda C#, Windows Server ve Microsoft mimarisi kullanıyorsa: **Azure**
- Veri analizi, Yapay Zeka modelleri (Tensorflow vb.) eğitecekseniz veya saf Kubernetes koşturacaksanız: **GCP**
