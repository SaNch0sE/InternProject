const XLSX = require('xlsx');

const table = XLSX.readFile('./books.xlsx');
const myJson = XLSX.utils.sheet_to_json(table.Sheets[table.SheetNames[0]]);

const map = new Map();

myJson.forEach((el) => {
    const code = el.code3;
    if (map[code] !== 1) {
        map[code] = 1;
    } else {
        map[code] += 1;
    }
});
const data = Object.keys(map).map((key) => ({ code3: key, value: map[key] }));

console.log(data);
