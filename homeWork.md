### Studies Topics 
 - Indpendent routes 
 - Middleware chain => route Handler  (other router hanlder without response we can call it as middleware , means function before reaching to the res of route hanlder  is middlware funciton)
 - What is Middelware ?
 - How express Js basically  handles requests behind the scens 
 - app.use() and app.all() methods
    - app.use() → Runs middleware for all HTTP methods and all routes starting with a path; usually used to preprocess requests.
    - app.all() → Handles all HTTP methods for an exact route; usually used as a route handler.