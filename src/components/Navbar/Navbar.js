import React from 'react';
import styles from './navbar.module.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    return (
        <div className={styles['nav-container']}>
            
            <div className={styles['nav-logo']} onClick={() => navigate('/')}>
                give.do
            </div>

            
            <div className={styles['nav-list']}>
                <button className={styles['nav-button']} onClick={() => navigate('/')}>Dashboard</button>
                <button className={styles['nav-button']} onClick={() => navigate('/users')}>User Management</button>
                <button className={styles['nav-button']} onClick={() => navigate('/campaigns')}>Campaign Approval</button>
                <button className={styles['nav-button']} onClick={() => navigate('/donations')}>All Donations</button>
                <button className={styles['nav-button']} onClick={() => navigate('/ngousers')}>NGO Users</button>
                <button className={styles['nav-button']} onClick={() => navigate('/reports')}>Reports/Charts</button>
            </div>
        </div>
    )
}

export default Navbar;
