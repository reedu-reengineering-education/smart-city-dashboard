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
