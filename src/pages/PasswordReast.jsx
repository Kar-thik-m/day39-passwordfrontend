import { useState } from 'react';
import { backendUrl } from '../../config';
import { useNavigate } from "react-router-dom";
import styles from './PasswordReast.module.css';

const Reset = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleReset = () => {
        setEmail('');
        setPassword('');

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registerResponse = await fetch(`${backendUrl}/auth/reset`, {
            method: 'PUT',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (registerResponse.status === 404) {
            alert('Password reseting failed');
        } else {
            alert("Password changed succesfully");
            handleReset();
            navigate("/login");
        }
    };


    return (
        <div>
            <div className={styles.outbox}>
                <div className={styles.container} id="container">
                    <div className={`${styles.container} ${styles.logincontainer}`}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <h1 className={styles.head}>Change Password</h1>
                            <input className={styles.input} type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
                            <input className={styles.input} type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
                            <button className={styles.button}>Reset</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reset;