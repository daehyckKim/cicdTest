FROM node:18-alpine

RUN mkdir -p /var/app

WORKDIR /var/app

COPY . ./

RUN yarn install --frozen-lockfile

COPY src ./

RUN yarn build


# 해당 컨테이너 실행전 필요한 컨테이너 실행이 완료되었는지 체크하는 쉘파일 (파라이미터값은 테스트할 컨테이너명:포트번호 입니다.)
# 현재는 docker-compose에서 healthcheck와 depends_op 명령어로 제어 테스트 중입니다.
# COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
# RUN chmod +x /usr/src/app/wait-for-it.sh

ENTRYPOINT [ "node", "dist/main.js" ]