import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";


type SchemaDisplayProps = {
  schema: {
    name: string
    properties: Array<{ name: string; type: string }>
  }
}

export default function SchemaDisplay({ schema }: SchemaDisplayProps) {
  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold">Schema: {schema.name}</h3>

      <div className="border rounded-lg p-4">
        <h4 className="text-md font-semibold mb-2">As Table:</h4>
        <Table>
          <TableHead>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {schema.properties.map((prop, index) => (
              <TableRow key={index}>
                <TableCell>{prop.name}</TableCell>
                <TableCell>{prop.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="border rounded-lg p-4">
        <h4 className="text-md font-semibold mb-2">As Object:</h4>
        <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(schema, null, 2)}</pre>
      </div>
    </div>
  )
}

