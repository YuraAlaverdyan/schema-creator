import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  IconCode,
  IconDragDrop,
  IconEdit,
  IconGrid3x3,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { SchemaProperty } from "../../app/types";
import AttributeRow from "./AttributeRow";

export default function AttributeTable({
  attributes,
  selectedIds,
  toggleSelection,
  addAttribute,
  handleClearAllAttribnutes,
  handleRemoveSelected
}: {
  attributes: SchemaProperty[];
  selectedIds: string[];
  toggleSelection: (id: string) => void;
  addAttribute: () => void;
  handleClearAllAttribnutes: () => void;
  handleRemoveSelected: () => void;
}) {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleExpandClick = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: 3 }}>
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
          "& .MuiIconButton-root": {
            color: "action.active",
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", marginRight: 2 }}
        >
          VIEW OPTIONS
        </Typography>
        <IconButton>
          <IconCode />
        </IconButton>
        <IconButton>
          <IconGrid3x3 />
        </IconButton>
        <Box
          sx={{ borderLeft: 1, borderColor: "divider", height: 24, mx: 2 }}
        />
        <Tooltip title="Remove selected properties">
          <IconButton onClick={handleRemoveSelected}>
            <IconTrash color="red" />
          </IconButton>
        </Tooltip>
        <IconButton>
          <IconEdit />
        </IconButton>
        <Box
          sx={{ borderLeft: 1, borderColor: "divider", height: 24, mx: 2 }}
        />
        <Button
          startIcon={<IconPlus />}
          variant="contained"
          sx={{ bgcolor: "#00b0ff", "&:hover": { bgcolor: "#0081cb" } }}
          onClick={addAttribute}
        >
          ADD ATTRIBUTE
        </Button>
        <Button
          variant="contained"
          onClick={handleClearAllAttribnutes}
          sx={{ bgcolor: "#ff9800", "&:hover": { bgcolor: "#f57c00" } }}
        >
          CLEAR ALL
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>ATTR. NAME</TableCell>
              <TableCell>ATTR. TYPE</TableCell>
              <TableCell>REQUIRED</TableCell>
              <TableCell>DESCRIPTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attributes.map((row) => (
              <AttributeRow
                key={row.id}
                row={row}
                expandedRows={expandedRows}
                onExpandClick={handleExpandClick}
                toggleSelection={toggleSelection}
                selectedIds={selectedIds}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Drag and Drop Hint */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 2,
          color: "text.secondary",
        }}
      >
        <IconDragDrop />
        <Typography variant="body2">
          Click and drag an attribute to re-order
        </Typography>
      </Box>
    </Box>
  );
}
