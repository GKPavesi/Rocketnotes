const express = require("express");
const routes = require('./routes')

const app = express();

app.use(express.json()); //// habilita nosso app a entender json no body das requests
app.use(routes); /// utiliza as routes que disponibilizamos na pasta routes

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})