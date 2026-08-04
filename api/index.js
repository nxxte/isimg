require("dotenv").config();

const express = require('express')
const cors = require('cors');

const fileRoutes = require('./routes/pics');

const app = express();

const corsOptions = {
    origin: ["*"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Range']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', fileRoutes());

app.get("/", (req, res) => res.send("Working"));

app.listen(5000, () => {
    console.log(`server running on ${5000}`);
});
