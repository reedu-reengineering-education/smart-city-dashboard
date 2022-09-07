/**
 * Smart City Münster Dashboard
 * Copyright (C) 2022 Reedu GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useEffect, useState } from 'react';
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
import LoadingDots from './LoadingDots';

interface IBaseWidgetProps {
  icon?: any;
  title?: string;
  mapFeatureTag: string;
  children: JSX.Element;
  dataSource: string;
  headerOverride?: JSX.Element;
  details?: JSX.Element;
  detailsDefault?: boolean;
  show24h?: Function;
  show7d?: Function;
  show1m?: Function;
  loading?: boolean;
  mode?: '24h' | '7d' | '1m';
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

const IconTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SourceContent = styled(ReactMarkdown)`
  position: absolute;
  top: 0.5rem;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: scroll;

  > p {
    margin-bottom: 0.5rem;
  }
`;

const DetailContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: visible;
`;

const FooterButton = styled.button`
  cursor: pointer;
  user-select: none;
  background-color: rgba(189, 189, 189, 0.15);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-radius: 0.25rem;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 0.5rem;
  border: none;
  outline: none;

  > a {
    color: inherit;
  }

  &:hover {
    background-color: rgba(189, 189, 189, 0.5);
  }
`;

const HighlightedFooterButton = styled(FooterButton)<{ bold?: boolean }>`
  background-color: rgba(0, 159, 227, 0.15);

  font-weight: ${(props) => (props.bold ? '600' : '')};

  &:hover {
    background-color: rgba(0, 159, 227, 0.25);
  }
`;

/**
 * Each dashboard view (in src/views) uses the BaseWidgetComponent to visualize data. Each view will therefore have more or less the same appearence and features
 */
const BaseWidgetComponent = (props: IBaseWidgetProps) => {
  const dispatch = useDispatch();

  const [showSource, setShowSource] = useState(false);
  const [showDetails, setShowDetails] = useState(props.detailsDefault ?? false);

  const [animateIcon, setAnimateIcon] = useState(false);

  const [mode, setMode] = useState<'24h' | '7d' | '1m'>();

  useEffect(() => {
    if (props.mode) setMode(props.mode);
  }, [props.mode]);

  useEffect(() => {
    if (showSource) {
      setShowDetails(false);
    }
  }, [showSource]);
  useEffect(() => {
    if (showDetails) {
      setShowSource(false);
    }
  }, [showDetails]);

  useEffect(() => {
    setAnimateIcon(true);
  }, [props.children]);
  useEffect(() => {
    if (animateIcon) {
      setAnimateIcon(false);
    }
  }, [animateIcon]);

  const Icon = props.icon;

  return (
    <ComponentWrapper>
      <HeadingWrapper>
        <IconTitleWrapper>
          {props.icon && (
            <WidgetIcon>
              <Icon start={animateIcon}></Icon>
            </WidgetIcon>
          )}
          {props.title && <p className="is-size-5">{props.title}</p>}
        </IconTitleWrapper>
        {props.headerOverride && props.headerOverride}
      </HeadingWrapper>

      <WidgetContent>
        <DataContent blur={showSource || showDetails}>
          {props.children}
        </DataContent>
        {showSource && <SourceContent>{props.dataSource}</SourceContent>}
        {showDetails && (
          <DetailContent>
            {props.loading && <LoadingDots></LoadingDots>}
            {!props.loading && props.details}
          </DetailContent>
        )}
      </WidgetContent>
      <FooterWrapper>
        <FooterButton
          onClick={() =>
            dispatch(
              updateFeaturesVisible({
                [props.mapFeatureTag]: true,
              })
            )
          }
        >
          <Link to="/map">Karte</Link>
        </FooterButton>
        {props.details && (
          <FooterButton onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <b>Aktuell</b> : 'Zeitverlauf'}
          </FooterButton>
        )}
        {showDetails && (
          <FooterWrapper>
            {props.show24h && (
              <HighlightedFooterButton
                disabled={props.loading}
                onClick={() => {
                  if (props.show24h) {
                    props.show24h();
                    setMode('24h');
                  }
                  setAnimateIcon(true);
                }}
                bold={mode === '24h'}
              >
                24h
              </HighlightedFooterButton>
            )}
            {props.show7d && (
              <HighlightedFooterButton
                disabled={props.loading}
                onClick={() => {
                  if (props.show7d) {
                    props.show7d();
                    setMode('7d');
                  }
                  setAnimateIcon(true);
                }}
                bold={mode === '7d'}
              >
                7 Tage
              </HighlightedFooterButton>
            )}
            {props.show1m && (
              <HighlightedFooterButton
                disabled={props.loading}
                onClick={() => {
                  if (props.show1m) {
                    props.show1m();
                    setMode('1m');
                  }
                  setAnimateIcon(true);
                }}
                bold={mode === '1m'}
              >
                1 Monat
              </HighlightedFooterButton>
            )}
          </FooterWrapper>
        )}
        <FooterButton onClick={() => setShowSource(!showSource)}>
          {showSource ? <b>Schließen</b> : 'Über die Daten'}
        </FooterButton>
      </FooterWrapper>
    </ComponentWrapper>
  );
};

export default BaseWidgetComponent;
