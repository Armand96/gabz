FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install

COPY apps/api-gateway apps/api-gateway
COPY libs libs

RUN npm run build api-gateway

CMD ["node", "dist/apps/api-gateway/main"]
