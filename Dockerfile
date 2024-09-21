FROM node:slim AS app

WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY ./ /usr/src/app
RUN npm run build
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD [ "npm", "start" ]
