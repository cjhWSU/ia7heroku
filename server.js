import path from 'path';
import express from 'express';
const PORT = process.env.PORT || 8081;
const app = express();
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.listen(PORT, () => {
    console.log(`Hello developer, your server is listening at port ${PORT}.`);
});