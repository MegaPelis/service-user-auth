// modulos
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const express = require("express");
const config = require("./config/config");
const cors = require("cors");

const app = express();

// cargar rutas
const usuarioRouter = require("./Router/usuario");
const authRouter = require("./Router/auth");


// middleware
app.use(cors());
app.use(express.json())
// app.use();

//app.use(morgan("dev"));

// rutas
// const swaggerDocument = YAML.load("./docs/swagger.yaml");
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/usuario", usuarioRouter);
app.use("/auth", authRouter);


app.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome to aws lambda with github action api",
        environment: config.NODE_ENV,
        microservice: config.MICROSERVICE,
    });
});

module.exports = app;