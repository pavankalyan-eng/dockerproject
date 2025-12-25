# Use official lightweight Nginx image
FROM nginx

# Remove default nginx config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy React build files
COPY code/ /usr/share/nginx/html/

# Copy custom nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
