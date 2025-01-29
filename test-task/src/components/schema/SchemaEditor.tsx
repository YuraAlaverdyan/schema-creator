import { useState } from "react";
import { Box, Button, CardContent } from "@mui/material";
import { useAppDispatch } from "../../store";
import { ISchema } from "../../store/types";
import { addSchemaToSchemaList } from "../../store/features/scheme";
import SchemaForm from "./SchemaForm";

export default function SchemaEditor() {
  const [initialSchema, setInitialSchema] = useState<ISchema>({
    id: `new-${Date.now()}`,
    name: "",
    version: "",
    properties: [],
  });
  const [isCreating, setIsCreating] = useState(false);

  const dispatch = useAppDispatch();

  const addNewSchema = () => {
    setIsCreating(true);
  };

  const addSchema = (newSchema: ISchema) => {
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
      </CardContent>
    </Box>
  );
}
