pipeline {
    agent any

    environment {
		GRA_MUZYCZNA_BACKEND_HOST="https://gra-muzyczna.mysliwczykrafal.pl"
    }

    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    sh """
					rm .env || true
					echo "VITE_API_URL=${GRA_MUZYCZNA_BACKEND_HOST}" >> .env
					echo "VITE_WS_URL=${GRA_MUZYCZNA_BACKEND_HOST}" >> .env
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t \"gra-muzyczna\" .'
            }
        }

        stage('Stop and Remove Existing Container') {
            steps {
				sh 'docker stop gra-muzyczna || true'
				sh 'docker rm gra-muzyczna || true'
            }
        }

        stage('Run New Container') {
            steps {
				sh 'docker run -d --restart always --name \"gra-muzyczna\" -p 8003:8000 \"gra-muzyczna\"'
            }
        }
    }
}
