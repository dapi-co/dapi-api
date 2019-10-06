FROM node:lts-alpine

ARG ELK_URL
ENV ENV_ELK_URL ${ELK_URL}

# Download what is needed for native node packages
RUN apk update && apk --no-cache add python2 gcc g++ make

RUN mkdir /app
WORKDIR /app

# Install app
COPY package.json package-lock.json ./

RUN npm install --production

COPY . .
CMD exec npm start | pino-elasticsearch -i "api-service" --node "${ENV_ELK_URL}"
