# Zertifikate für lokale Entwicklungszwecke erstellen:


 1.choco install mkcert
 
 2. mkcert --install 

# den wir für die lokale Entwicklung nutzen können `todoapp.internal` erstellen für diesen Namen ein SSL Zertifikat. Key generieren: Z.b: "todoapp.internal.key" Zertifikate installieren: "todoapp.internal.key"
mkcert todoapp.internal localhost 127.0.0.1 ::1


# Dafür öffnen wir mit dem Editor als Administrator die Datei unter C:\Windows\System32\drivers\etc\hosts und fügen einen neuen Eintrag mit dem Wert

127.0.0.1 todoapp.internal

# Konfiguration des Nginx Reverse Proxy: erstellen nginx.conf file und fügen die Befehle
touch nginx.conf


# Docker Compose Konfiguration:

volumes:
      - ./nginx/conf/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/certs:/etc/nginx/certs


   und 
          environment:
      - REACT_APP_BACKEND_URL=https://docker.compose.local/




https://medium.com/@marco.lindner/einrichtung-von-docker-compose-mit-https-unter-verwendung-von-nginx-als-reverse-proxy-2c1173df0de9


