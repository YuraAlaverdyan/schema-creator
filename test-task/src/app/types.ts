
export type SchemaProperty = {
  id: number;
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
  required: boolean;
  properties: SchemaProperty[];
};