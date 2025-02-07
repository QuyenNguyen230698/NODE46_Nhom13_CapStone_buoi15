import express from 'express';
import userController from '../controller/user.controller.js';
import { project } from '../configs/middlewares/protect.middleware.js';

const userRouter = express.Router();

userRouter.get("/list",userController.getAll)

userRouter.post("/register",userController.register)

userRouter.post("/login",userController.login)

userRouter.post("/create-info",project,userController.createInfo)

export default userRouter;