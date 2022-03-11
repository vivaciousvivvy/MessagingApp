import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import {setDoc, doc, Timestamp} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const {name, email, password, error, loading } = data;

  const handleChange = event => {
    setData({...data, [event.target.name]: event.target.value})
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setData({...data, error: null, loading: true});

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({name: '', email: '', password: '', error: null, loading: false});
      navigate('/');
    } catch (err) {
      if(email === "" || password === "" || name === "")
      {
        setData({...data, error: "Please fill out all of the fields.", loading: false});
      }
      else if(err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
      {
        setData({...data, error: "Your password must be greater than 6 characters.", loading: false});
      }
      else if(err.message === "Firebase: Error (auth/email-already-in-use).")
      {
        setData({...data, error: "This email is already taken by another user. Please try using a different email address.", loading: false});
      }
      else
        setData({...data, error: err.message, loading: false});
    }
  };

  return (
    <section>
      <h3>Create An Account</h3>
      <form className='form' onSubmit={handleSubmit}>
        <div className='input_container'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={handleChange}/>
        </div>
        <div className='input_container'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' value={email} onChange={handleChange}/>
        </div>
        <div className='input_container'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={password} onChange={handleChange}/>
        </div>
        {error ? <p className='error'>{error}</p> : null}
        <div className='btn_container'>
          <button className='btn' disabled={loading}>
          {loading ? 'Registering ...' : 'Register'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Register