# User

- [Create](#Create)
- [List](#List)
- [Show](#Show)
- [Update](#Update)
- [Delete](#Delete)

## Create

#### Description
Creates a new user account

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| POST | /api/users | not required |

#### Example
    curl -i -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"name":"user_name","email": "user@mail.com","password": "password123"}'



#### Request
*Header*

    Content-Type: application/json

*Body*

    {
        "name": "user_name",
        "email": "user@mail.com",
        "password": "password123"
    }

#### Response
*Header*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE

*Body*

    {
        "_id": "5bac238e15b11e4debc8b118",
        "name": "user_name",
        "email": "user@mail.com"
    }
##
## List

#### Description

Retrieves all users information

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| GET | /api/users | admin |

#### Example

    curl http://localhost:3000/api/users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc"

#### Request
*Header*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc


#### Response
*Body*

    [
        {
            "_id":"5ba02678e7702b7cb3613d85",
            "name":"admin",
            "email":"admin@mail.com"
        },
        {
            "_id":"5bac238e15b11e4debc8b118",
            "name":"user_name",
            "email":"user@mail.com"
        }
    ]

##
## Show

#### Description

Retrieves a user's information

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| GET | /api/users/:id | admin |

#### Example
    curl http://localhost:3000/api/users/5bac238e15b11e4debc8b118 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc"

#### Request
*Header*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc


#### Response
*Body*

    {
        "_id":"5bac238e15b11e4debc8b118","name":"user_name",
        "email":"user@mail.com"
    }



## Update

#### Description

Updates a user's information

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| PUT | /api/users/:id | user |

#### Example

    curl -X PUT http://localhost:3000/api/users/5bac238e15b11e4debc8b118 -H "Content-type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE" -d '{"email": "update@mail.com"}' 

#### Request
*Header*

    Content-Type: application/json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE


*Body*

    {
        "email": "update@mail.com",
    }

#### Response

*Body*

    {
        "_id":"5bac238e15b11e4debc8b118",
        "name":"user_name",
        "email":"update@mail.com"
    }

## Delete

#### Description

Removes a user's account

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| DELETE | /api/users/:id | admin |

#### Example
    curl -X DELETE http://localhost:3000/api/users/5bac317215b11e4debc8b11c -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc"


#### Request
*Header*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc


#### Response
*Body*

    {
        "_id":"5bac317215b11e4debc8b11c",
        "name":"deletedUser",
        "email":"deletedUser@mail.com"
    }
