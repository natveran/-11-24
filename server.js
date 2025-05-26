// server.js

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Swagger конфигурация
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API теста депрессии Бека',
    version: '1.0.0',
    description: 'Подсчет баллов и интерпретация теста Бека.',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./server.js'], // путь к этому же файлу
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /calculate_results:
 *   post:
 *     summary: Подсчет результата теста Бека
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               q1: { type: integer }
 *               q2: { type: integer }
 *               q3: { type: integer }
 *               q4: { type: integer }
 *               q5: { type: integer }
 *               q6: { type: integer }
 *               q7: { type: integer }
 *               q8: { type: integer }
 *               q9: { type: integer }
 *               q10: { type: integer }
 *               q11: { type: integer }
 *               q12: { type: integer }
 *               q13: { type: integer }
 *               q14: { type: integer }
 *               q15: { type: integer }
 *               q16: { type: integer }
 *               q17: { type: integer }
 *               q18: { type: integer }
 *               q19: { type: integer }
 *               q20: { type: integer }
 *               q21: { type: integer }
 *     responses:
 *       200:
 *         description: Результаты теста
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 score: { type: integer }
 *                 interpretation: { type: string }
 */
app.post('/calculate_results', (req, res) => {
  const answers = req.body;

  let totalScore = 0;
  for (const key in answers) {
    totalScore += answers[key];
  }

  let interpretation = '';
  if (totalScore <= 9) interpretation = 'отсутствие депрессивных симптомов';
  else if (totalScore <= 15) interpretation = 'лёгкая депрессия (субдепрессия)';
  else if (totalScore <= 19) interpretation = 'умеренная депрессия';
  else if (totalScore <= 29) interpretation = 'выраженная депрессия (средней тяжести)';
  else if (totalScore <= 63) interpretation = 'тяжёлая депрессия';
  else interpretation = 'Ошибка в данных';

  res.json({ score: totalScore, interpretation });
});

app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`);
  console.log(`Swagger: http://localhost:${port}/api-docs`);
});
