import { Router } from "express";
import { createClient, deleteClient, getAllClients, getClientByCode, getClientsByPagination, getClientsByProjection, printingClients, updateClient } from "../../Controller/clientController/clientController";
import { Authentification } from "../../Middleware/Authentification";
const route: Router = Router()

route.post("/management/logged-in-user/create-client", Authentification, createClient)
route.delete("/management/logged-in-user/delete-client/:code", Authentification, deleteClient)
route.get("/management/logged-in-user/get-all-clients", Authentification, getAllClients)
route.get("/management/logged-in-user/get-client/:code", Authentification, getClientByCode)
route.get("/management/logged-in-user/get-clients-by-pagination", Authentification, getClientsByPagination)
route.get("/management/logged-in-user/printing-clients", Authentification, printingClients)
route.get("/management/logged-in-user/get-clients-by-projection", Authentification, getClientsByProjection)
route.put("/management/logged-in-user/update-client/:code", Authentification, updateClient)

export default route