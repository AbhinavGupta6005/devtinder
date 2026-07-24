# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logOut

## profileRouter
- GET /profile/view (viewing the profile)
- PATCH /profile/edit
- PATCH /profile/password  -> Forget password API

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignore/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /request/recived
- GET /feed -Get you the profile of other users on platform



Status: ignore, intrested, accepted, rejected