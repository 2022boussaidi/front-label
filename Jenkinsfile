

pipeline {
    agent any
 
    tools { nodejs "NodeJS_14" }

    environment {
        // Define environment variables used throughout the pipeline
        registryUrl = "http://YOUR_REGISTRY_IP:PORT"  // Replace with your Docker registry URL
        imageTag = "YOUR_REGISTRY_IP:PORT/reactapp"   // Replace with your Docker image tag
        dockerImage = ''
        serverIp = "YOUR_SERVER_IP"                    // Replace with your server's IP address
        serverUser = "YOUR_SERVER_USERNAME"            // Replace with your server's username
    }
 
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
                sh 'npm run  build'
               
                
            }
        }
         stage('run React App') {
            steps {
                
                 sh 'npm start'
                
            }
        }
}
}
