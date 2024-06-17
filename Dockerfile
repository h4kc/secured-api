FROM node:current-alpine3.20
RUN apk update && apk add --no-cache dumb-init=1.2.5-r3
ENV NODE_ENV production
ENV PORT 3000
ENV SERVICE_NAME meetings_api
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only-production
RUN mkdir -p /usr/src/app/logs && chown node:node /usr/src/app/logs
USER node
COPY --chown=node:node ./src/ .
EXPOSE 3000
CMD ["dumb-init", "node", "app.js"]
