import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as fs from 'fs';
import path from 'path';

// Constants
const app = express();
const PORT = 3000;
const DB_FILE = path.resolve(__dirname, 'db.json');

// Middleware
app.use(bodyParser.json());

// Endpoint: /ping
app.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

// Endpoint: /submit
app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  // Read existing submissions
  let submissions = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

  // Add new submission
  submissions.push({ name, email, phone, github_link, stopwatch_time });

  // Write updated submissions back to the file
  fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2));

  res.json({ success: true });
});

// Endpoint: /read
app.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);

  // Read existing submissions
  const submissions = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

  // Check if the index is valid
  if (index >= 0 && index < submissions.length) {
    res.json(submissions[index]);
  } else {
    res.status(404).json({ error: 'Submission not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
