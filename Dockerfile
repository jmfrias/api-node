FROM node:lts-alpine3.14

RUN mkdir /apinode

WORKDIR /apinode

COPY package.json .
COPY package-lock.json .
ADD src src

RUN npm install
CMD ["npm", "start"]