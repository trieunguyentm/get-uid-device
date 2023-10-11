import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

export default function App() {
  const canvas = document.createElement("canvas")
  const gl = canvas.getContext("webgl")

  function getVendorAndRenderer() {
    var _canvas = document.createElement("canvas")
    var _gl
    var _debugInfo
    var _vendor
    var _renderer
    try {
      _gl =
        _canvas.getContext("webgl") || _canvas.getContext("experimental-webgl")
    } catch (e) {
      return
    }
    if (_gl) {
      _debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
      _vendor = gl.getParameter(_debugInfo.UNMASKED_VENDOR_WEBGL)
      _renderer = gl.getParameter(_debugInfo.UNMASKED_RENDERER_WEBGL)
      return { _vendor, _renderer }
    }
  }

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
      window.navigator.hardwareConcurrency,
    ),
    createData("gl.ACTIVE_ATTRIBUTES", gl.ACTIVE_ATTRIBUTES),
    createData("gl.ACTIVE_TEXTURE", gl.ACTIVE_TEXTURE),
    createData("gl.ACTIVE_UNIFORMS", gl.ACTIVE_UNIFORMS),
    createData("gl.ALIASED_LINE_WIDTH_RANGE", gl.ALIASED_LINE_WIDTH_RANGE),
    createData("gl.ALIASED_POINT_SIZE_RANGE", gl.ALIASED_POINT_SIZE_RANGE),
    createData("gl.ALPHA", gl.ALPHA),
    createData("gl.ALPHA_BITS", gl.ALPHA_BITS),
    createData("gl.ALWAYS", gl.ALWAYS),
    createData("gl.ARRAY_BUFFER", gl.ARRAY_BUFFER),
    createData("gl.ARRAY_BUFFER_BINDING", gl.ARRAY_BUFFER_BINDING),
    createData("gl.ATTACHED_SHADERS", gl.ATTACHED_SHADERS),
    createData("gl.DEPTH_RANGE", gl.DEPTH_RANGE),
    createData("Thông tin GPU", getVendorAndRenderer()._vendor),
    createData("Thông tin GPU", getVendorAndRenderer()._renderer),
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
