FROM node:18-alpine As init

RUN mkdir -p /var/app/front

WORKDIR /var/app/front

COPY --chown=node:node package*.json .

RUN npm ci

USER node


FROM node:latest As build

WORKDIR /var/app/front

COPY --chown=node:node --from=init /var/app/front/node_modules ./node_modules

COPY --chown=node:node package*.json .
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./public ./public

RUN npm run build

USER node

FROM nginx:latest As start

#get step 1
# COPY --chown=node:node --from=init /var/app/front/node_modules ./node_modules

#get step 2
COPY --chown=node:node --from=build /var/app/front/build /usr/share/nginx/html

#get step 3
# COPY --chown=node:node package*.json .

RUN rm -rf /etc/nginx/conf.d

COPY --chown=node:node ./conf.d /etc/nginx/conf.d

# container가 종료될 때 정상종료를 유도한다.
STOPSIGNAL SIGTERM

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



