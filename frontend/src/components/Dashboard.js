import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import smLogo from "./sm.png";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/users", {withCredentials: true})
            .then(response => setUsers(response.data))
            .catch(() => navigate("/"));
    }, [navigate]);

    const handleLogout = async () => {
        await axios.post("http://localhost:5000/api/auth/logout", {}, {withCredentials: true});
        navigate("/");
    }

    return (
        <div style={styles.pageBackground}>
            <div style={styles.overlay}>
                <div style={styles.container}>
                    <img src={smLogo} alt="Logo" style={styles.logo} />
                    <h2 style={styles.heading}>User Lists</h2>
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.tableHeader}>Name</th>
                                    <th style={styles.tableHeader}>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td style={styles.tableCell}>{user.name}</td>
                                        <td style={styles.tableCell}>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={handleLogout} style={styles.button}>
                        Logout
                    </button>
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
        maxWidth: '800px',
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
    tableWrapper: {
        overflowX: 'auto',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        backgroundColor: 'white',
    },
    tableHeader: {
        backgroundColor: '#1976d2',
        color: '#ffffff',
        padding: '12px 20px',
        textAlign: 'left',
        fontWeight: '500',
    },
    tableCell: {
        padding: '12px 20px',
        borderBottom: '1px solid #e0e0e0',
        color: '#333333',
    },
    button: {
        backgroundColor: '#d32f2f',
        color: '#ffffff',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        display: 'block',
        margin: '0 auto',
        transition: 'background-color 0.3s',
    },
    logo: {
        width: '120px',
        height: 'auto',
        display: 'block',
        margin: '0 auto 20px',
    },
};

export default Dashboard;