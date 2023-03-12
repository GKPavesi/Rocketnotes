require('express-async-errors');

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require('./utils/AppError');
const express = require("express");
const routes = require('./routes');

const app = express();

app.use(express.json()); //// habilita nosso app a entender json no body das requests
app.use(routes); /// utiliza as routes que disponibilizamos na pasta routes
app.use(( error, request, response, next ) => {    ///esse trem aqui é para tratar erro tanto de cliente quanto do server
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })

});
migrationsRun();  /// conexão com a database e execução das migrations


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});