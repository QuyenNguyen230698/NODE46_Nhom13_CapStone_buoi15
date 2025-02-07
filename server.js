import express from 'express';
import rootRouter from "./src/routes/root.router.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(rootRouter)

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server đang chạy trên port ${port}`);
});