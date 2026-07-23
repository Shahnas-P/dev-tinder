# DevTinder API's

## AuthRouter
  - POST /login
  - POST /signUp
  - POST /logout

## ProfileRouter
  - GET /profile/view
  - PATCH /profile/edit
  - PATCH /profile/password

## ConnectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## UserRouter
- GET /user/feeds
- GET /user/connections
- GET /user/requests