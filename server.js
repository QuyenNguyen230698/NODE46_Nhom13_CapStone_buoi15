import express from 'express';
import rootRouter from "./src/routes/root.router.js";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(rootRouter)

app.use(cors({ origin: 'http://localhost:5173' }))

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server đang chạy trên port ${port}`);
});