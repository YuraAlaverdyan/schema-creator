import { ReactNode } from "react";

import { Box, TableCell, TableRow } from "@mui/material";
import { Schema, SchemaProperty } from "../app/types";
import { schemaToObject } from "../utils/schema/schemaGenerators";

type SchemaListProps = {
  schemas: Schema[];
};

export default function SchemaList({ schemas }: SchemaListProps) {
  if (!schemas.length) {
    return <p>No schemas created yet.</p>;
  }

  const renderPropertyRow = (prop: SchemaProperty, level = 0): ReactNode => (
    <>
      <TableRow key={prop.name}>
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
    <div className="space-y-6">
      {schemas.map((schema) => (
        <div key={schema.id} className="border rounded-md">
          <div className="p-4 space-y-4">
            <div>
              <pre className="bg-muted p-2 rounded-md overflow-x-auto">
                {JSON.stringify(schemaToObject(schema), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
