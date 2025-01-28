import { useState } from "react";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { Schema, SchemaProperty } from "../app/types";
import AttributeTable from "./Attributes/AttributeEditor";
import PropertyInput from "./PropertyInput";
import { Modal } from "./modal";

type SchemaFormProps = {
  initialSchema: Schema;
  onSubmit: (schema: Schema) => void;
  onCancel: () => void;
};

export default function SchemaForm({
  initialSchema,
  onSubmit,
}: SchemaFormProps) {
  const [schema, setSchema] = useState<Schema>(initialSchema);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRawId,setSelectedRawId] = useState<string>('')

  const handleSchemaNameChange = (key: string, value: string) => {
    setSchema((prev) => ({ ...prev, [key]: value }));
  };

  const handlePropertiesChange = (properties: SchemaProperty[]) => {
    setSchema((prev) => {
      if (JSON.stringify(prev.properties) !== JSON.stringify(properties)) {
        return { ...prev, properties };
      }
      return prev;
    });
  };
  console.log(schema,'schemaschemaschema');
  
  const handleSubmit = () => {
    onSubmit({
      ...schema,
      id: schema.id.startsWith("new-") ? Date.now().toString() : schema.id,
    });
  };

  const handleClearAllAttribnutes = () => {
    setSchema((prev) => ({ ...prev, properties: [] }));
  };

  const removeSelectedProperties = (properties: SchemaProperty[]): SchemaProperty[] => {
    return properties
      .filter((property) => !selectedIds.includes(property.id))
      .map((property) => ({
        ...property,
        properties: property.properties ? removeSelectedProperties(property.properties) : [],
      }));
  };

  const handleRemoveSelected = () => {
    const updatedProperties = removeSelectedProperties(schema.properties);
    setSchema((prev) => ({ ...prev, properties: updatedProperties }));
    setSelectedIds([]);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const renderProperty = (prop: SchemaProperty, level = 0) => (
    <div key={prop.name} className={`space-y-2 ${level > 0 ? "ml-4" : ""}`}>
      <div className="flex justify-between items-center bg-muted p-2 rounded-md">
        <span>
          {prop.name}: {prop.type}
        </span>
      </div>
      {prop.type === "object" && prop.properties && (
        <div className="pl-4 border-l-2 border-gray-300">
          {prop.properties.map((nestedProp) =>
            renderProperty(nestedProp, level + 1)
          )}
        </div>
      )}
    </div>
  );

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          id="schema-name"
          name="schemaName"
          label="SCHEMA NAME"
          value={schema.name}
          onChange={(e) => handleSchemaNameChange("name", e.target.value)}
          sx={{ bgcolor: "grey.50" }}
          placeholder="Enter a Schema name"
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          id="version"
          name="version"
          label="VERSION"
          value={schema.version}
          onChange={(e) => handleSchemaNameChange("version", e.target.value)}
          sx={{ bgcolor: "grey.50" }}
          placeholder="Enter a Version"
        />
      </Box>
      {/* {schema.properties.length > 0 && (
        <div className="space-y-2">
          <FormLabel>Properties</FormLabel>
          {schema.properties.map((prop) => renderProperty(prop))}
        </div>
      )} */}

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          ATTRIBUTES
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Use the editor to create the attributes that would represent
          credential claims reflected by this schema
        </Typography>
      </Box>
      {schema.properties.length > 0 && (
        <div className="space-y-2">
          <FormLabel>Properties</FormLabel>
          {schema.properties.map((prop) => renderProperty(prop))}
        </div>
      )}
      <AttributeTable
        attributes={selectedRawId && isOpenModal ? [] :schema.properties}
        addAttribute={() => setIsOpenModal(true)}
        handleClearAllAttribnutes={handleClearAllAttribnutes}
        selectedIds={selectedIds}
        toggleSelection={toggleSelection}
        handleRemoveSelected={handleRemoveSelected}
        setSelectedRawId={setSelectedRawId}
      />
      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        children={
          <>
            <PropertyInput onPropertiesChange={handlePropertiesChange} />
            <div className="flex justify-end space-x-2">
              <Button variant="outlined" onClick={() => setIsOpenModal(false)}>
                Close
              </Button>
            </div>
          </>
        }
      />
    </Box>
  );
}
