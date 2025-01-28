"use client";

import { useState } from "react";
import SchemaForm from "./SchemaForm";
import SchemaList from "./SchemaList";
import { Box, Button, CardContent, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/store";
import { addSchemaToList, deleteSchemaFromList } from "../app/features/scheme";
import { Schema } from "../app/types";

export default function SchemaEditor() {
  const [isCreating, setIsCreating] = useState(false);

  const { schemas } = useAppSelector((state) => state.scheme);
  const dispatch = useAppDispatch();

  const addNewSchema = () => {
    setIsCreating(true);
  };

  const addSchema = (newSchema: Schema) => {
    dispatch(addSchemaToList(newSchema));
    setIsCreating(false);
  };

  const deleteSchema = (id: string) => {
    dispatch(deleteSchemaFromList(id));
  };

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        p: 3,
        textAlign: "start",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Create new Schema
      </Typography>
      <CardContent className="space-y-6">
        {!isCreating && <Button onClick={addNewSchema}>Add New Schema</Button>}

        {isCreating && (
          <SchemaForm
            initialSchema={{
              id: `new-${Date.now()}`,
              name: "",
              version: "",
              properties: [],
            }}
            onSubmit={addSchema}
            onCancel={() => setIsCreating(false)}
          />
        )}

        <SchemaList schemas={schemas} onDelete={deleteSchema} />
      </CardContent>
    </Box>
  );
}
