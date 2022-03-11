import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = event => {
    setData({...data, [event.target.name]: event.target.value})
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setData({...data, error: null, loading: true});

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, 'users', result.user.uid), {
        isOnline: true,
      });
      setData({ email: '', password: '', error: null, loading: false});
      navigate('/');
    } catch (err) {
      if(email === "" || password === "")
      {
        setData({...data, error: "Please fill out all of the fields.", loading: false});
      }
      else if(err.message === "Firebase: Error (auth/invalid-email).")
      {
        setData({...data, error: "Invalid email. Please use a different email.", loading: false});
      }
      else if(err.message === "Firebase: Error (auth/wrong-password).")
      {
        setData({...data, error: "Incorrect credentials. Please verify that you have entered the right email and password.", loading: false});
      }
      else if(err.message === "Firebase: Error (auth/user-not-found).")
      {
        setData({...data, error: "The email that you have entered does not have an associated account. Try registering with this email or use a different email address.", loading: false});
      }
      else
        setData({...data, error: err.message, loading: false});
    }
  };

  return (
    <section>
      <h3>Log Into Your Account</h3>
      <form className='form' onSubmit={handleSubmit}>
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
            {loading ? 'Logging in ...' : 'Login'}
            </button>
        </div>
      </form>
    </section>
  )
}

export default Login