import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import { SchemaProperty } from "../../app/types";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";

export default function AttributeRow({
  row,
  expandedRows,
  selectedIds,
  setSelectedRawId,
  onExpandClick,
  toggleSelection,
  level = 0,
}: {
  row: SchemaProperty;
  expandedRows: { [key: string]: boolean };
  selectedIds: string[];
  setSelectedRawId: React.Dispatch<React.SetStateAction<string>>;
  onExpandClick: (id: string) => void;
  toggleSelection: (id: string) => void;
  level?: number;
}) {
  return (
    <>
      <TableRow
        sx={{
          bgcolor: level > 0 ? `rgba(0, 0, 0, ${0.02 * level})` : "inherit",
        }}
      >
        <TableCell padding="checkbox">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ ml: level * 2 }}>
              <Checkbox size="small" onChange={() => {toggleSelection(row.id)
                setSelectedRawId(row.id)
              }} checked={selectedIds.includes(row.id)} />
            </Box>
            {row.properties && (
              <IconButton size="small" onClick={() => onExpandClick(row.id)}>
                {expandedRows[row.id] ? <IconArrowDown /> : <IconArrowUp />}
              </IconButton>
            )}
          </Box>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>
          <Checkbox size="small" checked={row.required} />
        </TableCell>
        <TableCell>{row.description}</TableCell>
      </TableRow>
      {row.properties && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={expandedRows[row.id]} timeout="auto" unmountOnExit>
              <Box>
                {row.properties.map((childRow) => (
                  <AttributeRow
                    key={childRow.id}
                    row={childRow}
                    expandedRows={expandedRows}
                    onExpandClick={onExpandClick}
                    level={level + 1}
                    toggleSelection={toggleSelection}
                    selectedIds={selectedIds}
                    setSelectedRawId={() => childRow.id}
                  />
                ))}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
