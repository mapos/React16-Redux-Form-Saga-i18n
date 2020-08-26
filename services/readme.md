# API

All doc for now is in the in global file readme.md

## Install & run

npm install && npm start

## Setup your SSH Keys

$ mkdir -p var/jwt
$ openssl genrsa -out var/jwt/private.pem -aes256 4096
\$ openssl rsa -pubout -in var/jwt/private.pem -out var/jwt/public.pem

## Express && nginx && pm2

http://blog.danyll.com/setting-up-express-with-nginx-and-pm2/
https://expressjs.com/en/advanced/best-practice-security.html
https://www.npmjs.com/package/express-limiter

## Nginx TLS Configuration

https://mozilla.github.io/server-side-tls/ssl-config-generator/

## Brute Force Attacks

Nginx handle this. Configuration allow for it
https://easyengine.io/tutorials/nginx/block-wp-login-php-bruteforce-attack/

https://github.com/AdamPflug/express-brute

Also good to look: fail2ban
example: https://easyengine.io/tutorials/nginx/fail2ban/
