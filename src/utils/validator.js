
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/;
const photoUrlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})$/i;

const validateKeys = (data)=>{    
        const errors = [];
       if(data?.emailId && !emailRegex.test(data?.emailId)){
         errors.push("Invalid Email") 
       }
       if(data?.password && !passwordRegex.test(data?.password)){        
         errors.push("Invalid Password")
       }
       if(data?.age && !(data?.age >= 18 &&  data?.age < 80)){
         errors.push("Age must be 18 or less than 80")
       }
       if(data?.photoUrl && !photoUrlRegex.test(data?.photoUrl)){
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