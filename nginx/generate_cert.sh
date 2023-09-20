# Command to generate self signed certificate
# sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout example.key -out example.crt

# Docker command to start the nginx
# docker run --name mynginx -p 443:443 -v /home/sabuj/plant-care/nginx:/etc/nginx/ssl/certs:ro -v /home/sabuj/plant-care/nginx/default.conf:/etc/nginx/conf.d/default.conf -d nginx
