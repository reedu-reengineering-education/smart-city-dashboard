import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Content = styled(ReactMarkdown)`
  > p {
    margin-bottom: 1rem;
  }
`;
function Info() {
  return (
    <React.Fragment>
      <div className="container is-fluid mt-5">
        <Content
          children={`
# Informationen
Dieses Dashboard ist ein Informationsangebot der Stabsstelle Smart City der Stadt Münster.
Auf dem Dashboard („Armaturenbrett“ oder „Cockpit“) werden Echtzeitdaten visualisiert, die in und für unterschiedliche Themen der Stadtentwicklung durch die Stadt Münster und ihre Partner erhoben werden.

Das Dashboard und das entsprechende Sensorennetzwerk sollen schrittweise weiter ausgebaut werden.
Mit diesen Live-Daten kann künftig ein Überblick zum Beispiel über die Luftqualität, andere Umweltdaten oder Mobilitätsangebote gegeben werden.
Auf Basis von Echtzeitdaten und interak-tiven Zeitreihen lässt sich beispielsweise die Wirksamkeit von Maßnahmen im Stadtraum analysieren.
Die interaktive Kartendarstellung gibt Informationen über die jeweiligen Orte der Datensammlung.
Informationen und Ansprechpartner zu den einzelnen Themen finden Sie bei einem Klick auf "Über die Daten" bei der jeweiligen Themenkachel.
Alle Daten sind als Offene Daten (Open Data) auch über das [Open-Data-Portal der Stadt Münster](https://opendata.stadt-muenster.de/) für andere Zwecke verfügbar.

Die Software des Dashboards wurde von der münsterschen Firma [re:edu](https://reedu.de/) entwickelt und 
ist als Freie Software (Open Source) zur Adaption, Verbesserung und Verbreitung frei verfügbar: [Quelltext des Frontends](https://github.com/reedu-reengineering-education/smart-city-dashboard),
[Quelltext des Backends](https://github.com/reedu-reengineering-education/smart-city-dashboard-backend).

Über Rückmeldungen und Anregungen freut sich das [Team der Stabsstelle Smart City](mailto:smartcity@stadt-muenster.de)!

Weitere Informationen finden Sie unter [https://smartcity.ms/dashboard](https://smartcity.ms/dashboard)

[Impressum](https://smartcity.ms/impressum/)

[Datenschutzerklärung](https://smartcity.ms/datenschutzerklaerung/)
        `}
        />
      </div>
    </React.Fragment>
  );
}

export default Info;
