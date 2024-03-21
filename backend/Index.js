const express =require("express")
const db =require("./Database/database")
const port = 3000


const RouterList =require("./Route/list")


const app=express();


app.use(express.json())




app.use("/api",RouterList)

app.listen(port,()=>{
   console.log(`listening on port ${port}`); 
})


module.exports =db