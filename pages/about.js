import Head from 'next/head';
import styles from '../styles/About.module.css'; // Ensure this path is correct

export default function About() {
    return (
        <div className={styles.aboutPage}>
            <Head>
                <title>About Us - AnimeClips</title>
                <meta name="description" content="Learn more about AnimeClips and our passion for anime." />
            </Head>

            <header className={styles.header}>
                <h1 className={styles.title}>Welcome to AnimeClips</h1>
                <p className={styles.tagline}>
                    We&apos;re passionate anime enthusiasts dedicated to bringing you the best Twixtor experiences inspired by Japan&apos;s vibrant animation.
                </p>
            </header>

            <section className={styles.missionSection}>
                <h2 className={styles.sectionTitle}>Our Mission</h2>
                <ul className={styles.missionList}>
                    <li className={styles.missionItem}>Provide high-quality Twixtor animations that showcase the beauty of anime</li>
                    <li className={styles.missionItem}>Foster a community of anime fans and Twixtor enthusiasts</li>
                    <li className={styles.missionItem}>Continuously push the boundaries of creativity and innovation</li>
                </ul>
            </section>

            <section className={styles.storySection}>
                <h2 className={styles.sectionTitle}>Our Story</h2>
                <p>
                    Founded by Elite in 2024, our website is driven by a shared love for anime and cutting-edge technology. Our team consists of skilled designers, animators, and developers working together to create captivating Twixtor content.
                </p>
            </section>

            <section className={styles.twixtorSection}>
                <h2 className={styles.sectionTitle}>What is Twixtor?</h2>
                <p>
                    Twixtor is a software plugin used to create stunning slow-motion animations. We utilize this technology to bring anime scenes to life in breathtaking detail.
                </p>
            </section>

            <section className={styles.whyAnimeSection}>
                <h2 className={styles.sectionTitle}>Why Anime?</h2>
                <p>
                    Anime is more than just entertainment - it&apos;s an art form that inspires imagination and creativity. We believe that combining anime with Twixtor technology results in truly mesmerizing experiences.
                </p>
            </section>

            <section className={styles.communitySection}>
                <h2 className={styles.sectionTitle}>Join Our Community</h2>
                <p>
                    Stay updated on our latest Twixtor animations, behind-the-scenes insights, and community engagement:
                </p>
                <ul className={styles.communityLinks}>
                    <li><a href="https://www.instagram.com/ft._.elite/" className={styles.link}>Follow us on Instagram</a></li>
                    <li><a href="https://www.youtube.com/@ELI_T_E" className={styles.link}>Subscribe to our YouTube channel</a></li>
                    <li><a href="mailto:eyt5660@gmail.com" className={styles.link}>Share your thoughts on our forum</a></li>
                </ul>
            </section>

            <section className={styles.contactSection}>
                <h2 className={styles.sectionTitle}>Get in Touch</h2>
                <p>
                    Have questions, feedback, or collaboration ideas? Contact us at eyt5660@gmail.com.
                </p>
            </section>

            <footer className={styles.footer}>
                <p>Thank you for visiting AnimeClips!</p>
            </footer>
        </div>
    );
}
