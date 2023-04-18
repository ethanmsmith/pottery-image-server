FROM node:alpine
WORKDIR /usr/api
COPY package.json .
COPY tsconfig.json .
RUN npm i && npm i typescript -g
COPY . .
RUN tsc
CMD ["node", "./dist/server.js"]
