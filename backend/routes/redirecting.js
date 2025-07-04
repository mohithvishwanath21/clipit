import express from "express";
import { handleGetRedirectUrl } from "../controllers/redirecting.js"
const redirectUrlRouter = express.Router();

redirectUrlRouter.get('/:id', handleGetRedirectUrl)

export default redirectUrlRouter;