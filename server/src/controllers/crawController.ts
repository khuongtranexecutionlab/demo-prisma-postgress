import ExcelJS from "exceljs";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { chromium } from "playwright";
import { readItemsFromExcel } from "../utils/Excel";

export async function createMenu(req: Request, res: Response) {
  const url =
    "https://shopeefood.vn/ho-chi-minh/2seven-food-com-trua-van-phong";

  console.log(`Launching Playwright`);
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle" });

  const data = await page.evaluate(() => {
    const items: { title: string; desc: string | null; image: string }[] = [];
    const elements = document.querySelectorAll("div.item-restaurant-row");
    elements.forEach((element) => {
      const titleElement = element.querySelector("h2.item-restaurant-name");
      const descElement = element.querySelector("div.item-restaurant-desc");
      const imageElement = element.querySelector("img");
      const title = titleElement ? titleElement.textContent!.trim() : null;
      const desc = descElement && descElement.textContent!.trim();
      const image = imageElement ? imageElement.src : null;
      if (title && image) {
        items.push({ title, desc, image });
      }
    });
    return items;
  });

  await browser.close();

  if (data.length === 0) {
    return;
  }

  const filePath = path.resolve(".", "data", "crawled_data.xlsx");

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted old file at ${filePath}`);
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Crawled Data");

  worksheet.columns = [
    { header: "title", key: "title", width: 30 },
    { header: "description", key: "desc", width: 30 },
    { header: "image", key: "image", width: 50 },
  ];

  data.forEach((item) => {
    worksheet.addRow(item);
  });

  await workbook.xlsx.writeFile(filePath);

  res.status(200).json(`Data successfully exported to ${filePath}`);
}

export async function readMenu(req: Request, res: Response) {
  try {
    const data = await readItemsFromExcel();

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error reading Excel file:", error);
    res.status(500).send("Error reading Excel file");
  }
}
