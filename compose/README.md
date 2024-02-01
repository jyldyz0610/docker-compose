# Zertifikate für lokale Entwicklungszwecke erstellen:


 choco install mkcert

# den wir für die lokale Entwicklung nutzen können `docker.compose.local` erstellen für diesen Namen ein SSL Zertifikat.
mkcert docker.compose.local localhost 127.0.0.1 ::1


# Dafür öffnen wir mit dem Editor als Administrator die Datei unter C:\Windows\System32\drivers\etc\hosts und fügen einen neuen Eintrag mit dem Wert

127.0.0.1 docker.compose.local

# Konfiguration des Nginx Reverse Proxy: erstellen nginx.conf file und fügen die Befehle
touch nginx.conf


# Docker Compose Konfiguration:

volumes:
      - ./nginx/conf/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/certs:/etc/nginx/certs


   und 
          environment:
      - REACT_APP_BACKEND_URL=https://docker.compose.local/


