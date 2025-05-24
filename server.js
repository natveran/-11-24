const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Загружаем Swagger описание
const swaggerDocument = require('./swagger.json');

// Данные теста
let testResult = null;

// API для сохранения результата
app.post('/api/save-result', (req, res) => {
  testResult = req.body.score;
  res.json({ message: 'Результат сохранен' });
});

// API для получения результата
app.get('/api/result', (req, res) => {
  if (!testResult) {
    return res.status(400).json({ error: 'Результат теста не найден' });
  }

  let diagnosis = '';
  if (testResult <= 9) diagnosis = 'Отсутствие депрессивных симптомов';
  else if (testResult <= 15) diagnosis = 'Лёгкая депрессия (субдепрессия)';
  else if (testResult <= 19) diagnosis = 'Умеренная депрессия';
  else if (testResult <= 29) diagnosis = 'Выраженная депрессия (средней тяжести)';
  else diagnosis = 'Тяжёлая депрессия';

  res.json({ score: testResult, diagnosis });
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// HTML страница
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
  console.log('Swagger UI доступен по http://localhost:3000/api-docs');
});