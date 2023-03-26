import styles from './SearchLoader.module.css';

const SearchLoader = () => (
  <div className={styles.lds_ellipsis}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default SearchLoader;
