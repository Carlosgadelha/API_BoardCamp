import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
   console.log(`Server rodando na porta ${PORT}`);
});

