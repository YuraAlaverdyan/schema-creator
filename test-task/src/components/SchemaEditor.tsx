"use client"

import { useState } from "react"
import SchemaForm from "./SchemaForm"
import SchemaList from "./SchemaList"
import { Button, Card, CardContent, CardHeader } from "@mui/material"

export type SchemaProperty = {
  name: string
  type: string
  properties?: SchemaProperty[]
}

export type Schema = {
  id: string
  name: string
  properties: SchemaProperty[]
}

export default function SchemaEditor() {
  const [schemas, setSchemas] = useState<Schema[]>([])
  const [isCreating, setIsCreating] = useState(false)

  const addNewSchema = () => {
    setIsCreating(true)
  }

  const addSchema = (newSchema: Schema) => {
    setSchemas((prev) => [...prev, newSchema])
    setIsCreating(false)
  }

  const deleteSchema = (id: string) => {
    setSchemas((prev) => prev.filter((schema) => schema.id !== id))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <p>Schema Editor</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isCreating && <Button onClick={addNewSchema}>Add New Schema</Button>}

        {isCreating && (
          <SchemaForm
            initialSchema={{ id: `new-${Date.now()}`, name: "", properties: [] }}
            onSubmit={addSchema}
            onCancel={() => setIsCreating(false)}
          />
        )}

        <SchemaList schemas={schemas} onDelete={deleteSchema} />
      </CardContent>
    </Card>
  )
}

