import { useState } from "react";
import SchemaForm from "./SchemaForm";
import SchemaList from "./SchemaList";
import { Box, Button, CardContent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/store";
import { addSchemaToSchemaList } from "../app/features/scheme";
import { Schema } from "../app/types";

export default function SchemaEditor() {
  const [initialSchema, setInitialSchema] = useState<Schema>({
    id: `new-${Date.now()}`,
    name: "",
    version: "",
    properties: [],
  });
  const [isCreating, setIsCreating] = useState(false);

  const { schemas } = useAppSelector((state) => state.scheme);
  const dispatch = useAppDispatch();

  const addNewSchema = () => {
    setIsCreating(true);
  };

  const addSchema = (newSchema: Schema) => {
    dispatch(addSchemaToSchemaList(newSchema));
    setInitialSchema({
      id: `new-${Date.now()}`,
      name: "",
      version: "",
      properties: [],
    });
    setIsCreating(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 3,
      }}
    >
      <CardContent className="space-y-6">
        {!isCreating && <Button onClick={addNewSchema}>Add New Schema</Button>}

        {isCreating && (
          <SchemaForm initialSchema={initialSchema} onSubmit={addSchema} />
        )}

        <Box
          sx={{
            marginTop: "25px",
          }}
        >
          <SchemaList schemas={schemas} title="Schema list" />
        </Box>
      </CardContent>
    </Box>
  );
}
