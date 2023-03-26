import { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchResult.module.css';

const SearchResult = ({ item, onObjectSelected, resetSelected }) => {
  const handleEvent = useCallback((e) => {
    if ((e.key === 'Enter' && e.type === 'keydown') || e.type === 'click') {
      onObjectSelected(item);
      resetSelected();
    }
    return null;
  }, [item, onObjectSelected, resetSelected]);

  return (
    <li className={styles.item} onClick={handleEvent} onKeyDown={handleEvent} tabIndex={0}>
      <p className={styles.title}>
          {item.API}
          <br />
          <small>{item.Category}</small>
      </p>
      <p className={styles.description}>{item.Description}</p>
    </li>
  );
};

SearchResult.propTypes = {
  item: PropTypes.shape({
    API: PropTypes.string,
    Auth: PropTypes.string,
    Category: PropTypes.string,
    Cors: PropTypes.string,
    Description: PropTypes.string,
    HTTPS: PropTypes.bool,
    Link: PropTypes.string,
  }),
  onObjectSelected: PropTypes.func,
}

SearchResult.defaultProps = {
  item: {
    API: '',
    Auth: '',
    Category: '',
    Cors: '',
    Description: '',
    HTTPS: '',
    Link: '',
  },
  onObjectSelected: (item) => item,
}

export default SearchResult;
