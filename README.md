# microservice-auth

## auth

| Route                  | Method | Body                              | Purpose                        |
| ---------------------- | ------ | --------------------------------- | ------------------------------ |
| /api/users/signup      | POST   | {email: string, password: string} | sign up for an account         |
| /api/users/signin      | POST   | {email: string, password: string} | sign in to an existing account |
| /api/users/signout     | POST   | {}                                | sign out                       |
| /api/users/currentuser | GET    | -                                 | Return info about the user     |

### To create a docker build use

docker build -t username/auth .
