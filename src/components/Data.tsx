import React from 'react';
import PropTypes from 'prop-types';

interface DataProps {
  title: string;
  data: any;
}

const Data = (props: DataProps) => {
  return (
    <div>
      <h1 className="title">{props.title}</h1>
      {JSON.stringify(props.data)}
    </div>
  );
};

Data.propTypes = {
  title: PropTypes.string,
  data: PropTypes.any,
};

export default Data;
