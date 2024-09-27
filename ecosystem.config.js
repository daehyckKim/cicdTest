module.exports = {
  apps: [
    {
      name: 'test-ci-cd', // 애플리케이션 이름
      script: './dist/main.js', // 실행할 엔트리 파일 경로
      instances: 'max', // CPU 코어 수만큼 인스턴스 생성
      exec_mode: 'cluster', // 클러스터 모드로 실행
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
