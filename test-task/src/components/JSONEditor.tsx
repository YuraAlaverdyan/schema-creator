import { Button } from '@mui/material';
import React, { useState } from 'react';
import JSONEditor from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { IJSON } from '../utils/types/schemaType';

interface IJsonEditor {
    generateTable: (data:IJSON) => void
}

export const JsonEditor: React.FC<IJsonEditor> = ({generateTable}) => {
  const [jsonData, setJsonData] = useState<IJSON>({
    name: "schema_name",
    version: "V1",
    attributes: [
        {
            developer: {
                type: "object",
                required: true,
                description: "description for developer",
                name: { type: "string", required: true, description: "Developer's name" },
                age: { type: "number", required: false, description: "Developer's age" },
                stack: { type: "boolean", required: false, description: "Developer's stack?" }
            },
            slogan: {
                type: "string",
                required: true,
                description: "Your slogan"
            }
        }
    ]
});

  const handleJsonChange = (newJson: any) => {
    setJsonData(newJson.jsObject); // Update state with new JSON data
  };

  return (
    <div>
      <h3>Edit JSON</h3>
      <JSONEditor
        placeholder={jsonData}
        onChange={handleJsonChange}
        locale={locale}
        height="400px"
      />
      <br />
      <Button variant='contained' onClick={() => generateTable(jsonData)}>
        Generate Table
      </Button>
      <Button onClick={() => navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))}>
        Copy Edited JSON
      </Button>
    </div>
  );
};

