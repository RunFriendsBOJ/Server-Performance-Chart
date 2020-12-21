# Server

GQL: `http://localhost:3000/graphql`

ProtoBuf: `https://localhost:4000`

REST: `http://localhost:5000`

> /server/.env 파일을 만든뒤 HOST_DB에 MongoDB 주소를 적어야합니다.

> /server/.env 파일에 SSL_PW 을 등록해야합니다.

> /server/ProtoBuf/config/ 에 server.crt, server.csr, server.key를 작성해야합니다.


```
npm run set
npm start
```

API

## ProtoBuf

`Get https://localhost:4000/post/:id`

`Get https://localhost:4000/post/all`

## GraphqQL

`Post https://localhost:4000/graphql`

`Query : getIdByPost(id:Int)`

`Query : getAllPosts`
