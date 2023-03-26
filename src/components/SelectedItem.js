import PropTypes from 'prop-types';
import styles from './SelectedItem.module.css';

const SelectedItem = ({ data }) => (
  <a
    className={styles.holder}
    href={data.Link}
    target="_blank"
    rel="noreferrer"
    title={`Clicca per visitare il sito web dell'API: ${data.API}`}
  >
    <h3>
      {data.API}
      <br />
      <small>Categoria: {data.Category}</small>
    </h3>
    {data?.Description && <p>{data.Description}</p>}
    {data.Auth || data.Cors || data.HTTPS ? (
      <ul>
        {data.Auth && <li>Auth: {data.Auth}</li>}
        {data.Cors && <li>Cors: {data.Cors}</li>}
        {data.HTTPS && <li>HTTPS ✔</li>}
      </ul>
    ) : null}
  </a>
);

SelectedItem.propTypes = {
  data: PropTypes.shape({
    API: PropTypes.string,
    Auth: PropTypes.string,
    Category: PropTypes.string,
    Cors: PropTypes.string,
    Description: PropTypes.string,
    HTTPS: PropTypes.bool,
    Link: PropTypes.string,
  }).isRequired,
}

export default SelectedItem;
