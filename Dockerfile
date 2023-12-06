FROM node:alpine

WORKDIR /api

# RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env
COPY --chown=node:node .env .


COPY  package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]