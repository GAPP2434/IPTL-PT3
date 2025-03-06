import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import smLogo from "./sm.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/login", 
                { email, password }, 
                { withCredentials: true }
            );
            navigate("/dashboard");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div style={styles.pageBackground}>
            <div style={styles.overlay}>
                <div style={styles.container}>
                    {/* Add your logo here */}
                    { <img src={smLogo} alt="Logo" style={styles.logo} /> }
                    <h2 style={styles.heading}>User Login</h2>
                    <form onSubmit={handleLogin} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email:</label>
                            <input 
                                type="email" 
                                style={styles.input}
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password:</label>
                            <input 
                                type="password"
                                style={styles.input}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" style={styles.button}>
                            Login
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate("/register")} 
                            style={styles.registerButton}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageBackground: {
        backgroundImage: `url('https://cms-image-bucket-production-ap-northeast-1-a7d2.s3.ap-northeast-1.amazonaws.com/images/4/9/1/0/47370194-3-eng-GB/Cropped-17096655012016-02-22T120000Z_204133023_GF10000316204_RTRMADP_3_PHILIPPINES-SM.JPG')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        padding: '30px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
    heading: {
        color: '#1976d2',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: '500',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        color: '#333333',
        fontSize: '14px',
        fontWeight: '500',
    },
    input: {
        padding: '10px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#1976d2',
        color: '#ffffff',
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    logo: {
        width: '120px',
        height: 'auto',
        display: 'block',
        margin: '0 auto 20px',
    },
    registerButton: {
        backgroundColor: '#4caf50',
        color: '#ffffff',
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%',
    },
};

export default Login;