# Use official lightweight Nginx image
FROM nginx

# Remove default Nginx website config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy frontend build files
# "code" should contain index.html, assets, etc.
COPY code/ /usr/share/nginx/html/

# Copy custom Nginx server configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
