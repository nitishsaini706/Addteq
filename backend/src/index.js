const express = require('express');
const app = express();
const port = 3001;
const {router} = require("./routes/index");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(router);

app.get("/",async(req,res)=>{
    res.json("server working fine");
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
