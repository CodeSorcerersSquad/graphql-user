# GraphQL Users API

## Configuration

### Node
Node version: 9.2.0

```bash
npm install
```

### MongoDB
* Refer [Installation](https://docs.mongodb.com/manual/administration/install-community/) for instructions to install mongodb locally on your machine. 
* After MongoDB installed, please import users to the collection using the comand bellow:
```bash
mongoimport --db graph-user-db --collection users --file ./data/users.json --jsonArray
```

## 