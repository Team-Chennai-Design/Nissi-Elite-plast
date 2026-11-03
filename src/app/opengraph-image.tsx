import { ImageResponse } from "next/og";

export const alt = "NISSI Elite Plast - uPVC Windows & Doors Profiles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #9a3412 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#fb923c", letterSpacing: 6, display: "flex" }}>
          NISSI EXTRUSION INDIA PVT LTD
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, marginTop: 24, display: "flex" }}>
          NISSI Elite Plast
        </div>
        <div style={{ fontSize: 42, marginTop: 16, color: "#e2e8f0", display: "flex" }}>
          100% Lead-Free uPVC Window &amp; Door Profiles
        </div>
        <div style={{ fontSize: 30, marginTop: 40, color: "#fdba74", display: "flex" }}>
          European Extrusion Technology • 15-Year Warranty • Avadi, Chennai
        </div>
      </div>
    ),
    { ...size }
  );
}
