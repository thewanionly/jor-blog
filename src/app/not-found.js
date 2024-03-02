import styles from './notfoundpage.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h2 className={styles.primaryMessage}>404 Not Found</h2>
      <p>This page does not exist. Please check the URL and try again.</p>
    </div>
  );
}
