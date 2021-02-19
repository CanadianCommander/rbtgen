FROM httpd:2.4.46-alpine

# setup httpd files
COPY deploy/rbtgen_prod/prod-http-proxy.conf /usr/local/apache2/conf/httpd.conf

# start apache
CMD apachectl -D FOREGROUND