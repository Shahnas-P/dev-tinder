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

 ### 26-10-25
  - Add the express.json() middleware to you application 
  - Make your sign up api dynamic to receive data from the end users.
  - try user.findOne on duplicated data and figure out which one is chosen 
  - API - Get user by email
  - API - Feed api , get all users 
  - Creat Delete user api
  - Difference between PUT and PATCH
  - API to update 
  - Explore the mongoose documentation specifically for model 
  - What are options in a Model.findOneAndUpdate method ,explore more about it.
  - API - Update user with email ID 
  - Explore Schematype option from documentation 
  - Add required ,unique ,lowerCase , minLenght , trim ,  create custom validator function ,default , improve the database       schema .
  - Put all appropriate validation on each fields
  - add timeStamps to the schema 

### 28-10-25
  - Add API Level Validation on PATCH Request and Signup post API 
  - Data Sanitization : Add API Validation for each fields 

### 31-10-2025
  - Install Validator
  - Explore Validator library function and use validator function for password ,email and photo url

### 2-11-2025
  - Validate Data in Sign Up function 
  - Install bcrypty package
  - Create a password hash using bcrypt.hash and save the user with the encrypted password
  - Create Login API 
  - Compare passwords and throw error if email  or password invalid
  - Install cookie-parser
  - Just send a dummy cookie to user
  - Create GET /profile API and check if you got the cookie back
  - Install jsonwebtoken 
  - In Login API , after email and password validation , create a JWT token   and send  it to user in cookies 
  - Read the cookies inside your profile API and find the logged in user .

### 4-11-2025 
  - userAuth Middleware
  - Add userAuth Middleware in profile API and a new sendConnectionRequest API
  - Set the expiry of JWT token and cookies  to 7 days.

### 6-11-2025
  - Create userSchema method to getJWT()
  - Create userSchema method to comparePassword(passwordInputByUser)
  
### 9-11-2025
  - Go and explore tinder api's.
  - Create a list of all API 's.
  - Group multiple routes unders reacpective routers 

### 11-11-2025
  - Read Documentation of express.Router
  - Create routes folder for managing auth , profile , request routers.
  - Create authRouter , profileRouter , requestRouter
  - Import these routers in app.js

### 26-03-2026
   - Create POST/Logout API 
   - Create PATCH/porfile/edit  API 
   - Creat PATCH/profile/password API  - Forget Password aPI 
   - Make sure validate all the data of POST , PATCH APIs
   - then push the code  // don't forget to change office git user name to personal

### 18-07-2026
   - Create connectionRequest schema 
   - Send connection requestion API 
   - Proper validation of data 
   - Think about all the corner cases 
   - Refer $or and $and  query in mongoose
   - schema.pre("save") function
   - Read about $or and $and query in mongoose 
   - Read more about indexes  
   - why do we need index in DB
   - what is the advantage and disadvantage of creating index
   - ALWAYS THINK ABOUT CORNER CASES

### 23-07-2026
   - Write code for API : /request/review/:status/:requestId
   - Thought process of GET and POST
   - Read about ref and populate  (mongoose documentation).
   - Create GET /user/request/received with all the checks 

### 24-07-2026 
   - Logic for GET/ feed API
   - Explore  the $nin , $and ,$ne and other query operators 
   - Added pagination


 ## Notes : 
 - Schema  
    - Blueprint defining the structure of documents
 - Model
    - Class (created from schema) that represents a MongoDB collection

 - NEVER TRUST req.body