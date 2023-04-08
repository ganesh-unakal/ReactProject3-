import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.valid, isValid: state.value.includes("@") };
  }
  
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER PASSWORD") {
    return { value: action.val, isValid: action.val.length > 6 };
  }
  
  if (action.type === "PASSWORD_BLUR") {
    return { value: state.valid, isValid: state.value.length > 6 };
  }

  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // useEffect(()=>{
  //   console.log('EFFECT RUNNING')//--3

  //   return()=>{
  //     console.log("EFFECT CLEANUP")//--1
  //   }
  // },[])

  // useEffect(() => {
  //   console.log('checking') ///1 //2 //--4

  //   const identifier=setTimeout(()=>{
  //     console.log('checking form validity') //2   //3 //--5
  //     setFormIsValid( //setFormIsValid is used as valid function
  //       enteredEmail.includes("@") &&
  //       enteredPassword.trim().length > 6 &&
  //       enteredCollegeName.trim().length !==0
  //     );  //this run before side effect function & this code will runs only once for all those keysroke

  //   },1000)

  //   return()=>{
  //     console.log("CLEANUP")   //3  & //1 //--2 //it doesnt run before the side execution
  //     clearTimeout(identifier)

  //   }
  // }, [enteredEmail, enteredPassword,enteredCollegeName]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER INPUT", val: event.target.value });

    setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER PASSWORD", val: event.target.value });

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchEmail({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

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
