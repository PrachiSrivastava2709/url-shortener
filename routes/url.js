import { Router } from "express";
import { generateNewShortURL, redirectURL, getAnalytics } from '../controllers/url.js';

const router = Router();

router.post('/', generateNewShortURL)
router.get('/:shortId', redirectURL)
router.get('/analytics/:shortId', getAnalytics)

export {router};
