# DEVELOPMENT

FROM node:latest

WORKDIR /space-odyssey

EXPOSE 4200

COPY package.json .

RUN npm install

# COPY ../.. .

COPY nx.json .eslintrc.json jest.config.ts tsconfig.base.json ./

COPY libs libs

COPY apps/hal apps/hal
# COPY ../../apps/hal-e2e apps/hal-e2e

RUN npm install -g nx@15.8.6

CMD nx serve hal --host 0.0.0.0 --disable-host-check --poll 2000

# DEPLOYMENT
## copies pre-built projects to docker containers (via cmd: "nx docker-build ${app_name}" -> project.json)

#FROM nginx:1.18-alpine AS base
#
#COPY ./nginx.conf /etc/nginx/nginx.conf
#
#FROM base AS hal
#
#COPY ./dist/apps/hal /usr/share/nginx/html
