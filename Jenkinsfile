pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''docker stop portal-empleado && docker rm portal-empleado
docker build -t portal-empleado -f Dockerfile .
docker run --net mynet --name portal-empleado -p 4000:5555 portal-empleado node /var/www/index.js &'''
      }
    }
    stage('Test') {
      steps {
        sh '''docker build -t portal-empleado-test -f Dockerfile.test .
docker run --rm portal-empleado-test'''
      }
    }
    stage('Test E2E') {
      steps {
        sh '''docker stop firefox-container && docker rm firefox-container
docker run -d -p 4444:4444 --net mynet -v /dev/shm:/dev/shm --name firefox-container selenium/standalone-firefox:3.12.0-americium

docker build -t portal-empleado-e2e-test -f Dockerfile.e2e .
docker run --net mynet -p 6666:6666 -v /$(pwd)/e2eTests:/e2eTests -v /$(pwd)/package.json:/package.json -v /$(pwd)/src:/src --rm portal-empleado-e2e-test'''
      }
    }
    stage('Deploy') {
      steps {
        sh 'echo "hola"'
      }
    }
  }
}