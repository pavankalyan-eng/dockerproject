FROM nginx:mainline-alpine3.20-slim
COPY code /usr/share/nginx/html
RUN rm -rf /etc/nginx/nginx.conf 
RUN rm -rf /etc/nginx/conf.d/default.conf  
COPY nginx.conf /etc/nginx/nginx.conf
