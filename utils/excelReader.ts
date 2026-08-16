import * as xlsx from 'xlsx';
import * as path from 'path';

export function leerExcel(nombreArchivo: string, nombreHoja: string) {
    const rutaArchivo = path.resolve(__dirname, `../datos/${nombreArchivo}`);
    const libroExcel = xlsx.readFile(rutaArchivo);
    const hoja = libroExcel.Sheets[nombreHoja];
    const datos = xlsx.utils.sheet_to_json(hoja);
    return datos;
}