const express = require ("express")
const Routes = express.Router()
const controlleur = require("../controlleur/controlleur")




Routes.get("/getAll",controlleur.getAll)
Routes.post("/add",controlleur.add)
Routes.put("/upd/:id",controlleur.upd)
Routes.delete("/del/:id",controlleur.del)



module.exports = Routes