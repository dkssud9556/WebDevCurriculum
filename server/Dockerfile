FROM node:latest

WORKDIR /server

COPY ./dist ./
COPY ./node_modules ./
COPY ./package.json ./

EXPOSE 8000
CMD ["node", "./dist/app.js"]