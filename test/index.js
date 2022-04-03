const path = require('path')
const generateCsvData = require('../src/shared/generate-csv-data')
const formatTime = require('../src/shared/format-time')

const myCars = [
    {
      "car": "Audi",
      "price": 40000,
      "color": "blue"
    }, {
      "car": "BMW",
      "color": "black"
    }, {
      "car": "Porsche",
      "price": 60000,
      "color": "green"
    }
  ];

  generateCsvData(path.resolve(__dirname, '../', `./${formatTime(Date.now(), 'YYYY-MM-DD-HH-mm-ss')}.csv`),myCars)