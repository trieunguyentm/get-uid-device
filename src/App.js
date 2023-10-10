import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

export default function App() {
  function createData(field, value) {
    return { field, value }
  }

  function getUID() {
    let uid = window.navigator.mimeTypes.length
    uid += window.navigator.userAgent.replace(/\D+/g, "")
    uid += window.navigator.plugins.length
    uid += window.screen.height || ""
    uid += window.screen.width || ""
    uid += window.screen.pixelDepth || ""
    uid += window.navigator.hardwareConcurrency || ""
    return uid
  }

  const rows = [
    createData("window.navigator (1)", JSON.stringify(window.navigator)),
    createData(
      "window.navigator.mimeTypes.length (2)",
      window.navigator.mimeTypes.length,
    ),
    createData(
      "window.navigator.plugins.length (3)",
      window.navigator.plugins.length,
    ),
    createData("window.navigator.userAgent (4)", window.navigator.userAgent),
    createData(
      "window.navigator.userAgent.replace(/D+/g, '') (5)",
      window.navigator.userAgent.replace(/\D+/g, ""),
    ),
    createData("window.screen.height (6)", window.screen.height),
    createData("window.screen.width (7)", window.screen.width),
    createData("window.screen.pixelDepth (8)", window.screen.pixelDepth),
    createData(
      "window.navigator.hardwareConcurrency (9)",
      window.navigator.hardwareConcurrency
    ),
  ]

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }}>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.field}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.field}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        className="uid"
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "20px",
          fontWeight: "bold",
        }}
      >
        UID: {getUID()}
      </div>
      <div
        className="uid"
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        (2) + (5) + (3) + (6) + (7) + (8) + (9)
      </div>
    </>
  )
}
