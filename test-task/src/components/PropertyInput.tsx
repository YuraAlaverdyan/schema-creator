import { useState, useEffect, useRef } from "react";
import {
  Button,
  Checkbox,
  Input,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { IconPlus, IconX } from "@tabler/icons-react";
import { SchemaProperty } from "../app/types";

type PropertyInputProps = {
  existingProperties: SchemaProperty[];
  level?: number;
  onPropertiesChange: (properties: SchemaProperty[]) => void;
};

export default function PropertyInput({
  existingProperties,
  level = 0,
  onPropertiesChange,
}: PropertyInputProps) {
  const [properties, setProperties] = useState<SchemaProperty[]>([
    ...existingProperties,
    {
      name: "",
      type: "",
      required: false,
      id: Math.random().toString(),
      description: "",
    },
  ]);
  const lastValidProperties = useRef<SchemaProperty[]>([]);

  useEffect(() => {
    const validProperties = properties.filter((prop) => prop.name && prop.type);
    if (
      JSON.stringify(validProperties) !==
      JSON.stringify(lastValidProperties.current)
    ) {
      lastValidProperties.current = validProperties;
      onPropertiesChange(validProperties);
    }
  }, [properties, onPropertiesChange]);

  const handleFieldChange = ({
    index,
    field,
    value,
  }: {
    index: number;
    field: "name" | "description";
    value: string;
  }) => {
    const newProperties = [...properties];
    newProperties[index][field] = value;
    setProperties(newProperties);
  };

  const handleRequiredChange = (index: number) => {
    const newProperties = [...properties];
    newProperties[index].required = !newProperties[index].required;
    setProperties(newProperties);
  };

  const handleTypeChange = (index: number, type: string) => {
    const newProperties = [...properties];
    newProperties[index].type = type;
    if (type === "object") {
      newProperties[index].properties = [];
    } else {
      delete newProperties[index].properties;
    }
    setProperties(newProperties);
  };

  const handleAddField = () => {
    setProperties([
      ...properties,
      {
        name: "",
        type: "",
        required: false,
        id: Math.random().toString(),
        description: "",
      },
    ]);
  };

  const handleRemoveField = (index: number) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  const handleNestedPropertiesChange = (
    parentIndex: number,
    nestedProperties: SchemaProperty[]
  ) => {
    const newProperties = [...properties];
    newProperties[parentIndex].properties = nestedProperties;
    setProperties(newProperties);
  };

  return (
    <div className="space-y-4">
      {properties.map((property, index) => (
        <div key={index} className="space-y-2">
          <div className="flex space-x-2">
            <Input
              value={property.name}
              onChange={(e) =>
                handleFieldChange({
                  index,
                  field: "name",
                  value: e.target.value,
                })
              }
              placeholder="Property name"
              className="flex-grow"
            />
            <div className="flex g-5 items-center">
              <p>Required:</p>
              <Checkbox
                checked={property.required}
                onChange={() => handleRequiredChange(index)}
              />
            </div>
            <Select
              value={property.type}
              onChange={(e) => handleTypeChange(index, e.target.value)}
            >
              <MenuItem value="" disabled={true}>
                Choose type
              </MenuItem>
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="boolean">Boolean</MenuItem>
              <MenuItem value="object">Object</MenuItem>
            </Select>
            <TextareaAutosize
              value={property.description}
              onChange={(e) =>
                handleFieldChange({
                  index,
                  field: "description",
                  value: e.target.value,
                })
              }
              placeholder="Property description"
              className="flex-grow"
            />
            <Button variant="outlined" onClick={() => handleRemoveField(index)}>
              <IconX className="h-4 w-4" />
            </Button>
          </div>
          {property.type === "object" && (
            <div className="pl-4 border-l-2 border-gray-300">
              <PropertyInput
                existingProperties={properties}
                onPropertiesChange={(nestedProps) =>
                  handleNestedPropertiesChange(index, nestedProps)
                }
                level={level + 1}
              />
            </div>
          )}
        </div>
      ))}
      <Button variant="outlined" size="small" onClick={handleAddField}>
        <IconPlus className="h-4 w-4 mr-2" /> Add Field
      </Button>
    </div>
  );
}
