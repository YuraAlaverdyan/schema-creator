import { useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Typography, Tooltip } from "@mui/material";
import { IconCode, IconDragDrop, IconEdit, IconGrid3x3, IconPlus, IconTrash } from "@tabler/icons-react";
import { SchemaProperty } from "../../app/types";
import AttributeRow from "./AttributeRow";

export default function AttributeTable({
    attributes,
    selectedIds,
    addAttribute,
    toggleSelection,
    handleClearAllAttribnutes,
    handleRemoveSelected,
    setIsOpenJsonEditor,
}: {
    attributes: SchemaProperty[];
    selectedIds: string[];
    addAttribute: (isEdit: boolean) => void;
    toggleSelection: (id: string) => void;
    handleRemoveSelected: () => void;
    handleClearAllAttribnutes: () => void;
    setIsOpenJsonEditor: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});
    console.log('++++++++++++++++++')

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
                <Typography variant="body2" sx={{ color: "text.secondary", marginRight: 2 }}>
                    VIEW OPTIONS
                </Typography>
                <IconButton onClick={() => setIsOpenJsonEditor(true)}>
                    <IconCode />
                </IconButton>
                <IconButton>
                    <IconGrid3x3 />
                </IconButton>
                <Box sx={{ borderLeft: 1, borderColor: "divider", height: 24, mx: 2 }} />
                <Tooltip title="Remove selected properties">
                    <IconButton onClick={handleRemoveSelected}>
                        <IconTrash color="red" />
                    </IconButton>
                </Tooltip>
                <IconButton disabled={selectedIds.length !== 1} onClick={() => addAttribute(true)}>
                    <IconEdit />
                </IconButton>
                <Box sx={{ borderLeft: 1, borderColor: "divider", height: 24, mx: 2 }} />
                <Button startIcon={<IconPlus />} variant="contained" sx={{ bgcolor: "#00b0ff", "&:hover": { bgcolor: "#0081cb" } }} onClick={() => addAttribute(false)}>
                    ADD ATTRIBUTE
                </Button>
                <Button variant="contained" onClick={handleClearAllAttribnutes} sx={{ bgcolor: "#ff9800", "&:hover": { bgcolor: "#f57c00" } }}>
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
                        {attributes.length > 0 && attributes.map((row) => (
                            <AttributeRow key={row.id} row={row} expandedRows={expandedRows} onExpandClick={handleExpandClick} toggleSelection={toggleSelection} selectedIds={selectedIds} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
