import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import bscypt from "bcryptjs"
import { useState } from "react"
import { useEffect } from "react"

export default function App() {
  const [hashedGPU, setHashedGPU] = useState("")

  useEffect(() => {
    async function hashGPU() {
      const _vendor = getVendorAndRenderer()._vendor
      const _renderer = getVendorAndRenderer()._renderer
      let GPU = ""
      GPU += _vendor
      GPU += _renderer
      const hashedGPU = await bscypt.hash(GPU, 10)
      setHashedGPU(hashedGPU)
    }
    hashGPU()
  }, [])

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
      console.log(e)
      return
    }
    if (_gl) {
      _debugInfo = _gl.getExtension("WEBGL_debug_renderer_info")
      _vendor = _gl.getParameter(_debugInfo.UNMASKED_VENDOR_WEBGL)
      _renderer = _gl.getParameter(_debugInfo.UNMASKED_RENDERER_WEBGL)
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
    uid += hashedGPU
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
    createData("UNMASKED_VENDOR_WEBGL (10)", getVendorAndRenderer()._vendor),
    createData(
      "UNMASKED_RENDERER_WEBGL (11)",
      getVendorAndRenderer()._renderer,
    ),
    createData("HASHED GPU (12)", hashedGPU),
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
        (2) + (5) + (3) + (6) + (7) + (8) + (9) + (12)
      </div>
    </>
  )
}
