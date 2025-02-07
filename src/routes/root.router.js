import express from 'express';
import userRouter from './user.router.js';
import imageRouter from './image.router.js';

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
    res.send("Capstone Be Buoi 15");
});

//user
rootRouter.use("/user",userRouter)

rootRouter.use("/image",imageRouter)

export default rootRouter;