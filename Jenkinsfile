

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
                checkout([$class: 'GitSCM', branches: [[name: '*/ip-label']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/2022boussaidi/reactUI']]])
            }
        }

       
        stage('Build React App') {
            steps {
                // Install project dependencies and build the React application
                sh 'npm install'
                sh 'npm run build'
            }
        }
}
}
