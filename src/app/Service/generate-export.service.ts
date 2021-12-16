import { Injectable } from '@angular/core';
import  * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml; charset=UTF-8"
const EXCEL_EXT = ".xlsx";

@Injectable({
  providedIn: 'root'
})

export class GenerateExportService {

  constructor() {}

  exportToExcel(json:any[], excelFileName: string): void{
  	const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  	const workbook: XLSX.WorkBook = {Sheets: {"data": worksheet},SheetNames: ["data"]}
  	const excelBuffer: any = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
  	this.saveAsExcel(excelBuffer, excelFileName);
  };
//call method buffer and filename
private saveAsExcel(buffer : any, filenName: string): void{
	const data: Blob = new Blob([buffer], {type:EXCEL_TYPE});
	//const DatePipe: DatePipe = new DatePipe().getTime();
	FileSaver.saveAs(data, filenName + "_export_" + new Date().getTime() + EXCEL_EXT);
}

}



/*
select extract(Month from "Fecha_Solicitud") as mes ,extract(year from "Fecha_Solicitud") AS año from public."Tb_Control_Cambio" WHERE "Fecha_Solicitud" = '2019-12-22 22:00:00-06' ORDer by mes;
select extract(Month from "Fecha_Solicitud"),extract(year from "Fecha_Solicitud") from public."Tb_Control_Cambio" WHERE "Fecha_Solicitud" = NOW()::date
 

SELECT COUNT (*) AS contador, 
             extract(Month from "Fecha_Solicitud") AS mes
    FROM public."Tb_Control_Cambio"
   WHERE extract(year from "Fecha_Solicitud") = extract(year from NOW()::date)
GROUP BY mes
ORDER BY mes ASC;


 */