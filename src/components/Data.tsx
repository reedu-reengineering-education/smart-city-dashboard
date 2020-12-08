import PropTypes from 'prop-types';

interface DataProps {
  data: any;
}

const Data = (props: DataProps) => {
  return <div>{JSON.stringify(props.data)}</div>;
};

Data.propTypes = {
  data: PropTypes.any,
};

export default Data;
