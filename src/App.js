import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

export default function App() {
  /** Remove " " and lower case */
  function processString(inputString) {
    const processedString = inputString.replace(/\s+/g, "").toLowerCase()
    return processedString
  }

  /** Convert string to Ascii */
  function convertStringToAscii(inputString) {
    let asciiString = ""
    let number = 0

    for (let i = 0; i < inputString.length; i++) {
      const charCode = inputString.charCodeAt(i)
      asciiString += charCode.toString()
      number += charCode
    }

    return { asciiString, number }
  }

  /** Get info gpu */
  function getVendorAndRenderer() {
    var canvas = document.createElement("canvas")
    var gl
    var debugInfo
    var vendor
    var renderer
    var gpuinfo

    try {
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    } catch (e) {
      console.log(e)
      return
    }
    if (gl) {
      debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
      vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      gpuinfo = vendor + renderer
      return { gpuinfo, vendor, renderer }
    }
  }

  /** Create row data */
  function createData(field, value) {
    return { field, value }
  }

  /** Get uid device */
  function getUID() {
    let uid = window.navigator.mimeTypes.length
    uid += window.navigator.userAgent.replace(/\D+/g, "")
    uid += window.navigator.plugins.length
    uid += window.screen.height || ""
    uid += window.screen.width || ""
    uid += window.screen.pixelDepth || ""
    uid += window.navigator.hardwareConcurrency || ""
    uid += convertStringToAscii(
      processString(getVendorAndRenderer().gpuinfo),
    ).number
    return uid
  }

  /** Create data in table */
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
    createData("UNMASKED_VENDOR_WEBGL (10)", getVendorAndRenderer().vendor),
    createData("UNMASKED_RENDERER_WEBGL (11)", getVendorAndRenderer().renderer),
    createData(
      "Processed GPU (12)",
      convertStringToAscii(processString(getVendorAndRenderer().gpuinfo))
        .number,
    ),
    createData("totalJSHeapSize", performance.memory.totalJSHeapSize),
    createData("jsHeapSizeLimit", performance.memory.jsHeapSizeLimit),
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
