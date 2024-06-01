import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ExcelExportService {

    constructor() { }

    export(data: any): void {
        //Title, Header & Data
        const title = data.title;
        const header = data.headers;
        const items = data.items;
        const wsh = data.worksheet;

        //Create a workbook with a worksheet
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet(wsh);

        //Adding Header Row
        let headerRow = worksheet.addRow(header);
        headerRow.eachCell((cell, number) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '#009ea9' },
                bgColor: { argb: '' }
            }
            cell.font = {
                bold: true,
                color: { argb: 'FFFFFF' },
                size: 12
            }
        });

        // Adding Data with Conditional Formatting
        items.forEach((d: any) => {
            let row = worksheet.addRow(d);
        });

        worksheet.columns?.forEach(col => col.width = 36);

        //Generate & Save Excel File
        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, title + '.xlsx');
        });
    }
}