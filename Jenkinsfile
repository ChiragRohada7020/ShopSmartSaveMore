pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/ChiragRohada7020/Smart-Shopping-.git'
            }
        }
        stage('Build & Deploy') {
            steps {
                sh 'docker-compose -f docker-compose.jenkins.yml down'
                sh 'docker-compose -f docker-compose.jenkins.yml up -d --build'
            }
        }
    }
}