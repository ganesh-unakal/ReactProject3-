import React, { useState,useEffect,useReducer,useContext} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return{ value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type === "INPUT_BLUR") {
    return{ value: state.value, isValid: state.value.includes('@')}; 
  }
  return{ value:'', isValid:false}  
}

const passwordReducer=(state, action)=>{
  if(action.type  === "USER_PASSWORD"){
    return{ value: action.val, isValid: action.val.length > 6}
  }
  if(action.type === "PASSWORD_BLUR"){
    return{ value: state.value, isValid: state.value.length > 6}
  }

  return{ value:'', isValid:false}
}
  
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail]=useReducer(emailReducer,{
    value:'',
     isValid:null,
  })

  const [passwordState, dispatchPassword]=useReducer(passwordReducer,{
    value:'',
    isValid:null,
  })

  const authCtx = useContext(AuthContext);

  useEffect(()=>{
    console.log('EFFECT RUNNING')

    return()=>{
      console.log("EFFECT CLEANUP")
    }
  },[])

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // useEffect(() => {
  //   console.log('checking') ///1 //2 //--4
   
  //   const identifier = setTimeout(()=>{
  //     console.log('checking form validity') //2   //3 //--5
  //     setFormIsValid( //setFormIsValid is used as valid function
  //       emailState.value.includes("@") && passwordState.value.trim().length > 6) //this run before side effect function & this code will runs only once for all those keysroke
  //       },1000)
      
  //   return()=>{
  //     console.log("CLEANUP")   //3  & //1 //--2 //it doesnt run before the side execution 
  //     clearTimeout(identifier)
     
  //   }
  // }, [emailState.value, passwordState.value]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', val: event.target.value})

    setFormIsValid( 
          event.target.value.includes("@") && 
          passwordState.isValid 
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:"USER_PASSWORD", val: event.target.value})

    setFormIsValid( 
    emailState.isValid &&  
    event.target.value.trim().length > 6);
  };
  

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"PASSWORD_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
   authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id='email' 
        label='E-mail' 
        type='email' 
        isValid={emailIsValid} 
        value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          />
        
        <Input id='password' 
        label='password' 
        type='password' 
        isValid={passwordIsValid} 
        value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          />
       
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
