import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import smLogo from "./sm.png";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", 
                { name, email, password }
            );
            alert("Registration successful! Please login.");
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div style={styles.pageBackground}>
            <div style={styles.overlay}>
                <div style={styles.container}>
                    <img src={smLogo} alt="Logo" style={styles.logo} />
                    <h2 style={styles.heading}>Register</h2>
                    <form onSubmit={handleRegister} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Name:</label>
                            <input 
                                type="text" 
                                style={styles.input}
                                placeholder="Enter your name"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email:</label>
                            <input 
                                type="email" 
                                style={styles.input}
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password:</label>
                            <input 
                                type="password"
                                style={styles.input}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" style={styles.button}>
                            Register
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate("/")} 
                            style={styles.loginButton}
                        >
                            Back to Login
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
    loginButton: {
        backgroundColor: '#4caf50',
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
};

export default Register;