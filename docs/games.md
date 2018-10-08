# Game
- [Create](#create)
- [List](#list)
- [Show](#show)
- [Update](#update)

## Create

#### Description
Creates a new game

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| POST | /api/games | admin |

#### Example

    curl -X POST http://localhost:3000/api/games -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc" -d '{"name":"game name","description":"game description","minPlayers":1,"maxPlayers":4}'

#### Request
*Headers*

    Content-Type: application/json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc

*Body*

    {
        "name": "game name",
        "description": "game description",
        "minPlayers": 1,
        "maxPlayers": 4
    }

#### Response

*Body*

    {
        "_id": "5bb2a456ded4230f9058e85d",
        "name": "game name",
        "description": "game descript ion",
        "minPlayers": 1,
        "maxPlayers": 4,
        "__v": 0
    }

## List

#### Description

Retrieves all games information

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| GET | /api/games | user |

#### Example

    curl http://localhost:3000/api/games -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE"

#### Request

*Header*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE


#### Response

*Body*

    [
        {
            "_id": "5bb19836d290f537358bd750",
            "name": "Eight-ball",
            "description": "Billiards game",
            "minPlayers": 2,
            "maxPlayers": 2
            "__v":0
        },
        {
            "_id": "5bb1957ad290f537358bd74e",
            "name": "Monopoly",
            "description": "The classic fast-dealing property trading board game.",
            "minPlayers": 2,
            "maxPlayers": 6,
            "__v": 0
        },
        {
            "_id": "5bb196cad290f537358bd74f",
            name": "Texas hold 'em",
            "description": "Poker variation card game",
            "minPlayers": 2
            "maxPlayers": 10,
            "__v": 0
        }
    ]

## Show

#### Description

Retrieves room information

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| GET | /api/games/:id | user |


#### Example
    curl http://localhost:3000/api/games/5bb1957ad290f537358bd74e -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE"

#### Request

*Header*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE


#### Response

*Body*

    {
        "_id": "5bb1957ad290f537358bd74e",
        "name": "Monopoly",
        "description": "The classic fast-dealing property trading board game.",
        "minPlayers": 2,
        "maxPlayers": 6,
        "__v": 0
    },

## Update

#### Description

Updates game's information

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| PUT | /api/games/:id | admin |

#### Example

    curl -X PUT http://localhost:3000/api/games/5bb19836d290f537358bd750 -H "Content-type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc" -d '{"name":"new name","description":"new description","minPlayers": 3,"maxPlayers": 8}'

#### Request

*Header*

    Content-Type: application/json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc"

*Body*

    {
        "name": "new name",
        "description": "new description",
        "minPlayers": 3,
        "maxPlayers": 8
    }

#### Response

*Body*

    {
        "_id": "5bb19836d290f537358bd750",
        "name": "new name",
        "description": "new description",
        "minPlayers": 3,
        "maxPlayers": 8,
        "__v": 0
    }

## Delete

#### Description

Removes a game type

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| DELETE | /api/game/:id | admin |

#### Example
    curl -X DELETE http://localhost:3000/api/games/5bb2a549ded4230f9058e85f -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc"



#### Request
*Header*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwMjY3OGU3NzAyYjdjYjM2MTNkODUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzcyMjM0MTV9.bT8ZqkyPJ3tdz8luz2TB5ba96WHq7hxUmGp0JVUv9qc


#### Response
*Body*

    {
        "_id": "5bb2a549ded4230f9058e85f",
        "name": "deleted game",
        "description": "lorem ipsum",
        "minPlayers": 1,
        "maxPlayers": 4,
        "__v": 0
    }
