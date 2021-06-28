FROM nginx

RUN rm /etc/nginx/conf.d/*.conf

COPY ./public /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d

EXPOSE 1338
