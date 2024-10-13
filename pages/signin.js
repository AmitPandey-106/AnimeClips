// pages/signin.js
import Head from 'next/head';
import { useState } from 'react'; // Import useState for state management
import { useRouter } from 'next/router';
import styles from '../styles/Signin.module.css';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Validation logic
        if (username === 'amit' && password === 'pandey') {
            // Redirect to the video posting page or do whatever you want here
            alert('Login successful! Redirecting to the video post page...');
            router.push('/post-video');
            // You can use router.push('/post-video') if you set up a route
        } else {
            setError('Invalid username or password'); // Set error message
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Sign In</title>
                <meta name="description" content="Sign in to AnimeClips" />
            </Head>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>Sign In</h1>
                {error && <p className={styles.error}>{error}</p>} {/* Show error message if exists */}
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Update username state
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>Sign In</button>
                </form>
            </div>
        </div>
    );
}
