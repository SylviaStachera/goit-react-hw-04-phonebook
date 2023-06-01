import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <label className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        value={value}
        autoComplete="off"
        placeholder="Search name..."
        onChange={onChangeFilter}
      />
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
