const express = require("express");
const cors = require("cors");
const routes = require("./endpoints");

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000", // Ton front-end React
    methods: "GET, POST, PUT, DELETE", // Méthodes autorisées
    allowedHeaders: "Content-Type, Authorization" // En-têtes autorisés
}));

app.use("/api", routes);

app.listen(3001, () => {
    console.log(`L'API est démarrée et accessible`);
});
