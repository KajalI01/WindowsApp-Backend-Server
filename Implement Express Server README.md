# WindowsApp-Slidely.AI-Task
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as fs from 'fs';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Ping endpoint
app.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

// Submit endpoint
app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  // Save submission to db.json (for simplicity)
  const dbFile = './src/db.json';
  let submissions = JSON.parse(fs.readFileSync(dbFile, 'utf8'));

  submissions.push({ name, email, phone, github_link, stopwatch_time });
  fs.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));

  res.json({ success: true });
});

// Read endpoint
app.get('/read', (req: Request, res: Response) => {
  const { index } = req.query;
  const dbFile = './src/db.json';
  const submissions = JSON.parse(fs.readFileSync(dbFile, 'utf8'));

  if (index >= 0 && index < submissions.length) {
    res.json(submissions[index]);
  } else {
    res.status(404).json({ error: 'Submission not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
