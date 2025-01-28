import { useState } from "react"
import PropertyInput from "./PropertyInput"
import type { Schema, SchemaProperty } from "./SchemaEditor"
import { Button, FormLabel, Input } from "@mui/material"

type SchemaFormProps = {
  initialSchema: Schema
  onSubmit: (schema: Schema) => void
  onCancel: () => void
}

export default function SchemaForm({ initialSchema, onSubmit, onCancel }: SchemaFormProps) {
  const [schema, setSchema] = useState<Schema>(initialSchema)

  const handleSchemaNameChange = (name: string) => {
    setSchema((prev) => ({ ...prev, name }))
  }

  const handlePropertiesChange = (properties: SchemaProperty[]) => {
    setSchema((prev) => {
      if (JSON.stringify(prev.properties) !== JSON.stringify(properties)) {
        return { ...prev, properties }
      }
      return prev
    })
  }

  const handleSubmit = () => {
    onSubmit({
      ...schema,
      id: schema.id.startsWith("new-") ? Date.now().toString() : schema.id,
    })
  }

  const renderProperty = (prop: SchemaProperty, level = 0) => (
    <div key={prop.name} className={`space-y-2 ${level > 0 ? "ml-4" : ""}`}>
      <div className="flex justify-between items-center bg-muted p-2 rounded-md">
        <span>
          {prop.name}: {prop.type}
        </span>
      </div>
      {prop.type === "object" && prop.properties && (
        <div className="pl-4 border-l-2 border-gray-300">
          {prop.properties.map((nestedProp) => renderProperty(nestedProp, level + 1))}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-4 border p-4 rounded-md">
      <div className="space-y-2">
        <FormLabel htmlFor={`schema-name-${schema.id}`}>Schema Name</FormLabel>
        <Input
          id={`schema-name-${schema.id}`}
          value={schema.name}
          onChange={(e) => handleSchemaNameChange(e.target.value)}
          placeholder="Enter schema name"
        />
      </div>
      <PropertyInput onPropertiesChange={handlePropertiesChange} />
      {schema.properties.length > 0 && (
        <div className="space-y-2">
          <FormLabel>Properties</FormLabel>
          {schema.properties.map((prop) => renderProperty(prop))}
        </div>
      )}
      <div className="flex justify-end space-x-2">
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save Schema</Button>
      </div>
    </div>
  )
}

