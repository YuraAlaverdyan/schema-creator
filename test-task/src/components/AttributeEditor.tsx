"use client"

import { useState } from "react"
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
  Checkbox,
  Collapse,
  Typography,
  Tooltip,
} from "@mui/material"
import { IconArrowDown, IconCode, IconDownload, IconDragDrop, IconEdit, IconGrid3x3, IconPlus, IconRowRemove } from "@tabler/icons-react"
import { SchemaProperty } from "../app/types"

interface AttributeData {
  id: string
  name: string
  type: string
  required: boolean
  description: string
  children?: AttributeData[]
  isExpanded?: boolean
}

const initialData: AttributeData[] = [
  {
    id: "1",
    name: "birth_date",
    type: "datetime",
    required: true,
    description: "Date of birth",
  },
  {
    id: "2",
    name: "national_id",
    type: "text",
    required: true,
    description: "National ID number",
  },
  {
    id: "3",
    name: "medical_meta",
    type: "object",
    required: true,
    description: "Medical file claims",
    children: [
      {
        id: "3.1",
        name: "file_no",
        type: "text",
        required: true,
        description: "Medical file number",
      },
      {
        id: "3.2",
        name: "phr",
        type: "text",
        required: true,
        description: "Registered Personal health record",
      },
      {
        id: "3.3",
        name: "coverage",
        type: "text",
        required: false,
        description: "National citizen Health coverage",
      },
    ],
  },
]

export default function AttributeTable({attributes}: {attributes: SchemaProperty[]}) {
  const [data, setData] = useState<AttributeData[]>(initialData)
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({
    "3": true, // medical_meta expanded by default
  })

  const handleExpandClick = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleClearAll = () => {
    setData([])
  }

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
        <IconButton>
          <IconCode />
        </IconButton>
        <IconButton>
          <IconGrid3x3 />
        </IconButton>
        <Box sx={{ borderLeft: 1, borderColor: "divider", height: 24, mx: 2 }} />
        <IconButton>
          <IconRowRemove />
        </IconButton>
        <IconButton>
          <IconEdit />
        </IconButton>
        <Box sx={{ borderLeft: 1, borderColor: "divider", height: 24, mx: 2 }} />
        <Button
          startIcon={<IconPlus />}
          variant="contained"
          sx={{ bgcolor: "#00b0ff", "&:hover": { bgcolor: "#0081cb" } }}
        >
          ADD ATTRIBUTE
        </Button>
        <Button
          variant="contained"
          onClick={handleClearAll}
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
              <>
                <TableRow key={row.name}>
                  <TableCell padding="checkbox">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Checkbox />
                      {row.properties && (
                        <IconButton size="small" onClick={() => handleExpandClick(row.name)}>
                          <IconArrowDown />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <Checkbox checked={true} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
                {row.properties && (
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={expandedRows[row.name]} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Table size="small">
                            <TableBody>
                              {row.properties.map((childRow) => (
                                <TableRow key={childRow.name} sx={{ bgcolor: "#f5f5f5" }}>
                                  <TableCell padding="checkbox">
                                    <Checkbox />
                                  </TableCell>
                                  <TableCell>{childRow.name}</TableCell>
                                  <TableCell>{childRow.type}</TableCell>
                                  <TableCell>
                                    <Checkbox checked={true} />
                                  </TableCell>
                                  <TableCell>{childRow.name}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </>
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
        <Typography variant="body2">Click and drag an attribute to re-order</Typography>
      </Box>
    </Box>
  )
}

