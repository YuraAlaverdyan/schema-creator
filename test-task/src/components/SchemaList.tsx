import { ReactNode } from "react";

import { Box, TableCell, TableRow } from "@mui/material";
import { Schema, SchemaProperty } from "../app/types";

type SchemaListProps = {
  schemas: Schema[];
};

export default function SchemaList({ schemas }: SchemaListProps) {
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
      }}
    >
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

function schemaToObject(schema: Schema): Record<string, any> {
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
