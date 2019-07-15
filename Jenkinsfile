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
        sh '''docker build -t portal-empleado-test -f Dockerfile.test .
docker run --rm portal-empleado-test

'''
      }
    }
    stage('Run') {
      steps {
        sh '''docker run --name portal-empleado -p 3000:3000 portal-empleado:$BUILD_NUMBER node /var/www/index.js &
'''
        echo 'RUNNING'
      }
    }
    stage('End') {
      steps {
        echo 'End of pipeline'
      }
    }
  }
}