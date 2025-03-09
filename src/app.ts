import express from 'express';
//importar os arquivos
const app = express();

const PORT = 3040;


//endpoints
app.use(express.json());
app.listen(PORT, ()=> console.log("API online na porta: " + PORT));