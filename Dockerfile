FROM node:16-alpine

RUN apk add --no-cache bash

RUN mkdir /app

WORKDIR /app

COPY --chown=root package.json .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

RUN chmod +x ./scripts/entrypoint.sh

ENTRYPOINT ["./scripts/entrypoint.sh"]