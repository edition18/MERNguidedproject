const express = require("express");

const app = express();

app.get('/', (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
// if no environment port set, use 5000 (i.e for local use/default)

app.listen(PORT, () => console.log(`Server created on ${PORT}`))