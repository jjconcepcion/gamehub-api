# Gamehub API

A RESTful backend for a multipayer gaming platform using Node.js, Express.js,
Mongoose, and MongoDB.


## API  Usage
## Login

#### Description

Authenticates a user

#### Endpoint

| method | path | authentication |
| - | -| - |
| POST | /api/login | not required |

#### Example
    curl -i -X POST http://localhost:3000/api/login \
      -H "Content-Type: application/json" \
      -d '{"name": "user_name", "password": "password123"}'

#### Request
*Body*

    {
        "name": "user_name",
        "password": "password123"
    }

#### Response
*Header*

    HTTP/1.1 200 OK
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMTU0YTE1YjExZTRkZWJjOGIxMTciLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNDYwOH0.jtCnF7BZbS9NGj7sKE-32tjJmROrzCAg4acYORSsQCs

*Body*

    {
        "_id": "5bac154a15b11e4debc8b117",
        "name": "user_name"
    }