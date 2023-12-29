import Typesense from 'typesense';
import { ConfigurationOptions } from 'typesense/lib/Typesense/Configuration';

const typesenseConfig: ConfigurationOptions = {
  nodes: [{
    host: process.env.NEXT_PUBLIC_TYPESENSE_HOST as string,
    port: Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT),
    protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL as string,
  }],
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_ADMIN_API_KEY as string,
  connectionTimeoutSeconds: 2,
};

export const typesense = new Typesense.Client(typesenseConfig);