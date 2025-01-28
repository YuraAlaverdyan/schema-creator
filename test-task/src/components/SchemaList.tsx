import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { ReactNode } from "react"
import { Schema, SchemaProperty } from "../app/types"

type SchemaListProps = {
  schemas: Schema[]
  onDelete: (id: string) => void
}

export default function SchemaList({ schemas, onDelete }: SchemaListProps) {
  if (schemas.length === 0) {
    return <p>No schemas created yet.</p>
  }

  const renderPropertyRow = (prop: SchemaProperty, level = 0): ReactNode => (
    <>
      <TableRow key={prop.name}>
        <TableCell className="font-medium" style={{ paddingLeft: `${level * 1.5}rem` }}>
          {prop.name}
        </TableCell>
        <TableCell>{prop.type}</TableCell>
      </TableRow>
      {prop.type === "object" &&
        prop.properties &&
        prop.properties.map((nestedProp) => renderPropertyRow(nestedProp, level + 1))}
    </>
  )

  return (
    <div className="space-y-6">
      {schemas.map((schema) => (
        <div key={schema.id} className="border rounded-md">
          <div className="flex items-center justify-between p-4 bg-muted">
            <h3 className="text-lg font-semibold">{schema.name}</h3>
            <Button variant="contained" size="small" onClick={() => onDelete(schema.id)}>
              Delete
            </Button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-md font-semibold mb-2">As Table:</h4>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHead>
                <TableBody>{schema.properties.map((prop) => renderPropertyRow(prop))}</TableBody>
              </Table>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-2">As Object:</h4>
              <pre className="bg-muted p-2 rounded-md overflow-x-auto">
                {JSON.stringify(schemaToObject(schema), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function schemaToObject(schema: Omit<Schema, 'version'>): Record<string, any> {
  const obj: Record<string, any> = {}
  schema.properties.forEach((prop) => {
    if (prop.type === "object" && prop.properties) {
      obj[prop.name] = prop.properties.reduce(
        (nestedObj, nestedProp) => {
          if (nestedProp.type === "object" && nestedProp.properties) {
            nestedObj[nestedProp.name] = schemaToObject({ id: "", name: "", properties: nestedProp.properties })
          } else {
            nestedObj[nestedProp.name] = nestedProp.type
          }
          return nestedObj
        },
        {} as Record<string, any>,
      )
    } else {
      obj[prop.name] = prop.type
    }
  })
  return schema.name ? { [schema.name]: obj } : obj
}

