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
https://github.com/AlimovaKatrin/fena-mail-sender/blob/main/api/src/email/email.controller.ts
6 строка  нужно инжекнуть constructor через @Inject

8   @Post('/') -> строка @Post()

async зачем если sendEmail не возвращает Promise?


appPost -> createEmail

@Body() { amount } нет валидации, нужно добавить валидацию
https://docs.nestjs.com/techniques/validation


const id = Math.floor(Math.random() * (1 - 10000) + 10000);
заменить
import { randomUUID }  from ‘crypto’
const id = randomUUID();


‘send.new.email’ собрать в ENUM чтобы избегать magic string
‘email’ и 'kafka:9092' вынести в константу избегать magic string

будет супер если вынесишь подключение к кафке на controller или adapter




https://github.com/AlimovaKatrin/fena-mail-sender/blob/main/api/src/stats/stats.controller.ts
8 строка  нужно инжекнуть constructor через @Inject

'get.stats' собрать в enum все топики

https://github.com/AlimovaKatrin/fena-mail-sender/blob/main/api/src/stats/stats.service.ts
8 строка  нужно инжекнуть constructor через @Inject


https://github.com/AlimovaKatrin/fena-mail-sender/blob/main/api/src/const.ts
const.ts лучше перемименовать в email-stats.interface.ts
IEmailStats -> перемименовать EmailStats
вот ссылка на вонвенцию
https://stackoverflow.com/questions/2814805/java-interfaces-implementation-naming-convention

https://github.com/AlimovaKatrin/fena-mail-sender/blob/main/email-service/src/sender/sender.service.ts
for (let counter = 1; counter <=  +amount; counter++)
emailIndex -> emailCountOrder

Подключение к кафке вынести на уровень контролера)

В некоторых местах ты указываешь типы, в некоторых их нет)

https://github.com/AlimovaKatrin/fena-mail-sender в readme nextjs -> nestjs

https://blog.devgenius.io/using-apache-kafka-with-nestjs-upstash-serverless-kafka-a6ce517c0a1a

збс пример
https://github.com/israelio/nestjs-kafka-example