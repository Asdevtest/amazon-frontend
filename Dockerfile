FROM --platform=linux/amd64 node:14-alpine AS builder
ARG ENV_FILE
RUN if [[ -z "$ENV_FILE" ]] ; then echo "ERROR: ENV_FILE argument is not provided" && exit 1 ; else echo "ENV_FILE argument is $ENV_FILE" ; fi 
WORKDIR /app/builder
COPY . .
RUN yarn install
RUN ./node_modules/.bin/env-cmd -f ${ENV_FILE} yarn build

FROM nginx:alpine
COPY --from=builder /app/builder/build /usr/share/nginx/html