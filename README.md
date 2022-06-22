# Saagie NodeJs API

<p align="center">
  <img 
        alt="NODEJS" 
        width="200" 
        height="200"
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg"
        style="margin-left: auto; margin-right: auto"
    />
</p>

### Prerequisites:

-   Node
-   GitHub
-   Docker
-   Postman
-   .env file

### Installation:

To start the project (without use a make file) :

```bash
git clonne https://github.com/Dramane-dev/saagie-nodejs-api
cd saagie-nodejs-api
npm i
docker-compose up -d
npm run dev
```

To start the project (with a make file) :

```bash
git clonne https://github.com/Dramane-dev/saagie-nodejs-api
cd saagie-nodejs-api
npm i
make run
npm run dev
```

### Auth Endpoints

```ruby
POST    http://localhost:4000/api/signin
```

### Projects Endpoints

```ruby
GET     http://localhost:4000/api/projects
GET     http://localhost:4000/api/project/:projectId
GET     http://localhost:4000/api/project
DELETE  http://localhost:4000/api/project/:projectId
```
