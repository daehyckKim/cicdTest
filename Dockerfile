FROM node:18-alpine

RUN mkdir -p /var/app

WORKDIR /var/app

COPY . ./

RUN yarn install --frozen-lockfile

COPY src ./

RUN yarn build

ENTRYPOINT [ "node", "dist/main.js" ]

