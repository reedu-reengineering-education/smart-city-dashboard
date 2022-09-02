# Smart City Münster Dashboard

[![Netlify Status](https://api.netlify.com/api/v1/badges/a3b0b564-6d90-4bbf-9b5f-2f5fd46d5a97/deploy-status)](https://app.netlify.com/sites/smart-city-dashboard/deploys)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This Project contains the source code of the frontend of the smart city dashboard. The display can connect to the backend and show different kinds of environmental and smart city related data. The dashboard contains three different pages: Dashboard view, map view and an info page.

### Running the project

1. Clone the repo
2. `cd smart-city-dashboard`
3. `cp .env.example .env`
4. Change the env variable `REACT_APP_API_URL` to the URL of the backend
5. `yarn` or `npm install`
6. `yarn start` or `npm start`

### Development

Run the same steps like above

#### Technology

The frontend is written in typescript and uses react. State management is done with redux and redux-saga. The page style and layout is done with bulma, where components are styled with styled-components. Data visualization on the dashboard is either custom written (e.g. parking) or visualized with apexcharts (e.g. charts).

#### Dev Technology

We are using typescript for type safety. In order to have consistend formatting / styling of the code, we are using husky, lint-staged and prettier.

#### File Structure

- `.vscode` Settings when developing with VSCode
- `public` Static files that will be served as is
- `scripts` Scripts for maintaining the project
- `src` Source code. This also includes the react entry point, service workers and types
  - `actions` Redux actions (splitted for each data source)
  - `components` React Components
  - `pages` Pages of the website
  - `reducers` Redux reducers (splitted for each data source)
  - `resources` Assets that will be compiled (like icons, images etc)
  - `sagas` redux sagas (Sagas are implemented using Generator functions)
  - `views` Containers that display data (splitted for each data source)

#### Available Visualizations

- Tile: Displaying numbers with units and titles in tiles / cards
- Progress: Visualizing progress which is here used to show the utilization of parking decks
- Line diagram: visualizing (multiple) lines in a diagram

#### How to add a new data source

If you want to add a new data source to the dashboard, there are multiple steps neccessary:

1. Start in the `src/reducers` folder and create a new reducer similar to the existing ones. Here, you will also define the state for youry particular dataset
2. Next one, create corresponding actions for your data in the `src/actions` folder
3. After defining how the data should be stored and managed, we can take care of fething the data. Create a new saga in the `src/sagas` folder similar to the existing files. The generator functions will fetch data regularly based on the interval you can define

#### Show the data on the dashboard

1. The most laborious will take place in `src/views` where you create a new container for your data. Here, you need to access the redux state and render different kinds of visualizations
2. You can now import your container in `pages/Home` to display it on the main page. You might need to adjust the layout here

#### License

Copyright (C) 2022 Reedu GmbH & Co. KG

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
