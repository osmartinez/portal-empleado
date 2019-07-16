pipeline {
  agent any
  stages {
    stage('Tests unitarios') {
      parallel {
        stage('Tests unitarios') {
          steps {
            sh '''docker build -t portal-empleado-test -f Dockerfile.test .
docker run --rm portal-empleado-test'''
          }
        }
        stage('Tests E2E') {
          steps {
            sh '''docker stop firefox-container && docker rm firefox-container
docker run -d -p 4444:4444 --net mynet -v /dev/shm:/dev/shm --name firefox-container selenium/standalone-firefox:3.12.0-americium

docker build -t portal-empleado-test -f Dockerfile .
docker stop portal-empleado-test && docker rm portal-empleado-test
docker run --net mynet --name portal-empleado-test -p 4000:4000 portal-empleado-test node /var/www/index.js &

docker build -t portal-empleado-e2e-test -f Dockerfile.e2e .
docker run --net mynet -p 6666:6666 -v /$(pwd)/e2eTests:/e2eTests -v /$(pwd)/package.json:/package.json -v /$(pwd)/src:/src --rm portal-empleado-e2e-test'''
          }
        }
      }
    }
    stage('Despliegue') {
      steps {
        sh '''docker build --tag portal-empleado-green:$BUILD_NUMBER .
docker stop portal-empleado-green && docker rm portal-empleado-green
docker stop portal-empleado-test && docker rm portal-empleado-test
docker run --name portal-empleado-green -p 4000:4000 portal-empleado-green:$BUILD_NUMBER node /var/www/index.js &'''
      }
    }
  }
}