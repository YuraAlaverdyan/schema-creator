import { ReactNode } from "react";

import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { Schema, SchemaProperty } from "../app/types";
import { schemaToObject } from "../utils/schema/schemaGenerators";

type SchemaListProps = {
  schemas: Schema[];
  title: string;
};

export default function SchemaList({ schemas, title }: SchemaListProps) {
  if (!schemas.length) {
    return <p>No schemas created yet.</p>;
  }

  const renderPropertyRow = (prop: SchemaProperty, level = 0): ReactNode => (
    <>
      <TableRow key={prop.id + Math.random() * 1000000}>
        <TableCell
          className="font-medium"
          style={{ paddingLeft: `${level * 1.5}rem` }}
        >
          {prop.name}
        </TableCell>
        <TableCell>{prop.type}</TableCell>
        <TableCell>{prop.required.toString()}</TableCell>
      </TableRow>
      {prop.type === "object" &&
        prop.properties &&
        prop.properties.map((nestedProp) =>
          renderPropertyRow(nestedProp, level + 1)
        )}
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        textAlign: "start",
      }}
    >
      <Typography variant="h4">{title}</Typography>
      {schemas.map((schema) => (
        <Box
          key={schema.id}
          sx={{
            p: 3,
            border: "1px solid black",
            borderRadius: "16px",
          }}
        >
          <pre className="bg-muted p-2 rounded-md overflow-x-auto">
            {JSON.stringify(schemaToObject(schema), null, 2)}
          </pre>
        </Box>
      ))}
    </Box>
  );
}
