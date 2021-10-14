FROM node:latest

WORKDIR /server

COPY dist /server/dist
COPY node_modules /server/node_modules
COPY package.json /server/package.json

EXPOSE 8000
CMD ["node", "./dist/app.js"]