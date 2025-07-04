import express from "express"
import { handleGenerateUrl, handleDeleteUrl, handleGetUrl, getUrlAnalytics, getSingleUrlAnalytics, updateUrlStatus} from "../controllers/url.js";
const urlRouter = express.Router();

urlRouter.get('/', handleGetUrl);
urlRouter.post('/create', handleGenerateUrl);
urlRouter.delete('/:_id', handleDeleteUrl);
urlRouter.get('/analytics', getUrlAnalytics);
urlRouter.get('/analytics/:id', getSingleUrlAnalytics)
urlRouter.patch('/status/:id', updateUrlStatus);


export default urlRouter;