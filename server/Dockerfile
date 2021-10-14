FROM node:latest

WORKDIR /server

COPY ./dist ./
COPY ./node_modules ./
COPY ./package.json ./

RUN npm install

EXPOSE 8000
CMD ["npm", "start"]