import { Router } from "express";
import { Authentification } from "../../Middleware/Authentification";
import { createStore, deleteStore, getAllStores, getStoreByCode, getStoresByPagination, updateStore } from "../../Controller/storeController/storeController";
const route: Router = Router()
route.post("/management/logged-in-user/create-store", Authentification, createStore)
route.delete("/management/logged-in-user/delete-store/:code", Authentification, deleteStore)
route.get("/management/logged-in-user/get-all-stores", Authentification, getAllStores)
route.put("/management/logged-in-user/update-store/:code", Authentification, updateStore)
route.get("/management/logged-in-user/get-store/:code", Authentification, getStoreByCode)
route.get("/management/logged-in-user/get-stores-by-pagination", Authentification, getStoresByPagination)

// route.get("/management/logged-in-user/printing-suppliers", Authentification, printingSuppliers)
// route.get("/management/logged-in-user/get-suppliers-by-projection", Authentification, getSuppliersByProjection)

export default route
