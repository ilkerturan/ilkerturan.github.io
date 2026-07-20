# Bölüm 04: Bulutun Devleri (AWS, Azure, GCP)

Dünyadaki şirketlerin uygulamaları (Netflix'ten tutun da kullandığınız bankalara kadar) büyük oranda üç büyük teknoloji devinin bulut sisteminde (Veri Merkezlerinde) barınır.

---

## 1. Amazon Web Services (AWS)
Pazarın açık ara lideridir (Bulut kavramını başlatan şirkettir). Hizmet çeşitliliği en fazla olandır. Netflix, Twitch, Epic Games gibi devler tamamen AWS altyapısında çalışır.

*   **Sanal Sunucu (IaaS) Adı:** EC2 (Elastic Compute Cloud)
*   **Depolama Alanı Adı:** S3 (Simple Storage Service - Sonsuz dosya yükleme havuzu)
*   **Serverless Adı:** AWS Lambda
*   **Veritabanı:** RDS (Relational Database Service)

## 2. Microsoft Azure
Microsoft'un bulut hizmetidir ve pazarda ikinci sıradadır. Özellikle büyük kurumsal (Enterprise) şirketler, bankalar ve .NET/C# ekosistemi kullanan firmalar tarafından çok sevilir. (Çünkü C# kodu Azure ile kusursuz uyum sağlar).

*   **Sanal Sunucu (IaaS) Adı:** Azure Virtual Machines
*   **Depolama Alanı Adı:** Azure Blob Storage
*   **Serverless Adı:** Azure Functions
*   **Veritabanı:** Azure SQL Database

## 3. Google Cloud Platform (GCP)
Pazarın üçüncü büyüğüdür. Google'ın kendi arama motorunu ve YouTube'u barındırdığı inanılmaz hızlı fiber altyapısını kullanır. Özellikle Kubernetes'i (K8s) icat eden firma oldukları için, konteyner mimarilerinde (GKE) ve Makine Öğrenmesi (Big Data, TensorFlow) alanında eşsiz bir güce sahiptir. Spotify ve X (Twitter) bazı hizmetlerini burada barındırır.

*   **Sanal Sunucu (IaaS) Adı:** Compute Engine
*   **Depolama Alanı Adı:** Cloud Storage
*   **Serverless Adı:** Cloud Functions
*   **Veritabanı:** Cloud SQL

*(Hangi sağlayıcıyı seçerseniz seçin, temel mühendislik ve mimari mantığı tamamen aynıdır, sadece arayüzleri ve hizmetlere verdikleri isimler değişir.)*
