FROM node:21-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]