
import ExportJsonExcel from './js-export'
/**
 *   @param  sheetHeader 头部文件字段  数组
 *   @param  sheetFilter  文件内的字段名 数组
 *   @param  sheetData 真正传入组件内的数据 ，注意这里的数据格式 [{one:'一行一列',two:'一行二列'},{one:'二行一列',two:'二行二列'}]
 *   类似
 */

const newExcel = (sheetHeader: string[], sheetFilter: string[], sheetData: any[], fileName: string) => {
    const option = {
        fileName,
        datas: [{
            sheetData,
            sheetName: 'sheet',
            sheetFilter,
            sheetHeader
        }]
    };

    const toExcel = new ExportJsonExcel(option); // new
    toExcel.saveExcel(); // 保存
}

export default newExcel