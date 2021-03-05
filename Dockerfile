FROM nginx:stable-alpine

COPY ./graphqlexample /var/www/project

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
RUN chown -R nobody:nobody /var/www/project
