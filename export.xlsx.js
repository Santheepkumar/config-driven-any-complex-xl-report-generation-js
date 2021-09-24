/* use strict */
const XLSX = require("xlsx");
const DATA = require("./data.json");
const EXPORT_MAPPING = require("./key.mapping");

/**
 * @param {String} - File Name to export  
 * @param {Array} - Sheets const sheets = [
  {
    sheetName: "Example",
    data: [
      ["name", "email"],
      ["santheep", "santheep@gmail.com"]
    ]
  }
];
*/
function exportExcelMultipleSheets(fileName, sheets) {
  const workbook = XLSX.utils.book_new();

  sheets.forEach((st) => {
    const sheet = XLSX.utils.aoa_to_sheet(st.data);
    XLSX.utils.book_append_sheet(workbook, sheet, st.sheetName);
  });

  XLSX.writeFile(workbook, `${fileName}.xlsx`);

  // To send file from server

  // XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  //  res
  //    .status(200)
  //    .set(
  //      "Content-Disposition",
  //      `attachment; filename="Application${new Date().getTime()}.xlsx"`
  //    )
  //    .send(file);
}

/**
 *
 * @param {Object} - Object to key the value. Example { name: "ben" }
 * @param {String} - Key to get value from object. Example "name"
 * @returns {any} - Keyed value
 */
function getValue(obj, key) {
  if (!obj || !key) return;

  if (key === "*") return obj;

  const keySplitted = key.split(".");

  for (const k of keySplitted) {
    obj = obj[k];

    if (!obj) break;
  }
  return obj;
}

/** Example Export Data
{
  applicationId: "12",
  formData: {
    directors: [
      {
        name: "dashrath.php@gmail.com",
        dinNumber: "Bi00578",
      },
      {
        name: "Test",
        dinNumber: "BI00007",
      },
    ],
  },
} 
*/
/** Example Key Mapping  {
    sheetName: "Info",
    key: null,
    fields: [
      {
        heading: "Application Id",
        key: "applicationId",
        exportValue: (v) => v,
      },
    ],
  }, 
]; */

/**
 * @param {String} - Export File Name
 * @param {Array} - Array of Data that gonna be exported
 * @param {Array} - Key Mapping for export
 */
function exportByMapping(fileName, exportData, Mapping) {
  const sheets = [];
  const createSheet = (name) => sheets.push({ sheetName: name, data: [[]] });

  // Looping the application data
  for (let ai = 0; ai < exportData.length; ai++) {
    const application = exportData[ai];
    if (!application) continue;

    //   Looping the Export maps
    for (const sheetMap of Mapping) {
      if (!sheetMap.sheetName) continue;

      // Finding the sheet if not exists then creating one
      // If exists then using it
      const sheetExists = sheets.some(
        (sheet) => sheet.sheetName === sheetMap.sheetName
      );
      if (!sheetExists) createSheet(sheetMap.sheetName);

      // Getting current sheet using sheetname with index
      const currentSheet =
        sheets[
          sheets.findIndex((sheet) => sheet.sheetName === sheetMap.sheetName)
        ];

      // Heading array. we defaultly set this to empty array
      const currentSheetHeadings = currentSheet.data[0];

      // Getting fieldHeadings before hand.
      // this is used in both single and multi export
      const fieldHeadings = sheetMap.fields.map((field) => field.heading);

      // If no sheetmap.key then its not multi export
      if (!sheetMap.key) {
        const sheetHeadings = fieldHeadings;

        // Checking the length and pushing the headings
        // Bcoz headings are only one time pushable
        if (sheetHeadings.length !== currentSheetHeadings.length) {
          currentSheetHeadings.push(...sheetHeadings);
        }

        // Pushing export Values
        const fieldValues = sheetMap.fields.map((field) => {
          const fieldValue = getValue(application, field.key);
          // Checking for export value function.
          // If not just returning the value
          if (field.exportValue) {
            return field.exportValue(fieldValue, application);
          }
          return fieldValue || "--";
        });
        currentSheet.data.push(fieldValues);

        continue;
      }

      // Performing Multi export
      const exportDataMulti = getValue(application, sheetMap.key);

      // We pushing the headers on only 1st application iteration
      // In other iterations we only assigning it with existing headings
      let sheetHeadings;
      if (!ai) {
        const primaryHeadings = sheetMap.primaryFields.map((df) => df.heading);
        sheetHeadings = [...primaryHeadings, ...fieldHeadings];
        currentSheetHeadings.push(...sheetHeadings);
      } else {
        sheetHeadings = currentSheetHeadings;
      }

      for (const exportObj of exportDataMulti) {
        const sheetData = [];
        // Pushing primary fields
        sheetMap.primaryFields.forEach((pf) => {
          const fieldValue = getValue(application, pf.key);
          // Checking for export value function.
          // If not just pushing the value
          if (pf.exportValue) {
            return sheetData.push(pf.exportValue(fieldValue, application));
          }
          sheetData.push(fieldValue || "--");
        });

        sheetMap.fields.forEach((field) => {
          const fieldValue = getValue(exportObj, field.key);
          // Checking for export value function.
          // If not just pushing the value
          if (field.exportValue) {
            return sheetData.push(
              field.exportValue(fieldValue, exportObj, application)
            );
          }
          sheetData.push(fieldValue || "--");
        });
        currentSheet.data.push(sheetData);
      }
    }
  }

  exportExcelMultipleSheets(fileName, sheets);
}

exportByMapping(`Sheet-${new Date().getTime()}`, DATA, EXPORT_MAPPING);
