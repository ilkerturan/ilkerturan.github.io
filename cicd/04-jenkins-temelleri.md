# Bölüm 04: Jenkins Temelleri

GitHub Actions ve GitLab CI bulut tabanlı modern sistemlerken, **Jenkins** kurumsal dünyanın en köklü, Java tabanlı, açık kaynak ve on-premise (kendi sunucunuza kurduğunuz) CI/CD sunucusudur. Eklenti (Plugin) zenginliği sayesinde entegre edilemediği teknoloji yoktur.

---

## 1. Master ve Agent (Node) Mimarisi
Jenkins tüm işi tek başına yapmaz. 
- **Jenkins Master (Controller):** Arayüzü sunduğu, işleri (Job) yönettiği ve orkestrasyon yaptığı ana sunucudur. İşleri derlemez, sadece dağıtır.
- **Jenkins Agents (Worker Nodes):** Asıl derleme (Build) ve test yükünü çeken "İşçi" sunuculardır. Biri Linux, biri Windows, biri Mac olabilir (Örn: iOS uygulamasını Mac agent'a yollar).

## 2. Jenkinsfile (Pipeline as Code)
Eskiden Jenkins arayüzünden form doldurarak iş (Job) oluşturulurdu. Günümüzde projenizin ana dizinine koyduğunuz `Jenkinsfile` adında bir metin dosyası ile tüm otomasyon (Pipeline) kodla tanımlanır.

İki şekilde yazılabilir:
- **Scripted Pipeline:** Groovy diliyle yazılan, çok esnek ama karmaşık eski yapıdır.
- **Declarative Pipeline:** Daha modern, okunması kolay, kuralları net olan yapıdır.

## 3. Örnek Declarative Pipeline

```groovy
pipeline {
    agent any // Boşta olan herhangi bir işçi (agent) üzerinde çalış
    
    stages {
        stage('Checkout') {
            steps {
                // Kodu Git'ten çek
                git branch: 'main', url: 'https://github.com/ornek/proje.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Proje derleniyor...'
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testler çalışıyor...'
                sh 'npm test'
            }
        }
        stage('Deploy') {
            when {
                branch 'main' // Sadece main dalındaysa Deploy yap
            }
            steps {
                echo 'Canlıya alınıyor...'
                sh './deploy.sh'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline başarıyla tamamlandı!'
        }
        failure {
            echo 'HATA! Pipeline patladı, Slack üzerinden ekibe mesaj at!'
        }
    }
}
```
