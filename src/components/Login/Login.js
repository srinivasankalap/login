import React, { useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state, action)=>{
  if (action.type==='USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type==='INPUT_BLUR'){
    return{ value: state.value ,isValid:state.value.includes('@')}
  }
  return {value: '', isValid: false};
}
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege, setEnteredCollege]=useState('');
  // const [collegeValid, setCollegeValid]=useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail]=useReducer(emailReducer, {value: '', isValid: null});

  const [enteredPassword, setEnteredPassword] = useReducer(passwordReducer,{ value: '', isValid: null });

  // useEffect(()=>{
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim()!==''
  //   );
  // },[enteredEmail,enteredPassword,enteredCollege])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword({ type: 'USER_INPUT', val: event.target.value });
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  // const collegeHandler=(e)=>{
  //   setEnteredCollege(e.target.value);
  // }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type:'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    setEnteredPassword({ type: 'INPUT_BLUR' });
  };

  // const validateCollegeHandler=()=>{
  //   setCollegeValid(enteredCollege.trim()!=='');
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
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
        {/* <div
          className={`${classes.control} ${
            collegeValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeHandler}
            onBlur={validateCollegeHandler}
          />
        </div> */}
        <div
          className={`${classes.control} ${
            enteredPassword.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword.value}
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




