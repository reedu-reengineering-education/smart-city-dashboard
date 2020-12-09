import PropTypes from 'prop-types';
import styled from 'styled-components';
// @ts-ignore
import AnimatedNumber from 'animated-number-react';

interface NumberWidgetProps {
  title: string;
  number: number;
  unit?: string;
  decimals?: number;
}

const Card = styled.div`
  width: 200px;
  height: 200px;
  margin: 1rem;
  padding: 1rem;

  &:first-child {
    margin-left: 0;
  }
`;

const NumberWidget = (props: NumberWidgetProps) => {
  return (
    <Card className="card">
      <h4 className="subtitle is-4">{props.title}</h4>
      <h1 className="title">
        <AnimatedNumber
          value={props.number}
          formatValue={(value: number) => {
            if (props.decimals != null) return value.toFixed(props.decimals);

            return value.toFixed(2);
          }}
        />
      </h1>
      {props.unit && <h2 className="subtitle">{props.unit}</h2>}
    </Card>
  );
};

NumberWidget.propTypes = {
  title: PropTypes.string,
  number: PropTypes.number,
  unit: PropTypes.string,
  decimals: PropTypes.number,
};

export default NumberWidget;
