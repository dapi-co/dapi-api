FROM node:lts-alpine

# Download what is needed for native node packages
RUN apk update && apk --no-cache add python2 gcc g++ make

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

# Get certs
RUN mkdir -p /etc/letsencrypt/live/dapi.co/
COPY certs/* /etc/letsencrypt/live/dapi.co/

# Install app
COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

CMD ["npm", "run", "dev"]
