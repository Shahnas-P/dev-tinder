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
- POST /request/send/interested/:userId
- POST /request/send/ignore/:userId
- POST /request/review/accept/:requestId
- POST /request/review/reject/:requestId

## UserRouter
- GET /user/feeds
- GET /user/connections
- GET /user/requests