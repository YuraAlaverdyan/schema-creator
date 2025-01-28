
export type SchemaProperty = {
  id: string;
  name: string;
  type: string;
  required: boolean;
  properties?: SchemaProperty[];
  description: string;
};

export type Schema = {
  id: string;
  name: string;
  version: string;
  properties: SchemaProperty[];
};