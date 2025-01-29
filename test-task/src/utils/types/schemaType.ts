export interface IProperty {
    name: string;
    type: string;
    required: boolean;
    id: string;
    description: string;
    properties?: IProperty[];
};

export interface IJSON {
    name: string;
    version: string;
    attributes: Record<string, any>[];
};

export interface ISubValue {
    type: string;
    required: boolean;
    description: string;
};