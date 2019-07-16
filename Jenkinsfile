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
            sh '''docker-compose up -d --build &
docker exec app npm run test:e2e'''
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