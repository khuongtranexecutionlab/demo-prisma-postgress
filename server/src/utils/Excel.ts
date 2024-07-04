import * as path from "path";
import * as ExcelJS from "exceljs";

export async function readItemsFromExcel(): Promise<any[]> {
  const filePath = path.resolve(".", "data", "crawled_data.xlsx");
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.worksheets[0];
  const data: any[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const rowData: { [key: string]: any } = {};
    row.eachCell((cell, colNumber) => {
      const header = (
        worksheet.getRow(1).getCell(colNumber).value as string
      ).toLowerCase();
      rowData[header] = cell.value;
    });
    data.push(rowData);
  });

  return data;
}
