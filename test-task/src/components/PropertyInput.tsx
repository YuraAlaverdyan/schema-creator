import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { IconPlus, IconX } from "@tabler/icons-react";
import { ISchemaProperty } from "../store/types";

type PropertyInputProps = {
  level?: number;
  isEditing?: boolean;
  existingProperties: ISchemaProperty[];
  setSchemaAttributes: React.Dispatch<React.SetStateAction<ISchemaProperty[]>>;
  onPropertiesChange: (properties: ISchemaProperty[]) => void;
};

export default function PropertyInput({
  level = 0,
  existingProperties,
  setSchemaAttributes,
  isEditing = false,
  onPropertiesChange,
}: PropertyInputProps) {
  const [properties, setProperties] = useState<ISchemaProperty[]>([]);
  const lastValidProperties = useRef<ISchemaProperty[]>([]);

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

  useEffect(() => {
    if (isEditing) {
      setProperties(existingProperties);
      return;
    }
    setProperties([
      {
        name: "",
        type: "",
        required: false,
        id: Math.random().toString(),
        description: "",
      },
    ]);
  }, [isEditing]);

  const handleFieldChange = ({
    index,
    field,
    value,
  }: {
    index: number;
    field: "name" | "description";
    value: string;
  }) => {
    const newProperties = JSON.parse(JSON.stringify(properties));
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
    nestedProperties: ISchemaProperty[]
  ) => {
    const newProperties = [...properties];
    newProperties[parentIndex].properties = nestedProperties;
    setProperties(newProperties);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {properties.map((property, index) => (
        <Paper
          key={property.id}
          elevation={2}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              width: "max-content",
              position: "absolute",
              right: "15px",
              top: "15px",
            }}
            onClick={() => handleRemoveField(index)}
          >
            <IconX className="h-4 w-4" />
          </IconButton>
          <Box>
            <Typography
              component="label"
              htmlFor="name"
              sx={{
                display: "block",
                mb: 1,
                color: "text.secondary",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              NAME
            </Typography>
            <TextField
              id="name"
              fullWidth
              size="small"
              placeholder="Attribute name"
              value={property.name}
              onChange={(e) =>
                handleFieldChange({
                  index,
                  field: "name",
                  value: e.target.value,
                })
              }
            />
          </Box>
          <Box>
            <Typography
              component="label"
              htmlFor="type"
              sx={{
                display: "block",
                mb: 1,
                color: "text.secondary",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              TYPE
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                id="type"
                value={property.type}
                onChange={(e) => handleTypeChange(index, e.target.value)}
                displayEmpty
              >
                <MenuItem disabled value="">
                  <em>Select data type</em>
                </MenuItem>
                <MenuItem value="string">String</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="boolean">Boolean</MenuItem>
                <MenuItem value="object">Object</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={property.required}
                  onChange={() => handleRequiredChange(index)}
                  sx={{ ml: -1 }}
                />
              }
              label={
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  REQUIRED?
                </Typography>
              }
            />
            <Typography
              variant="caption"
              sx={{
                display: "block",
                ml: 4,
                mt: -1,
                color: "text.secondary",
              }}
            >
              Is this attribute mandatory? defaults to Yes
            </Typography>
          </Box>
          <Box>
            <Typography
              component="label"
              htmlFor="description"
              sx={{
                display: "block",
                mb: 1,
                color: "text.secondary",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              DESCRIPTION
            </Typography>
            <TextField
              id="description"
              fullWidth
              multiline
              rows={4}
              placeholder="Describe this attribute"
              value={property.description}
              onChange={(e) =>
                handleFieldChange({
                  index,
                  field: "description",
                  value: e.target.value,
                })
              }
            />
          </Box>
          {property.type === "object" && (
            <div className="pl-4 border-l-2 border-gray-300">
              <PropertyInput
                setSchemaAttributes={setSchemaAttributes}
                onPropertiesChange={(nestedProps) =>
                  handleNestedPropertiesChange(index, nestedProps)
                }
                existingProperties={[]}
                level={level + 1}
              />
            </div>
          )}
        </Paper>
      ))}

      {!isEditing && (
        <Button variant="outlined" size="small" onClick={handleAddField}>
          <IconPlus className="h-4 w-4 mr-2" /> Add Field
        </Button>
      )}
    </Box>
  );
}
