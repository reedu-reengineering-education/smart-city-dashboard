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

import styled from 'styled-components';

interface OnlineStatusProps {
  online: boolean;
}

const Dot = styled.span<OnlineStatusProps>`
  height: 15px;
  width: 15px;
  background-color: ${(props) => (props.online ? 'green' : 'red')};
  border-radius: 50%;
  display: inline-block;
  margin-left: 1rem;
  vertical-align: middle;
`;

const OnlineStatus = (props: OnlineStatusProps) => {
  return <Dot online={props.online}></Dot>;
};

export default OnlineStatus;
