import { ISchema } from "../../store/types";
import { IJSON, IProperty, ISubValue } from "../types/schemaType";

const generateId = (): string => {
    return Math.random().toString(36).substring(2, 15);
}

export const objectToSchema = (data:IJSON):ISchema  => {
    return {
        id: `new-${Date.now()}`,
        name: data.name,
        version: data.version,
        properties: Object.entries(data.attributes[0]).map(([key, value]) => {
            let property: IProperty = {
                name: key,
                type: value.type,
                required: value.required,
                id: generateId(),
                description: value.description
            };

            if (value.type === "object") {
                property.properties = Object.entries(value)
                    .filter(([subKey]) => !["type", "required", "description"].includes(subKey))
                    .map(([subKey, subValue]) => {
                        const subVal = subValue as ISubValue;
                        return {
                            name: subKey,
                            type: subVal.type,
                            required: subVal.required,
                            id: generateId(),
                            description: subVal.description
                        };
                    });
            }

            return property;
        })
    };
}

export const schemaToObject = (schema: ISchema): Record<string, any> => {
    const obj: Record<string, any> = {};

    schema.properties.forEach((prop) => {
        if (prop.type === "object" && prop.properties) {
            const nestedObj = prop.properties.reduce((nestedObj, nestedProp) => {
                nestedObj[nestedProp.name] = {
                    type: nestedProp.type,
                    required: nestedProp.required,
                    description: nestedProp.description,
                };
                return nestedObj;
            }, {} as Record<string, any>);

            obj[prop.name] = {
                type: prop.type,
                required: prop.required,
                description: prop.description,
                ...nestedObj,
            };
        } else {
            obj[prop.name] = {
                type: prop.type,
                required: prop.required,
                description: prop.description,
            };
        }
    });
    
    const result = { 
      name: schema.name,
      version: schema.version,
      attributes: [obj],
    };

    return result;
}
