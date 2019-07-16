pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''docker build --tag portal-empleado-green:$BUILD_NUMBER .
docker stop portal-empleado-green && docker rm portal-empleado-green
echo "Build step finished"'''
      }
    }
    stage('Unitary test') {
      parallel {
        stage('Unit test') {
          steps {
            sh '''docker build -t portal-empleado-test -f Dockerfile.test .
docker run --rm portal-empleado-test'''
          }
        }
        stage('e2e test') {
          steps {
            sh '''docker stop firefox-container && docker rm firefox-container
docker run -d -p 4444:4444 --net mynet -v /dev/shm:/dev/shm --name firefox-container selenium/standalone-firefox:3.12.0-americium

docker build -t portal-empleado-test -f .
docker stop portal-empleado-test && docker rm portal-empleado-test
docker run --net mynet --name portal-empleado-test -p 5555:5555portal-empleado-test node /var/www/index.js &

docker build -t portal-empleado-e2e-test -f Dockerfile.e2e .
docker run --net mynet -p 6666:6666 -v /$(pwd)/e2eTests:/e2eTests -v /$(pwd)/package.json:/package.json -v /$(pwd)/src:/src --rm portal-empleado-e2e-test'''
          }
        }
      }
    }
    stage('Run') {
      steps {
        sh '''docker run --name portal-empleado-green -p 4000:4000 portal-empleado-green:$BUILD_NUMBER node /var/www/index.js &
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