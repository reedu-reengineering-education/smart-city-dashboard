interface ServiceState {
  data: any;
  metadata: Metadata;
}

interface Metadata {
  title: string;
  updatedAt: Date | undefined;
  online: boolean;
  error: Error | undefined;
}

declare module 'react-leaflet-markercluster' {
  import { Component } from 'react';
  export default class MarkerClusterGroup extends Component<MarkerClusterGroupProps> {}
}
