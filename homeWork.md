### Studies Topics 
 - Indpendent routes 
 - Middleware chain => route Handler  (other router hanlder without response we can call it as middleware , means function before reaching to the res of route hanlder  is middlware funciton)
 - What is Middelware ?
 - How express Js basically  handles requests behind the scens 
 - app.use() and app.all() methods
    - app.use() → Runs middleware for all HTTP methods and all routes starting with a path; usually used to preprocess requests.
    - app.all() → Handles all HTTP methods for an exact route; usually used as a route handler.
 - But Express expects route handlers to have three parameters:
     (req, res, next) — not (err, req, res, next).

      When you use (err, req, res, next) in a route definition, Express thinks this is an error-handling middleware, not a normal route.

 - Create a free cluster on mongodb official website and that is know as mongodb atlas.
 - Install mongosse library
 - Connect you application to the database (not the cluster) 
 - Call the  connectDb function and connect to database before starting application  
 - Create a User Schema  & user Model

 ### 25-10-25
 - Create /signup api to add data to database
 - push some documents using api calls 
 - Erron handing using try catch 
 