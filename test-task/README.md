# Schema Creator Web App

Schema Creator is a powerful web application that allows users to create, manage, and export custom schemas. With an intuitive interface, you can easily define complex data structures, add and remove attributes, and generate JSON output that conforms to your schema definitions.

## Features

- Create and manage multiple schemas
- Add, edit, and remove schema properties
- Support for nested properties
- Real-time JSON preview
- Export schemas to JSON format
- Version control for schemas

## Usage

1. **Creating a New Schema**
   - Click on the "Add new schema" button
   - Enter a name and version for your schema

2. **Adding Properties**
   - In the schema editor, click "Add Property"
   - Fill in the property details (name, type, description, etc.)
   - Set the "required" flag if the property is mandatory
   - For nested properties, you can add sub-properties by clicking "Add field"

3. **Removing Properties**
   - Select attributes from the table and click the "Remove" button in the toolbar to delete them.

4. **Editing Properties**
   - Select an attribute from the table, then click the edit icon in the toolbar to open its edit form. ( You can select only one property to edit )
   - Modify the property details as needed
   - Click "Save" to apply the changes

5. **Generating JSON**
   - As you build your schema, the JSON preview will update in real-time
   - You can copy the JSON output or export it to a file

## Schema Structure

The Schema Creator uses the following TypeScript types to define the structure of schemas and their properties:

```typescript
export type ISchemaProperty = {
  id: string;
  name: string;
  type: string;
  required: boolean;
  properties?: ISchemaProperty[];
  description: string;
};

export type Schema = {
  id: string;
  name: string;
  version: string;
  properties: ISchemaProperty[];
};
```

- Each schema has a unique `id`, `name`, `version`, and an array of `properties`.
- Properties have an `id`, `name`, `type`, `required` flag, optional nested `properties`, and a `description`.
- Nested properties allow for creating complex, hierarchical schemas.