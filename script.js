// script.js

function login() {
  const login = document.getElementById('login').value;
  const password = document.getElementById('password').value;
  if (login && password) {
    // Перенаправление на страницу choice.html
    window.location.href = 'choice.html';
  } else {
    alert('Пожалуйста, введите логин и пароль.');
  }
}

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors'); // Подключаем библиотеку cors

const app = express();
const port = 3000;

app.use(express.json()); // Для обработки JSON-тела запросов
app.use(cors()); // Включаем CORS для всех маршрутов

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API для обработки результатов теста депрессии Бека',
    version: '1.0.0',
    description: 'API для подсчета баллов и интерпретации результатов теста депрессии Бека.',
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./app.js'], // Путь к файлу, где описаны API endpoints
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /calculate_results:
 *   post:
 *     summary: Подсчитать результаты теста депрессии Бека
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               q1:
 *                 type: integer
 *                 description: Ответ на первый вопрос (0-3)
 *               q2:
 *                 type: integer
 *                 description: Ответ на второй вопрос (0-3)
 *               # Добавьте остальные вопросы (q3, q4, ...)
 *               # Убедитесь, что вопросы соответствуют вашему тесту
 *               q3:
 *                 type: integer
 *                 description: Ответ на третий вопрос (0-3)
 *               q4:
 *                 type: integer
 *                 description: Ответ на четвертый вопрос (0-3)
 *               q5:
 *                 type: integer
 *                 description: Ответ на пятый вопрос (0-3)
 *               q6:
 *                 type: integer
 *                 description: Ответ на шестой вопрос (0-3)
 *               q7:
 *                 type: integer
 *                 description: Ответ на седьмой вопрос (0-3)
 *               q8:
 *                 type: integer
 *                 description: Ответ на восьмой вопрос (0-3)
 *               q9:
 *                 type: integer
 *                 description: Ответ на девятый вопрос (0-3)
 *               q10:
 *                 type: integer
 *                 description: Ответ на десятый вопрос (0-3)
 *               q11:
 *                 type: integer
 *                 description: Ответ на одиннадцатый вопрос (0-3)
 *               q12:
 *                 type: integer
 *                 description: Ответ на двенадцатый вопрос (0-3)
 *               q13:
 *                 type: integer
 *                 description: Ответ на тринадцатый вопрос (0-3)
 *               q14:
 *                 type: integer
 *                 description: Ответ на четырнадцатый вопрос (0-3)
 *               q15:
 *                 type: integer
 *                 description: Ответ на пятнадцатый вопрос (0-3)
 *               q16:
 *                 type: integer
 *                 description: Ответ на шестнадцатый вопрос (0-3)
 *               q17:
 *                 type: integer
 *                 description: Ответ на семнадцатый вопрос (0-3)
 *               q18:
 *                 type: integer
 *                 description: Ответ на восемнадцатый вопрос (0-3)
 *               q19:
 *                 type: integer
 *                 description: Ответ на девятнадцатый вопрос (0-3)
 *               q20:
 *                 type: integer
 *                 description: Ответ на двадцатый вопрос (0-3)
 *               q21:
 *                 type: integer
 *                 description: Ответ на двадцать первый вопрос (0-3)
 *
 *
 *     responses:
 *       200:
 *         description: Успешный ответ с результатами и интерпретацией
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 score:
 *                   type: integer
 *                   description: Общий балл теста
 *                 interpretation:
 *                   type: string
 *                   description: Интерпретация результатов теста
 */
app.post('/calculate_results', (req, res) => {
  // Получаем ответы из тела запроса
  const answers = req.body;

  // Подсчитываем итоговый балл
  let totalScore = 0;
  for (const question in answers) {
    if (answers.hasOwnProperty(question)) {
      totalScore += answers[question];
    }
  }

  // Интерпретируем результат
  let interpretation = "";
  if (totalScore >= 0 && totalScore <= 9) {
    interpretation = "отсутствие депрессивных симптомов";
  } else if (totalScore >= 10 && totalScore <= 15) {
    interpretation = "лёгкая депрессия (субдепрессия)";
  } else if (totalScore >= 16 && totalScore <= 19) {
    interpretation = "умеренная депрессия";
  } else if (totalScore >= 20 && totalScore <= 29) {
    interpretation = "выраженная депрессия (средней тяжести)";
  } else if (totalScore >= 30 && totalScore <= 63) {
    interpretation = "тяжёлая депрессия";
  } else {
    interpretation = "Недопустимое значение результатов теста";
  }

  // Отправляем результат в формате JSON
  res.json({ score: totalScore, interpretation: interpretation });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`Swagger UI доступен на http://localhost:${port}/api-docs`);
});
