FROM node:latest

RUN mkdir /apinode

WORKDIR /apinode

COPY package.json .
COPY package-lock.json .
ADD src src

RUN npm install
CMD ["npm", "start"]