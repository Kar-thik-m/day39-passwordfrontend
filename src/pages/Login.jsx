import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { backendUrl } from '../../config';
import styles from './Login.module.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (loginResponse.status === 401) {
        alert('Login failed');
      } else {
        const data = await loginResponse.json(); // Await the response data
        alert('Login Success');
        // Store the user data in local storage if needed
         localStorage.setItem('user', JSON.stringify(data));
        handleReset();
      }
    } catch (error) {
      
      alert('Login failed');
    }
  };

  if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <div className={styles.outbox}>
      <div className={styles.container} id="container">
        <div className={`${styles.container} ${styles.logincontainer}`}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.head}>Login</h1>
            <span className={styles.span}>
              or <Link to={'/register'}>Create an account?</Link>
            </span>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <Link to={'/EmailCheck'}>Forgot your password?</Link>
            <button className={styles.button}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;