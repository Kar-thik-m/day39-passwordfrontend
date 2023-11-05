import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { backendUrl } from "../../config";
import styles from './Verify.module.css';


const Verify = () => {
    const [params,] = useSearchParams();
    const navigate = useNavigate();
    const verifyUser = async () => {
        const Response = await fetch(`${backendUrl}/auth/validate`, {
            method: 'PUT',
            body: JSON.stringify({ resetKey: params.get('reset') }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await Response.json();
        console.log(data === true);
        if (data === true) {
            alert('Verifyed Successfully');
            navigate("/Reset");
        } else {
            alert('Verification failed');
        }
    }
    useEffect(() => {
        verifyUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    return (
        <div className={styles.box}>
            <h1 className={styles.h1}>VERIFYING THE EMAIL</h1>
            <div className={styles.center}>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
            </div>
        </div>
    )

}


export default Verify;