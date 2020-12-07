import React from 'react';
import PropTypes from 'prop-types';

interface DataProps {
  title: string;
  data: any;
}

const Data = (data: DataProps) => {
  return (
    <div>
      <h1>{data.title}</h1>
      {JSON.stringify(data.data)}
    </div>
  );
};

Data.propTypes = {
  title: PropTypes.string,
  data: PropTypes.any,
};

export default Data;
