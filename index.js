import express from 'express';
import { router } from './routes/url.js'
import { connectToMongoDB } from './connect.js';

const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => {console.log("Connected to MongoDB")})

app.use(express.json())
app.use("/url", router);
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
