import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

async function generateManualPdf() {
  const pdfDoc = await PDFDocument.create();

  // Color palette matching Nissi
  const orange = rgb(0.96, 0.45, 0.15); // #f57326
  const navy = rgb(0.08, 0.15, 0.32);   // #152652
  const darkGray = rgb(0.2, 0.25, 0.3);
  const lightGray = rgb(0.95, 0.96, 0.98);
  const white = rgb(1, 1, 1);

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // ---------------- Page 1: Cover Page ----------------
  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page1.getSize();

  // Top header accent band
  page1.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: navy,
  });

  page1.drawRectangle({
    x: 0,
    y: height - 128,
    width: width,
    height: 8,
    color: orange,
  });

  page1.drawText("NISSI Elite plast", {
    x: 50,
    y: height - 60,
    size: 32,
    font: fontBold,
    color: white,
  });

  page1.drawText("UPVC PROFILES & SYSTEMS", {
    x: 50,
    y: height - 85,
    size: 14,
    font: fontBold,
    color: orange,
  });

  page1.drawText("OFFICIAL PRODUCT MANUAL & TECHNICAL SPECIFICATIONS", {
    x: 50,
    y: height - 105,
    size: 10,
    font: fontRegular,
    color: white,
  });

  // Middle Hero Callout
  page1.drawRectangle({
    x: 50,
    y: height - 420,
    width: width - 100,
    height: 250,
    color: lightGray,
    borderColor: orange,
    borderWidth: 2,
  });

  page1.drawText("STRENGTH IN EVERY LINE,", {
    x: 80,
    y: height - 220,
    size: 24,
    font: fontBold,
    color: navy,
  });

  page1.drawText("ELEGANCE IN EVERY CURVE.", {
    x: 80,
    y: height - 255,
    size: 24,
    font: fontBold,
    color: orange,
  });

  page1.drawText("100% Lead-Free European Extrusion Technology", {
    x: 80,
    y: height - 295,
    size: 14,
    font: fontBold,
    color: darkGray,
  });

  page1.drawText("Class A Wall Thickness (2.2mm - 2.3mm) • Class S Tropical Formulation", {
    x: 80,
    y: height - 320,
    size: 11,
    font: fontRegular,
    color: darkGray,
  });

  page1.drawText("15-Year Extrusion Warranty • 20-Year European PUR Foil Guarantee", {
    x: 80,
    y: height - 340,
    size: 11,
    font: fontRegular,
    color: darkGray,
  });

  page1.drawText("In-House 8,000 Sq.Ft Galvanized Steel Reinforcement Division", {
    x: 80,
    y: height - 360,
    size: 11,
    font: fontRegular,
    color: darkGray,
  });

  // Bottom info band
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: width,
    height: 120,
    color: navy,
  });

  page1.drawText("Nissi Extrusion India Pvt Ltd", {
    x: 50,
    y: 85,
    size: 14,
    font: fontBold,
    color: white,
  });

  page1.drawText("Factory: AVADI, Chennai - 600 056 | Admin Office: Maduravoyal, Chennai - 600 095", {
    x: 50,
    y: 65,
    size: 9.5,
    font: fontRegular,
    color: white,
  });

  page1.drawText("Sales Hotline: +91 99622 25516 | +91 90421 22555 | Email: nissiupvcprofiles@gmail.com", {
    x: 50,
    y: 48,
    size: 9.5,
    font: fontRegular,
    color: orange,
  });

  page1.drawText("Web: www.nissiupvcgroups.com  •  European Extrusion Technology • Avadi, Chennai", {
    x: 50,
    y: 30,
    size: 9.5,
    font: fontBold,
    color: white,
  });

  // ---------------- Page 2: Product Specifications Table ----------------
  const page2 = pdfDoc.addPage([595.28, 841.89]);

  page2.drawRectangle({
    x: 0,
    y: height - 60,
    width: width,
    height: 60,
    color: navy,
  });

  page2.drawText("NISSI Elite plast — Technical Profiles Catalog", {
    x: 40,
    y: height - 38,
    size: 16,
    font: fontBold,
    color: white,
  });

  // Table content
  const tableData = [
    { code: "NEP-1001", name: "Casement Window Frame", weight: "0.970 kg/m", length: "5.8m", thickness: "2.2mm", pack: "6 pcs/bag" },
    { code: "NEP-1002", name: "Casement Door Frame", weight: "1.080 kg/m", length: "5.8-6.0m", thickness: "2.3mm", pack: "6 pcs/bag" },
    { code: "NEP-1003", name: "Casement Window Frame Small", weight: "0.890 kg/m", length: "5.8m", thickness: "2.2mm", pack: "6 pcs/bag" },
    { code: "NEP-1004", name: "Casement Window Sash", weight: "1.120 kg/m", length: "5.8m", thickness: "2.2mm", pack: "6 pcs/bag" },
    { code: "NEP-1005", name: "Casement Door Sash Outward", weight: "1.340 kg/m", length: "5.8m", thickness: "2.2mm", pack: "4 pcs/bag" },
    { code: "NEP-1006", name: "T-Mullion Profile", weight: "1.010 kg/m", length: "5.8m", thickness: "2.2mm", pack: "6 pcs/bag" },
    { code: "NEP-1007", name: "Casement Single Glass Bead", weight: "0.270 kg/m", length: "5.8-6.0m", thickness: "1.6mm", pack: "20 pcs/bag" },
    { code: "NEP-1010", name: "2 Track Frame", weight: "1.071 kg/m", length: "5.8m", thickness: "2.2mm", pack: "6 pcs/bag" },
    { code: "NEP-1011", name: "Sliding Sash Big 66mm", weight: "0.950 kg/m", length: "5.8m", thickness: "2.2mm", pack: "6 pcs/bag" },
    { code: "NEP-1012", name: "Sliding Sash Small 58mm", weight: "0.820 kg/m", length: "5.8m", thickness: "2.0mm", pack: "6 pcs/bag" },
    { code: "NEP-1013", name: "Sliding Door Sash", weight: "1.120 kg/m", length: "5.8m", thickness: "2.2mm", pack: "4 pcs/bag" },
    { code: "NEP-1014", name: "Sliding Window Interlock", weight: "0.203 kg/m", length: "5.8-6.0m", thickness: "1.5mm", pack: "20 pcs/bag" },
    { code: "NEP-1015", name: "Sliding Door Interlock", weight: "0.241 kg/m", length: "5.8m", thickness: "1.5mm", pack: "20 pcs/bag" },
    { code: "NEP-1016", name: "2.5T Frame 90mm (Mesh Track)", weight: "1.310 kg/m", length: "5.8m", thickness: "2.2mm", pack: "4 pcs/bag" },
    { code: "NEP-1018", name: "Mesh Sash Profile", weight: "0.460 kg/m", length: "5.8m", thickness: "1.7mm", pack: "10 pcs/bag" },
    { code: "NEP-1019", name: "3 Track Frame 112mm", weight: "1.560 kg/m", length: "5.8m", thickness: "2.2mm", pack: "4 pcs/bag" },
    { code: "NEP-1020", name: "46 x 32 Grill Profile", weight: "0.470 kg/m", length: "5.8-6.0m", thickness: "2.0mm", pack: "6 pcs/bag" },
    { code: "NEP-1022", name: "Square Pole 60*60", weight: "0.760 kg/m", length: "5.8-6.0m", thickness: "2.0mm", pack: "4 pcs/bag" },
    { code: "NEP-1023", name: "Round Pole 60", weight: "0.570 kg/m", length: "5.8-6.0m", thickness: "2.0mm", pack: "4 pcs/bag" },
  ];

  let currentY = height - 90;

  // Header Row
  page2.drawRectangle({
    x: 40,
    y: currentY - 20,
    width: width - 80,
    height: 25,
    color: orange,
  });

  page2.drawText("Code", { x: 50, y: currentY - 14, size: 9, font: fontBold, color: white });
  page2.drawText("Profile Description", { x: 120, y: currentY - 14, size: 9, font: fontBold, color: white });
  page2.drawText("Weight", { x: 300, y: currentY - 14, size: 9, font: fontBold, color: white });
  page2.drawText("Length", { x: 380, y: currentY - 14, size: 9, font: fontBold, color: white });
  page2.drawText("Thickness", { x: 440, y: currentY - 14, size: 9, font: fontBold, color: white });
  page2.drawText("Packaging", { x: 505, y: currentY - 14, size: 9, font: fontBold, color: white });

  currentY -= 25;

  tableData.forEach((row, i) => {
    currentY -= 22;
    if (i % 2 === 0) {
      page2.drawRectangle({
        x: 40,
        y: currentY - 5,
        width: width - 80,
        height: 22,
        color: lightGray,
      });
    }

    page2.drawText(row.code, { x: 50, y: currentY, size: 8.5, font: fontBold, color: navy });
    page2.drawText(row.name, { x: 120, y: currentY, size: 8.5, font: fontRegular, color: darkGray });
    page2.drawText(row.weight, { x: 300, y: currentY, size: 8.5, font: fontRegular, color: darkGray });
    page2.drawText(row.length, { x: 380, y: currentY, size: 8.5, font: fontRegular, color: darkGray });
    page2.drawText(row.thickness, { x: 440, y: currentY, size: 8.5, font: fontBold, color: navy });
    page2.drawText(row.pack, { x: 505, y: currentY, size: 8, font: fontRegular, color: darkGray });
  });

  // Footer notes on Page 2
  page2.drawRectangle({
    x: 40,
    y: 40,
    width: width - 80,
    height: 60,
    color: lightGray,
    borderColor: navy,
    borderWidth: 1,
  });

  page2.drawText("COLOUR PROFILES (HOT MELT PUR TECHNOLOGY):", {
    x: 55,
    y: 82,
    size: 9,
    font: fontBold,
    color: navy,
  });

  page2.drawText("• Golden Oak  • Dark Oak  • Anthracite Grey  • Golden Oak R  • Walnut (20-Year Warranty)", {
    x: 55,
    y: 68,
    size: 8.5,
    font: fontRegular,
    color: darkGray,
  });

  page2.drawText("For bulk dealer orders and profile samples: +91 99622 25516 / nissiupvcprofiles@gmail.com", {
    x: 55,
    y: 52,
    size: 8.5,
    font: fontBold,
    color: orange,
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(process.cwd(), "public", "Nissi_Elite_Plast_Product_Manual.pdf");
  await fs.writeFile(outputPath, pdfBytes);
  console.log("PDF generated at:", outputPath);
}

generateManualPdf().catch(console.error);
