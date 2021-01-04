import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import { updateFeaturesVisible } from '../actions/map';
import {
  ComponentWrapper,
  FooterWrapper,
  HeadingWrapper,
  WidgetIcon,
} from './styles';

interface IBaseWidgetProps {
  icon?: JSX.Element;
  title?: string;
  mapFeatureTag: string;
  children: JSX.Element;
  dataSource: string;
  headerOverride?: JSX.Element;
}

const WidgetContent = styled.div`
  height: 100%;
`;

const BaseWidgetComponent = (props: IBaseWidgetProps) => {
  const dispatch = useDispatch();

  const [showSource, setShowSource] = useState(false);

  return (
    <ComponentWrapper>
      {props.headerOverride ? (
        props.headerOverride
      ) : (
        <HeadingWrapper>
          {props.icon && <WidgetIcon>{props.icon}</WidgetIcon>}
          {props.title && <p className="is-size-5">{props.title}</p>}
        </HeadingWrapper>
      )}
      <WidgetContent>
        {!showSource ? (
          props.children
        ) : (
          <ReactMarkdown>{props.dataSource}</ReactMarkdown>
        )}
      </WidgetContent>
      <FooterWrapper>
        <p
          onClick={() =>
            dispatch(
              updateFeaturesVisible({
                [props.mapFeatureTag]: true,
              })
            )
          }
        >
          <Link to="/map">Karte öffnen</Link>
        </p>
        <p onClick={() => setShowSource(!showSource)}>Datenquelle</p>
      </FooterWrapper>
    </ComponentWrapper>
  );
};

export default BaseWidgetComponent;
