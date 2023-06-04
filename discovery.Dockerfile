# DEVELOPMENT

FROM node:latest

WORKDIR /space-odyssey

COPY package.json .

RUN npm install

# COPY ../.. .

COPY nx.json .eslintrc.json jest.config.ts tsconfig.base.json ./

COPY libs libs

COPY apps/discovery apps/discovery
# COPY ../../apps/discovery-e2e apps/discovery-e2e

CMD node node_modules/.bin/nx serve discovery --verbose

# DEPLOYMENT

#FROM docker.io/node:lts-alpine
#
#ENV HOST=0.0.0.0
#ENV PORT=3333
#
#WORKDIR /app
#
#RUN addgroup --system discovery && \
#          adduser --system -G discovery discovery
#
#COPY dist/apps/discovery discovery
#COPY package*.json discovery
#
#RUN chown -R discovery:discovery .
#
## You can remove this install step if you build with `--bundle` option.
## The bundled output will include external dependencies.
#RUN npm --prefix discovery --omit=dev -f install
#
#ENTRYPOINT [ "node", "discovery/main" ]
