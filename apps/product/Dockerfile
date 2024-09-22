FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install

COPY apps/product apps/product
COPY libs libs

RUN npm run build product

CMD ["node", "dist/apps/product/main"]