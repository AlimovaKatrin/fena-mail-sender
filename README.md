# fena-mail-sender 📬
![app demo](./readme-assets/fena-demo.gif)
## Description
### Frontend
    - react
    - material ui
    - socket.io
### Backend
    - nestjs
    - socket.io
    - kafka

This app uses http to trigger the process on `api service` and websocket to receive messages about emails statuses. 

There are two basic microservices wich handle the functionality: 
- `email-service` to send mocked emails
- `stats-service` to "collect" and transfer statistics

And one service who handle data from/to frontend: 
- `api service` 
## Launch
```
git clone git@github.com:AlimovaKatrin/fena-mail-sender.git
cd fena-mail-sender
docker-compose up -d --build 
```