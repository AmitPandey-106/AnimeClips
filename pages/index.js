import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { MongoClient } from 'mongodb';
import Link from 'next/link';
import { useState } from 'react';

export default function Home({ videos }) {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    return (
        <div className={styles.container}>
            <Head>
                <meta name="description" content="Anime video clips" />
                <link rel="icon" href="/favicon.ico" />
                <title>AnimeClips</title>
            </Head>
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <div className={styles.logo}>
                        <Link href="/" passHref>
                            <div className={styles.logoContainer}>
                                <Image 
                                    src="/elitelogo.jpg" 
                                    alt="Elite Logo" 
                                    width={50} 
                                    height={50} 
                                    quality={100} 
                                    className={styles.logoImage} 
                                    priority 
                                />
                                <h1 className={styles.logoText}>AnimeClips</h1>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <ul className={styles.navItemsDesktop}>
                        <li className={styles.navText}><Link href="/">Home</Link></li>
                        <li className={styles.navText}><Link href="/about">About</Link></li>
                    </ul>

                    {/* Hamburger Menu for Mobile */}
                    <div className={styles.hamburger} onClick={toggleNav}>
                        <span className={isNavOpen ? styles.barOpen : styles.bar}></span>
                        <span className={isNavOpen ? styles.barOpen : styles.bar}></span>
                        <span className={isNavOpen ? styles.barOpen : styles.bar}></span>
                    </div>
                </nav>
            </header>

            {/* Overlay */}
            {isNavOpen && <div className={styles.overlay} onClick={closeNav}></div>}

            {/* Sliding Sidebar for Mobile */}
            <div className={`${styles.sidebar} ${isNavOpen ? styles.active : ''}`}>
                <ul className={styles.navItems}>
                    <li><Link href="/" onClick={closeNav}>Home</Link></li>
                    <li><Link href="/about" onClick={closeNav}>About</Link></li>
                </ul>
            </div>

            <main className={styles.main}>
                {/* Card Images with Fixed Size */}
                <div className={styles.cardContainer}>
                    {videos.map((video) => (
                        <Link
                            key={video._id}
                            href={{
                                pathname: '/animesvideos',
                                query: {
                                    imageUrl: video.imageUrl, // Passing image URL to animesvideos page
                                    animeName: video.animeName  // Passing anime name to animesvideos page
                                }
                            }}
                            passHref
                        >
                            <div className={styles.card}>
                                <Image
                                    src={video.imageUrl}
                                    alt={video.animeName}
                                    width={200} // Fixed width
                                    height={300} // Fixed height
                                    quality={100} // High image quality
                                    className={styles.cardImage}
                                />
                                <h3>{video.animeName}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <footer className={styles.footer}>
                <p>&copy; 2024 AnimeClips. All rights reserved - Amit Pandey.</p>
            </footer>
        </div>
    );
}

// Fetch video data from MongoDB
export async function getServerSideProps() {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db();
    const collection = db.collection('animenames'); // Ensure this matches your collection name
    const videos = await collection.find().toArray();

    client.close();

    return {
        props: {
            videos: JSON.parse(JSON.stringify(videos)), // Convert MongoDB documents to JSON
        },
    };
}
