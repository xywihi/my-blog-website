import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// 下载为Excel文件
export const exportToExcel = (data,fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    try {
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName+'.xlsx');
    } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout); }
    return wbout;
  };