import { useState } from "react";
import { backendUrl } from "../../config";
import { useNavigate } from "react-router-dom";
import styles from './EmailCheck.module.css';

const EmailCheck = () => {
    const navigate = useNavigate(); // Use `navigate` instead of `Navigate`
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleReset = () => {
        setEmail('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await fetch(`${backendUrl}/auth/reset-password`, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!loginResponse.ok) {
                if (loginResponse.status === 404) {
                    alert('User not found');
                } else {
                    
                    alert('An error occurred');
                }
            } else {
                const data = await loginResponse.json();
                alert("Please check your email"); 
                console.log(data.responseObj.email); 
                handleReset();
                navigate("/login"); 
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className={styles.outbox}>
            <div className={`${styles.container} ${styles.logincontainer}`}>
                <form className={styles.form} onSubmit={handleSubmit}> 
                    <h1 className={styles.head}>Password Reset</h1>
                    <input className={styles.input} type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
                    <button className={styles.button} type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default EmailCheck;
