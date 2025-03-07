import styles from '../styles/Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heroTitle}>Welcome to Nelson & Murdock</h1>
      <p className={styles.heroText}>Justice is blind, but we see the truth.</p>
    </div>
  );
}

export default Home;