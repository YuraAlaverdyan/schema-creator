import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Schema, SchemaProperty } from "../app/types";
import AttributeTable from "./Attributes/AttributeEditor";
import PropertyInput from "./PropertyInput";
import { Modal } from "./Modal";
import { useAppDispatch } from "../app/store";
import SchemaList from "./SchemaList";
import { JsonEditor } from "./JSONEditor";
import { objectToSchema } from "../utils/schema/schemaGenerators";
import { IJSON } from "../utils/types/schemaType";

type SchemaFormProps = {
  initialSchema: Schema;
  onSubmit: (schema: Schema) => void;
};

export default function SchemaForm({
  initialSchema,
  onSubmit,
}: SchemaFormProps) {
  const [schema, setSchema] = useState<Schema>(
    JSON.parse(JSON.stringify(initialSchema))
  );
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [schemaAttributes, setSchemaAttributes] = useState<SchemaProperty[]>(
    []
  );
  const [isOpenJsonEditor, setIsOpenJsonEditor] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSchemaNameChange = (key: string, value: string) => {
    setSchema((prev) => ({ ...prev, [key]: value }));
  };

  const handlePropertiesChange = (properties: SchemaProperty[]) => {
    setSchemaAttributes((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(properties)) {
        return [...schema.properties, ...properties];
      }
      return prev;
    });
  };

  const handleClearAllAttribnutes = () => {
    setSchema((prev) => ({ ...prev, properties: [] }));
    setSelectedIds([]);
  };

  const removeSelectedProperties = (
    properties: SchemaProperty[]
  ): SchemaProperty[] => {
    return properties
      .filter((property) => !selectedIds.includes(property.id))
      .map((property) => ({
        ...property,
        properties: property.properties
          ? removeSelectedProperties(property.properties)
          : [],
      }));
  };

  const findPropertyById = (
    properties: SchemaProperty[],
    id: string
  ): SchemaProperty | null => {
    for (const property of properties) {
      if (property.id === id) {
        return property;
      }
      if (property.properties) {
        const found = findPropertyById(property.properties, id);
        if (found) return found;
      }
    }
    return null;
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

  const generateTable = (data: IJSON) => {
    setIsOpenJsonEditor(false);
    const generatedData = objectToSchema(data);
    setSchema(generatedData);
  };

  const onSave = () => {
    if (isEditing) {
      schemaAttributes.shift();
    }
    setSchema((prev) => ({ ...prev, properties: schemaAttributes }));
    setIsOpenModal(false);
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
      <Typography variant="h5" gutterBottom>
        Create New Schema
      </Typography>
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

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          ATTRIBUTES
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Use the editor to create the attributes that would represent
          credential claims reflected by this schema
        </Typography>
      </Box>
      <AttributeTable
        attributes={schema.properties}
        addAttribute={(isEdit) => {
          setIsEditing(isEdit);
          setIsOpenModal(true);
        }}
        handleClearAllAttribnutes={handleClearAllAttribnutes}
        selectedIds={selectedIds}
        toggleSelection={toggleSelection}
        handleRemoveSelected={handleRemoveSelected}
        setIsOpenJsonEditor={setIsOpenJsonEditor}
      />
      <Modal
        open={isOpenJsonEditor}
        onClose={() => setIsOpenJsonEditor(false)}
        children={<JsonEditor generateTable={generateTable} />}
      />
      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        children={
          <Paper
            elevation={1}
            sx={{
              p: 3,
              bgcolor: "#ffffff",
              maxHeight: "80vh",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <PropertyInput
              onPropertiesChange={handlePropertiesChange}
              existingProperties={
                isEditing
                  ? [
                      findPropertyById(schema.properties, selectedIds?.[0]) ||
                        ({} as SchemaProperty),
                    ]
                  : schema.properties
              }
              isEditing={isEditing}
              setSchemaAttributes={setSchemaAttributes}
            />
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="outlined" onClick={() => setIsOpenModal(false)}>
                Close
              </Button>
              <Button variant="contained" onClick={() => onSave()}>
                Save
              </Button>
            </Box>
          </Paper>
        }
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={() => onSubmit(schema)}>Save schema</Button>
      </Box>
      <SchemaList schemas={[schema]} title="Schema preview" />
    </Box>
  );
}
