import { GermanWord } from "@/models/germanWord";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export async function exportPdf(data: GermanWord[]) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Load custom Hindi font asynchronously
  const fontUrl = "/fonts/NotoSansDevanagari-Regular.ttf";
  const fontName = "NotoSansDevanagari";

  try {
    const response = await fetch(fontUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch font");
    }
    const blob = await response.blob();
    const reader = new FileReader();

    reader.readAsDataURL(blob);

    reader.onloadend = () => {
      const base64data = (reader.result as string).split(",")[1];

      if (base64data) {
        doc.addFileToVFS("NotoSansDevanagari-Regular.ttf", base64data);
        doc.addFont("NotoSansDevanagari-Regular.ttf", fontName, "normal");
      }

      // Add Title
      doc.setFontSize(16);
      doc.text("German Words Dictionary", 14, 20);

      // Define Columns (No, German, English, Hindi)
      const columns = [
        { header: "No.", dataKey: "no" },
        { header: "German", dataKey: "german" },
        { header: "English", dataKey: "english" },
        { header: "Hindi", dataKey: "hindi" },
      ];

      // Map Data Rows
      const rows = data.map((word, index) => {
        // Build German column with article and word only
        let germanText = "";

        if (word.article) {
          germanText = word.article + " " + (word.germanWord || "");
        } else {
          germanText = word.germanWord || "";
        }

        return {
          no: String(index + 1),
          german: germanText.trim(),
          english: Array.isArray(word.englishMeaning)
            ? word.englishMeaning.join(", ")
            : word.englishMeaning || "",
          hindi: Array.isArray(word.hindiMeaning)
            ? word.hindiMeaning.join(", ")
            : word.hindiMeaning || "",
        };
      });

      autoTable(doc, {
        columns: columns,
        body: rows,
        startY: 25,
        styles: {
          fontSize: 9,
          cellPadding: 3,
          valign: "middle",
          halign: "left",
          overflow: "linebreak",
          lineWidth: 0.1,
          lineColor: [200, 200, 200],
        },
        columnStyles: {
          no: {
            cellWidth: 15,
            halign: "center",
          },
          german: {
            cellWidth: 50,
          },
          english: {
            cellWidth: 55,
          },
          hindi: {
            cellWidth: 62,
            font: fontName,
          },
        },
        headStyles: {
          fillColor: [41, 128, 185],
          halign: "center",
          fontSize: 10,
          textColor: [255, 255, 255],
          cellPadding: 4,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        theme: "grid",
        margin: { top: 25, left: 14, right: 14, bottom: 20 },
        didDrawPage: (data) => {
          // Add Page Number
          const pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          doc.setFontSize(10);
          doc.text(
            `Page ${doc.getCurrentPageInfo().pageNumber}`,
            data.settings.margin.left,
            pageHeight - 10,
          );
        },
      });

      doc.save("German_Words_Dictionary.pdf");
    };
  } catch (error) {
    console.error("Error loading font:", error);
    alert("Failed to load font. PDF may not display Hindi text correctly.");

    // Fallback - generate PDF without custom font
    generateFallbackPdf(doc, data);
  }
}

// Fallback function if font loading fails
function generateFallbackPdf(doc: jsPDF, data: GermanWord[]) {
  doc.setFontSize(16);
  doc.text("German Words Dictionary", 14, 20);

  const columns = [
    { header: "No.", dataKey: "no" },
    { header: "German", dataKey: "german" },
    { header: "English", dataKey: "english" },
    { header: "Hindi", dataKey: "hindi" },
  ];

  const rows = data.map((word, index) => {
    // Build German column with article and word only
    let germanText = "";

    if (word.article) {
      germanText = word.article + " " + (word.germanWord || "");
    } else {
      germanText = word.germanWord || "";
    }

    return {
      no: String(index + 1),
      german: germanText.trim(),
      english: Array.isArray(word.englishMeaning)
        ? word.englishMeaning.join(", ")
        : word.englishMeaning || "",
      hindi: "[Hindi text - font not loaded]",
    };
  });

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 25,
    styles: {
      fontSize: 9,
      cellPadding: 3,
      overflow: "linebreak",
      valign: "middle",
    },
    columnStyles: {
      no: { cellWidth: 15, halign: "center" },
      german: { cellWidth: 50 },
      english: { cellWidth: 55 },
      hindi: { cellWidth: 62 },
    },
    headStyles: {
      fillColor: [41, 128, 185],
      halign: "center",
      cellPadding: 4,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    theme: "grid",
    margin: { top: 25, left: 14, right: 14, bottom: 20 },
  });

  doc.save("German_Words_Dictionary.pdf");
}
