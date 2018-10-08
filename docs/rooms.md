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

## Show

## Update

## Delete

## Join

## Leave
