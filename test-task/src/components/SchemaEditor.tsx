import { useState } from "react";
import SchemaForm from "./SchemaForm";
import SchemaList from "./SchemaList";
import { Box, Button, CardContent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/store";
import { addSchemaToSchemaList } from "../app/features/scheme";
import { Schema } from "../app/types";

export default function SchemaEditor() {
  const [isCreating, setIsCreating] = useState(false);

  const { schemas } = useAppSelector((state) => state.scheme);
  const dispatch = useAppDispatch();

  const addNewSchema = () => {
    setIsCreating(true);
  };

  const addSchema = (newSchema: Schema) => {
    dispatch(addSchemaToSchemaList(newSchema));
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
          />
        )}

        <SchemaList schemas={schemas} />
      </CardContent>
    </Box>
  );
}
