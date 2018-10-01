# Game

- [List](#list)

## List

#### Description

Retrieves all rooms information

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
