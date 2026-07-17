
var validator = require('validator');

const validateKeys = (data)=>{   

    const errors = [];

       if(!data.firstName){
        errors.push("FirstName is Required ")
       }
       if(!data.emailId){
        errors.push("Email is Required")
       }

       if(!data.password){
        errors.push("Password is Required")
       }

       if(data.emailId && !(validator.isEmail(data?.emailId))){
         errors.push("Invalid Email") 
       }
       if(data.password && !validator.isStrongPassword(data?.password)){        
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


const  validateEditProfileData  = (data)=>{
  const AllowedFieldsToEdit = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "photoUrl",
    "skill",
  ];

  const isAllowed =  Object.keys(data).every((key)=>AllowedFieldsToEdit.includes(key))

  if(!isAllowed){
    throw Error(`${AllowedFieldsToEdit} only editable`)
  }

  const errors = [];

      
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


const validatePassword =(password)=>{

   
   
  const AllowedFields =[
    "password"
  ]

   const checkPassowordKey = Object.keys(password).every((key)=>AllowedFields.includes(key))

   
   if(!checkPassowordKey){
    throw Error("Password Field only editable")
   }

   const passwordValue = password.password;

   
   
   const errors =[];

    if(passwordValue && !validator.isStrongPassword(passwordValue)){        
         errors.push("Invalid Password : { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }")
       }

       return {
        isValidate : errors.length === 0 ,
        errors
      }
}
module.exports = {validateKeys , validateEditProfileData,validatePassword}