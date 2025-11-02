
var validator = require('validator');

const validateKeys = (data)=>{   

    const errors = [];

       if(data?.emailId && !(validator.isEmail(data?.emailId))){
         errors.push("Invalid Email") 
       }
       if(data?.password && !validator.isStrongPassword(data?.password)){        
         errors.push("Invalid Password : { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }")
       }
       if(data?.age && !(data?.age >= 18 &&  data?.age < 80)){
         errors.push("Age must be 18 or less than 80")
       }
       if(data?.photoUrl && !validator.isURL(data?.photoUrl)){
         errors.push("Invalid photo url")
       }
       if(data?.skill && (data?.skill.length < 1 || data?.skill.length  >10 ) ){
         errors.push("You can add a maximum of 10 skills")
       }
       
      return {
        isValidate : errors.length === 0 ,
        errors
      }
    }

module.exports = validateKeys