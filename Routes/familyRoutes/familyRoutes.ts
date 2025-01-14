import { Router } from "express";
import { createFamily, deleteFamily, getAllFamilies, getFamiliesByPagination, getFamiliesByProjection, getFamilyByCode, printingFamilies, updateFamily } from "../../Controller/familyController/familyController";
import { Authentification } from "../../Middleware/Authentification";
const route: Router = Router()

route.post("/management/logged-in-user/create-family", Authentification, createFamily)
route.delete("/management/logged-in-user/delete-family/:code", Authentification, deleteFamily)
route.put("/management/logged-in-user/update-family/:code", Authentification, updateFamily)
route.get("/management/logged-in-user/get-all-families", Authentification, getAllFamilies)
route.get("/management/logged-in-user/get-family/:code", Authentification, getFamilyByCode)
route.get("/management/logged-in-user/get-families-by-pagination", Authentification, getFamiliesByPagination)

// route.get("/management/logged-in-user/printing-families", Authentification, printingFamilies)
// route.get("/management/logged-in-user/get-families-by-projection", Authentification, getFamiliesByProjection)

export default route