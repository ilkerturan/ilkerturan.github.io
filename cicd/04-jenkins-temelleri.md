# Bölüm 04: Jenkins (Geleneksel DevOps Devi) Temelleri

GitHub Actions, GitLab CI veya Azure DevOps modern, bulut tabanlı ve kullanımı kolay (Yönetilmeyen - Serverless gibi) araçlardır. Ancak dünyadaki "Kurumsal (Enterprise), Banka ve Holding" sınıfındaki şirketlerin mahzenlerine indiğinizde, orada genelde ihtiyar, devasa ama inanılmaz güçlü bir kahya görürsünüz: **Jenkins.**

## 1. Jenkins Nedir ve Neden Hala Popülerdir?
Jenkins, 2011'de doğmuş (Eski adı Hudson), Java ile yazılmış, logosu Şapkalı bir Uşak (Kahya) olan Açık Kaynaklı bir Otomasyon (CI/CD) Sunucusudur.

**Neden modern araçlara rağmen hala efsanedir?**
- **Tam Kontrol (On-Premise):** Bir banka "Kodlarımın ve Pipeline sistemimin GitHub'ın bulut sunucularında, Amerika'da çalışmasını istemiyorum (Güvenlik yasaları/KVKK)" derse, Jenkins'i alıp KENDİ yerel (Bina içindeki) sunucularına, tamamen kapalı ağda kurabilir.
- **Eklenti (Plugin) Cehennemi (ve Cenneti):** Jenkins tek başına çok saf bir robottur. Onu değerli kılan, arkasındaki binlerce eklentisidir. Dünyada entegre olamayacağı HİÇBİR sistem (Amazon, Docker, Slack, Kubernetes, eski tip mainframe'ler vb.) yoktur.
- **Dağıtık Mimari (Master - Slave/Agent):** Jenkins'in beyni (Master) ayrı çalışır, o beyne bağlı 50 tane işçi (Agent) makinesi olabilir. Master, Mac derlemesini Mac makinesine, Windows derlemesini Windows makinesine yollar, yükleri harika dağıtır.

## 2. Jenkinsfile (Kod Olarak Pipeline)
Eskiden (Karanlık Çağlarda) Jenkins yöneticileri (DevOps uzmanları), Pipeline adımlarını Jenkins'in Web Arayüzüne (UI) girip tıklayarak "Önce Build yap, sonra Test yap" diye elle kutucuklara doldururlardı. Bu felaketti, ayarlar silinince tarih oluyordu.

Günümüzde Jenkins de **Pipeline as Code (Kod olarak Boru Hattı)** felsefesine geçmiştir. Yazılımcılar kodlarının (Git reposunun) tam içine **`Jenkinsfile`** adında bir dosya bırakırlar. Jenkins bu dosyayı okur ve Groovy dilinde yazılmış adımları çalıştırır.

*(Örnek Bildirimsel - Declarative Jenkinsfile Anatomisi)*
```groovy
pipeline {
    agent any // Hangi işçi (Slave) müsaitse o çalıştırsın

    stages { // Aşamalar (Boru hattının odaları)
        
        stage('1- Checkout (Kodu Indir)') {
            steps {
                git 'https://github.com/sirket/projem.git' // GitHub'dan kodu çek
            }
        }
        
        stage('2- Build (Derle)') {
            steps {
                sh 'dotnet build' // Linux kabuğunda derleme komutu
            }
        }
        
        stage('3- Test (Güvenlik Kapısı)') {
            steps {
                sh 'dotnet test' // Testlerden geçerse devam et, geçemezse KIRMIZI (Fail) yap
            }
        }
        
        stage('4- Deploy (Canliya Al)') {
            steps {
                // Sadece ve sadece 'main' branchinde isek canlıya at
                when { branch 'main' } 
                sh './k8s-deploy.sh' // Kubernetes'e fırlatan shell script
            }
        }
    }
}
```
