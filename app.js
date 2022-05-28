import express from "express";
import cors from "cors";
import chalk from "chalk";
import categoriesRouter from "./routers/categoriesRouter.js";

const app = express();
app.use(express.json());
app.use(cors())

app.use(categoriesRouter);

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
   console.log(chalk.bold.green(`Server rodando na porta ${PORT}`));
});

