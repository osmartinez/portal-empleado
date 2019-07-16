pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''docker stop portal-empleado && docker rm portal-empleado
docker build -t portal-empleado -f Dockerfile .
docker run --name portal-empleado -p 4000:5555'''
      }
    }
    stage('Test') {
      steps {
        sh '''docker stop portal-empleado && docker rm portal-empleado
'''
      }
    }
  }
}