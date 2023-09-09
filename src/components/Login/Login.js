import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import AuthContext from '../../context/auth-context';
import Button from '../UI/Button/Button';
import Input from '../UI/input/Input'

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

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = enteredPassword;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  // useEffect(()=>{
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim()!==''
  //   );
  // },[enteredEmail,enteredPassword,enteredCollege])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword({ type: 'USER_INPUT', val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
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
    if (formIsValid) {
      authCtx.onLogin(emailState.value, enteredPassword.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
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
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={enteredPassword.value}
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




