# GraphQL Users API

This component implements a User API using the GraphQL to provide this information.

The User Schema is defined as:
```gql
type Query {
    users(_id: ID, name: String): [User]
}

type Mutation {
    createUser(user: UserInput!): User
    updateUser(_id: ID!, user: UserInput!): User
}

type User {
    _id: ID!
    name: String!
    full_name: String
    age: Int
    city: String
    tag: String
    url: String
    knowledge: [Knowledge]
}

type Knowledge {
    language: String
    frameworks: [String]
}

input UserInput {
    name: String!
    full_name: String
    age: Int
    city: String
    tag: String
    url: String
    knowledge: [KnowledgeInput]
}

input KnowledgeInput {
    language: String
    frameworks: [String]
}
```

For more information about GraphQL see the [oficial site](http://graphql.org/learn/).

## Technologies
The technologies used is this project are:
* [Nodejs 9.2.0](https://chocolatey.org/packages/nodejs.install/9.2.0)
* [GraphQL](http://graphql.org/learn/)
* [express-graphql](https://github.com/graphql/express-graphql)

## Configuration

### MongoDB
* Refer [Installation](https://docs.mongodb.com/manual/administration/install-community/) for instructions to install mongodb locally on your machine. 
* After MongoDB installed, please import users to the collection using the comand bellow:
```bash
mongoimport --db graph-user-db --collection users --file ./data/users.json --jsonArray
```

### Node Project
The component is developed as a Node.JS project. To build the project execute the command bellow:
```bash
npm install
```
To run the project execute the command bellow:
```bash
npm start
```

#### Build With Docker
To build this project as docker image:
```bash
docker build -t <your username>/node-graphql-users
```

To run this docker image:
```bash
docker run -p 49160:4000 -d <your username>/node-graphql-users
```


## GraphiQL
A graphical interactive in-browser GraphQL IDE.
When the application is running you can access this IDE from the browser in the following the bellow address:
```
http://localhost:4000/users
```

## Testing
In this section it´s going to be described some user cases from testing the User GraphQL API.

### Listing all users
Request:
```
{
  users {
    _id
    name
    full_name
    age
    city
    tag
    url
    knowledge {
      language
      frameworks
    }
  }
}
```

cURL Request:
```bash
curl -X POST \
  http://localhost:4000/users \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 6e7020b6-0385-972d-fdd2-38b3f53bfc8f' \
  -d '{
	"query": "{users {_id name full_name age city tag url knowledge {language frameworks}}}"
}
'
```

Response:
```json
{
  "data": {
    "users": [
      {
        "_id": "5a147016aadc0bed1789907e",
        "name": "Joao",
        "full_name": null,
        "age": 22,
        "city": null,
        "tag": null,
        "url": null,
        "knowledge": [
          {
            "language": "Javascript",
            "frameworks": [
              "express.js",
              "hapi.js",
              "AngularJS"
            ]
          },
          {
            "language": "Java",
            "frameworks": [
              "Play"
            ]
          },
          {
            "language": "Python",
            "frameworks": []
          }
        ]
      },
      {
        "_id": "5a147016aadc0bed1789907f",
        "name": "Ana",
        "full_name": null,
        "age": 20,
        "city": null,
        "tag": null,
        "url": null,
        "knowledge": [
          {
            "language": "Javascript",
            "frameworks": [
              "ReactJS",
              "express.js"
            ]
          },
          {
            "language": "Ruby",
            "frameworks": [
              "Ruby on Rails"
            ]
          },
          {
            "language": "Python",
            "frameworks": [
              "Django"
            ]
          }
        ]
      },
      {
        "_id": "5a147016aadc0bed17899080",
        "name": "Maria",
        "full_name": null,
        "age": 20,
        "city": null,
        "tag": null,
        "url": null,
        "knowledge": [
          {
            "language": "Javascript",
            "frameworks": [
              "ReactJS",
              "AngularJS"
            ]
          },
          {
            "language": "Java",
            "frameworks": [
              "Play",
              "Spring"
            ]
          },
          {
            "language": "Python",
            "frameworks": [
              "Django"
            ]
          }
        ]
      }
    ]
  }
}
```

### Listing an user by it´s identifier
Request:
```
{
  users(_id: "5a147016aadc0bed1789907e") {
    _id
    name
    full_name
    age
    city
    tag
    url
    knowledge {
      language
      frameworks
    }
  }
}
```
cURL Request:
```bash
curl -X POST \
  http://localhost:4000/users \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 99895cc1-c5f0-0d5f-4b3e-0f50a8e87c7f' \
  -d '{
	"query": "{users(_id: \"5a147016aadc0bed1789907e\") {_id name full_name age city tag url knowledge {language frameworks}}}"
}
'
```

Response:
```json
{
  "data": {
    "users": [
      {
        "_id": "5a147016aadc0bed1789907e",
        "name": "Joao",
        "full_name": null,
        "age": 22,
        "city": null,
        "tag": null,
        "url": null,
        "knowledge": [
          {
            "language": "Javascript",
            "frameworks": [
              "express.js",
              "hapi.js",
              "AngularJS"
            ]
          },
          {
            "language": "Java",
            "frameworks": [
              "Play"
            ]
          },
          {
            "language": "Python",
            "frameworks": []
          }
        ]
      }
    ]
  }
}
```

### Create User
Request:
```
mutation {
  createUser(user:{
    name: "Rafael",
    full_name: "Rafael Manzoni",
    age: 32,
    city: "São Paulo",
    knowledge: [
      {
        language: "Java"
        frameworks: ["Spring Boot", "Apache Camel"]
      }
    ]
  }) {
    _id
    name
    knowledge {
      language
      frameworks
    }
  }
}
```
cURL Request:
```bash
curl -X POST \
  http://localhost:4000/users \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 969eccd5-b248-0577-d458-09a0981db03a' \
  -d '{
	"query": "mutation {   createUser(user:{     name:  \"Rafael\",     full_name:  \"Rafael Manzoni\",     age: 32,     city:  \"São Paulo\",     knowledge: [       {         language:  \"Java\"         frameworks: [ \"Spring Boot\",  \"Apache Camel\"]       }     ]   }) {     _id     name     knowledge {       language       frameworks     }   } }"
}'
```

Response:
```json
{
    "data": {
        "createUser": {
            "_id": "5a55261562394db480d3f2ad",
            "name": "Rafael",
            "knowledge": [
                {
                    "language": "Java",
                    "frameworks": [
                        "Spring Boot",
                        "Apache Camel"
                    ]
                }
            ]
        }
    }
}
```

### Update User
Request:
```
mutation {
  updateUser(_id:"5a551daaa5fe63802c1fb55d", user:{
    name: "Rafael2"
  }) {
    _id
    name
    knowledge {
      language
      frameworks
    }
  }
  
}
```
cURL Request:
```bash
curl -X POST \
  http://localhost:4000/users \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: b4754b88-4e8f-e155-bf8a-dd48d72ee476' \
  -d '{
	"query": "mutation {   updateUser(_id:\"5a551daaa5fe63802c1fb55d\", user:{     name: \"Rafael2\"   }) {     _id     name     knowledge {       language       frameworks     }   }    }"
}'
```

Response:
```json
{
    "data": {
        "updateUser": {
            "_id": "5a551daaa5fe63802c1fb55d",
            "name": "Rafael2",
            "knowledge": [
                {
                    "language": "Java",
                    "frameworks": [
                        "Spring Boot",
                        "Apache Camel"
                    ]
                }
            ]
        }
    }
}
```

### Postman Collection
For testing see this [Postman Collection](https://www.getpostman.com/collections/b1d2834fe981335daf41)