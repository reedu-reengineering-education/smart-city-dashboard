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
  position: relative;
`;

interface IDataContentStyleProps {
  blur: boolean;
}
const DataContent = styled.div<IDataContentStyleProps>`
  height: 100%;
  transition: 0.5s;
  filter: ${(props) => {
    return props.blur ? 'blur(1rem) opacity(0.3)' : '';
  }};
`;

const SourceContent = styled(ReactMarkdown)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: scroll;
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
        <DataContent blur={showSource}>{props.children}</DataContent>
        {showSource && <SourceContent>{props.dataSource}</SourceContent>}
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
        <p onClick={() => setShowSource(!showSource)}>
          {showSource ? <b>Schließen</b> : 'Datenquelle'}
        </p>
      </FooterWrapper>
    </ComponentWrapper>
  );
};

export default BaseWidgetComponent;
