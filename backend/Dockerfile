FROM node:18-alpine As test

RUN mkdir -p /var/app/ems

WORKDIR /var/app/ems

COPY --chown=node:node package*.json .

RUN yarn install --frozen-lockfile/


USER node


FROM node:18-alpine As build

WORKDIR /var/app/ems

#get step 1
COPY --chown=node:node --from=test /var/app/ems/node_modules ./node_modules
COPY --chown=node:node --from=test /var/app/ems/yarn.lock .

#get host
COPY --chown=node:node package*.json .
COPY --chown=node:node ./src ./src
COPY --chown=node:node tsconfig* .
COPY --chown=node:node ./dataSource.ts .

#run
RUN yarn build

USER node


FROM node:18-alpine As start

WORKDIR /var/app/ems

#get step 1
COPY --chown=node:node --from=test /var/app/ems/node_modules ./node_modules
COPY --chown=node:node --from=test /var/app/ems/yarn.lock .

#get step 2
COPY --chown=node:node --from=build /var/app/ems/dist ./dist

#get host
COPY --chown=node:node package*.json .
COPY ./dataSource.ts .
COPY --chown=node:node tsconfig* .

ENTRYPOINT [ "node","dist/src/main.js"]





# FROM node:18-alpine

# RUN mkdir -p /var/app

# WORKDIR /var/app

# COPY . .

# RUN yarn install --frozen-lockfile/


# RUN yarn build


# # # 해당 컨테이너 실행전 필요한 컨테이너 실행이 완료되었는지 체크하는 쉘파일 (파라이미터값은 테스트할 컨테이너명:포트번호 입니다.)
# # # 현재는 docker-compose에서 healthcheck와 depends_op 명령어로 제어 테스트 중입니다.
# # # COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
# # # RUN chmod +x /usr/src/app/wait-for-it.sh

# ENTRYPOINT [ "node", "dist/src/main.js" ]
# # ENTRYPOINT [ "npm","run","start:dev"  ]