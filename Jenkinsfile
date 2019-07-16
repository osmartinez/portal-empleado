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
    stage('Unit test') {
      parallel {
        stage('Unit test') {
          steps {
            sh '''docker build -t portal-empleado-test -f Dockerfile.test .
docker run --rm portal-empleado-test'''
          }
        }
        stage('Automation test') {
          steps {
            sh '''docker stop firefox-container && docker rm firefox-container
docker run -d -p 4444:4444 --net mynet -v /dev/shm:/dev/shm --name firefox-container selenium/standalone-firefox:3.12.0-americium

docker build -t portal-empleado-e2e-test -f Dockerfile.e2e .
docker run --net mynet -p 4000:4000 -v e2eTests:/e2eTests -v package.json:/package.json -v package-lock.json:/package-lock.json -v .gitignore:/.gitignore -v src/index.js:/src/index.js --rm portal-empleado-e2e-test
docker exec portal-empleado-e2e-test npm run test:e2e
'''
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