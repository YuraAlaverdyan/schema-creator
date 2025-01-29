
export interface ISchemaProperty {
  id: string;
  name: string;
  type: string;
  required: boolean;
  properties?: ISchemaProperty[];
  description: string;
};

export interface ISchema {
  id: string;
  name: string;
  version: string;
  properties: ISchemaProperty[];
};