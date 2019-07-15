pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''docker build --tag portal-empleado:$BUILD_NUMBER .
docker stop portal-empleado && docker rm portal-empleado
echo "Build step finished"'''
      }
    }
    stage('Unit test') {
      steps {
        sh 'docker run --name portal-empleado -p 1337:1337 portal-empleado:$BUILD_NUMBER npm test &'
      }
    }
    stage('End') {
      steps {
        echo 'End of pipeline'
      }
    }
  }
}