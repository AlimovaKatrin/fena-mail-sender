# fena-mail-sender 📬
![app demo](./readme-assets/fena-demo.gif)
## Description
### Frontend
    - react
    - material ui
    - socket.io
### Backend
    - nextjs
    - socket.io
    - kafka

This app uses http to trigger the process on `api service` and websocket to receive messages about emails statuses. 
## Launch
```
git clone git@github.com:AlimovaKatrin/fena-mail-sender.git
cd fena-mail-sender
docker-compose up -d --build 
```
