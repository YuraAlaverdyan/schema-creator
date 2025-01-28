
export type SchemaProperty = {
  name: string;
  type: string;
  properties?: SchemaProperty[];
};

export type Schema = {
  id: string;
  name: string;
  properties: SchemaProperty[];
  version: string;
};