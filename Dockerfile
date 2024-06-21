FROM --platform=linux/amd64 node:20-alpine AS builder
ARG ENV_FILE
RUN if [[ -z "$ENV_FILE" ]] ; then echo "ERROR: ENV_FILE argument is not provided" && exit 1 ; else echo "ENV_FILE argument is $ENV_FILE" ; fi 
WORKDIR /app/builder
COPY . .
RUN apk add git
RUN yarn install --network-timeout 100000
RUN ./node_modules/.bin/env-cmd -f ${ENV_FILE} yarn build

FROM --platform=linux/amd64 nginx:alpine
RUN ls /usr/share/nginx
RUN sed -i 's/index  index.html index.htm;/try_files $uri \/index.html;/g' /etc/nginx/conf.d/default.conf
COPY --from=builder /app/builder/build /usr/share/nginx/html