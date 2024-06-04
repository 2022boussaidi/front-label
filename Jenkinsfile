

pipeline {
    agent any
 
    tools { nodejs "NodeJS_14" }

 
    stages {
          stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/2022boussaidi/front-label']]])
            }
        }

       
        stage('Build React App') {
            steps {
                sh 'rm package-lock.json'
                sh 'npm install'
             
               
                
            }
        }
          stage('Build docker image') {
            steps {
                script {
                    sh 'docker build -t chaimaboussaidi2000/front-label .'
                }
            }
        }

        stage('Push image to Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'id', variable: 'nouveaupass123')]) {
                        sh "echo \${nouveaupass123} | docker login -u chaimaboussaidi2000 --password-stdin"
                    }
                    sh "docker push chaimaboussaidi2000/front-label"
                }
            }
        }

        stage('Build and Run Docker Compose') {
            steps {
                script {
                    // Assuming your docker-compose.yml file is in the project root
                    sh 'docker-compose up -d'
                }
            }
        }
}
}
