# Room

- [Create](#create)
- [List](#list)
- [Show](#show)
- [Update](#update)
- [Delete](#delete)
- [Join](#join)
- [Leave](#leave)

## Create

#### Description

Creates a new room

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| POST | /api/rooms | user |

#### Example

    curl -X POST http://localhost:3000/api/rooms -H "Content-type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE" -d '{"name":"room1","ownerId":"5bb6cd794d45022524402956","gameId": "5bb196cad290f537358bd74f"}'


#### Request
*Headers*

    Content-Type: application/json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE

*Body*

    {
        "name" : "room1",
        "ownerId" : "5bb6cd794d45022524402956",
        "gameId": "5bb196cad290f537358bd74f"
    }

#### Response

    {
        "players" : [],
        "_id" : "5bbabed9aa52c576e3f0fbc6",
        "name" : "room1",
        "owner" : "5bb6cd794d45022524402956",
        "game" : "5bb196cad290f537358bd74f",
        "dateCreated" : "2018-10-08T02:20:09.289Z",
        "__v" : 0
    }

## List

#### Description

Retrieves all rooms information

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| GET | /api/rooms | user |

#### Example

    curl http://localhost:3000/api/rooms -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE"

#### Request

*Header*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE


#### Response

*Body*

    [
        {
            "players": [],
            "_id": "5bbac0c5e5407b063d62f520",
            "name": "room1",
            "owner": {
                "_id": "5bb6cd794d45022524402956",
                "name": "zzz"
            },
            "game": {
                "_id": "5bb196cad290f537358bd74f",
                "name": "Texas hold 'em",
                "minPlayers": 2,
                "maxPlayers": 10
            },
            "dateCreated": "2018-10-08T02:28:21.258Z",
            "__v": 0
        },
        {
            "players": [],
            "_id": "5bbac33075613f081c06de74",
            "name": "room 112",
            "owner": {
                "_id": "5bb6cd794d45022524402956",
                "name": "zzz"
            },
            "game": {
                "_id": "5bb19836d290f537358bd750",
                "name": "Eight-ball",
                "minPlayers": 2,
                "maxPlayers": 2
            },
            "dateCreated": "2018-10-08T02:38:40.761Z",
            "__v": 0
        }
    ]

## Show

#### Description

Retrieves room information

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| GET | /api/rooms/:id | user |


#### Example
    curl http://localhost:3000/api/rooms/5bbac33075613f081c06de74 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE"

#### Request

*Header*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFjMjM4ZTE1YjExZTRkZWJjOGIxMTgiLCJuYW1lIjoidXNlcl9uYW1lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODAwNzk1MH0.a1b5cVZX0K5fTm7fcFXjmiWD7LI1-NKliaSNHMZlJUE


#### Response

*Body*

    {
        "players" : [],
        "_id" : "5bbac33075613f081c06de74",
        "name" : "room 112",
        "owner" : {
            "_id" : "5bb6cd794d45022524402956",
            "name" : "zzz"
        },
        "game" : {
            "_id" : "5bb19836d290f537358bd750",
            "name" : "Eight-ball",
            "minPlayers" : 2,
            "maxPlayers" : 2
        },
        "dateCreated":"2018-10-08T02:38:40.761Z",
        "__v":0
    }

## Delete

#### Description

Delete a room

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| DELETE | /api/rooms/:id | user |

#### Example
    curl -X DELETE http://localhost:3000/api/rooms/5bbad101f3cd772c68c5a477 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmI2Y2Q3OTRkNDUwMjI1MjQ0MDI5NTYiLCJuYW1lIjoienp6IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODk2OTI0Mn0.rk6trppKo6UIkQk6fSjJNLYRlCnHEYzou154OJsgm6M"


#### Request
*Header*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmI2Y2Q3OTRkNDUwMjI1MjQ0MDI5NTYiLCJuYW1lIjoienp6IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODk2OTI0Mn0.rk6trppKo6UIkQk6fSjJNLYRlCnHEYzou154OJsgm6M


#### Response
*Body*

    {
        "players":[],
        "_id" : "5bbad101f3cd772c68c5a477",
        "name" : "deleted room",
        "owner" : "5bb6cd794d45022524402956",
        "game" : "5bb196cad290f537358bd74f",
        "dateCreated" : "2018-10-08T03:37:37.413Z",
        "__v":0
    }

## Join

#### Description

Join a room

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| PATCH | /api/rooms/:id/players | user |

#### Example

    curl -X PATCH http://localhost:3000/api/rooms/5bbac0c5e5407b063d62f520/players -H "Content-type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmI2Y2Q3OTRkNDUwMjI1MjQ0MDI5NTYiLCJuYW1lIjoienp6IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODk2OTI0Mn0.rk6trppKo6UIkQk6fSjJNLYRlCnHEYzou154OJsgm6M" -d '{"userId":"5bb6cd794d45022524402956"}'

#### Request

*Header*

    Content-type: application/json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmI2Y2Q3OTRkNDUwMjI1MjQ0MDI5NTYiLCJuYW1lIjoienp6IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODk2OTI0Mn0.rk6trppKo6UIkQk6fSjJNLYRlCnHEYzou154OJsgm6M


#### Response

*Body*

    {
        "players" :[
            "5bb6cd794d45022524402956"
        ],
        "_id" : "5bbac0c5e5407b063d62f520",
        "name" : "room1",
        "owner" : "5bb6cd794d45022524402956",
        "game" : "5bb196cad290f537358bd74f",
        "dateCreated" : "2018-10-08T02:28:21.258Z",
        "__v":1
    }

## Leave

#### Description

Leave a room

#### Endpoint

| method | path | authentication |
| :-: | :-: | :-: |
| DELETE | /api/rooms/:roomId/players/:playerId | user |

#### Example

    curl -i -X DELETE http://localhost:3000/api/rooms/5bbac0c5e5407b063d62f520/players/5bb6cd794d45022524402956 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmI2Y2Q3OTRkNDUwMjI1MjQ0MDI5NTYiLCJuYW1lIjoienp6IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODk2OTI0Mn0.rk6trppKo6UIkQk6fSjJNLYRlCnHEYzou154OJsgm6M" 

#### Request

*Header*

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmI2Y2Q3OTRkNDUwMjI1MjQ0MDI5NTYiLCJuYW1lIjoienp6IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUzODk2OTI0Mn0.rk6trppKo6UIkQk6fSjJNLYRlCnHEYzou154OJsgm6M


#### Response

*Headers*

HTTP/1.1 204 No Content