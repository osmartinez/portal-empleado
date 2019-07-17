pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''docker stop portal-empleado && docker rm portal-empleado
docker build -t portal-empleado --build-arg PUERTO=5555 -f Dockerfile .
docker run --net mynet --name portal-empleado -p 5555:5555 portal-empleado node /var/www/index.js 5555 &'''
      }
    }
    stage('Test') {
      steps {
        sh '''docker build -t portal-empleado-test -f Dockerfile.test .
docker run  --rm portal-empleado-test'''
      }
    }
    stage('Test E2E') {
      steps {
        sh '''docker stop firefox-container && docker rm firefox-container
docker run -d -p 4444:4444 --net mynet -v /dev/shm:/dev/shm --name firefox-container selenium/standalone-firefox:3.12.0-americium

'''
        echo 'Navegador Webdriver iniciado'
        sh '''docker build -t portal-empleado-e2e-test -f Dockerfile.e2e .
docker run --net mynet -p 6666:6666 -v /$(pwd)/e2eTests:/e2eTests -v /$(pwd)/package.json:/package.json -v /$(pwd)/src:/src --rm portal-empleado-e2e-test'''
      }
    }
    stage('Clean') {
      steps {
        sh '''docker stop firefox-container && docker rm firefox-container
docker stop portal-empleado && docker rm portal-empleado
'''
      }
    }
    stage('Deploy') {
      steps {
        sh '''docker build --tag portal-empleado-blue:$BUILD_NUMBER .
docker stop portal-empleado-blue && docker rm portal-empleado-blue
docker run --name portal-empleado-blue -p 3000:3000 portal-empleado-blue:$BUILD_NUMBER node /var/www/index.js 3000 &
'''
      }
    }
    stage('Finish') {
      steps {
        echo 'Cambio publicado correctamente'
      }
    }
  }
}