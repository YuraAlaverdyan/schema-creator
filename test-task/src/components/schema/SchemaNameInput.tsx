import { Box, FormLabel, Input } from "@mui/material"

type SchemaNameInputProps = {
  value: string
  onChange: (value: string) => void
}

export default function SchemaNameInput({ value, onChange }: SchemaNameInputProps) {
  return (
    <Box>
      <FormLabel htmlFor="schema-name">Schema Name</FormLabel>
      <Input
        id="schema-name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter schema name"
      />
    </Box>
  )
}

