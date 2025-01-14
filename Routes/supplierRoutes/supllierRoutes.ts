import { Router } from "express";
import { createSupplier, deleteSupplier, getAllSupplliers, getSupplierByCode, getSuppliersByPagination, getSuppliersByProjection, printingSuppliers, updateSupplier } from "../../Controller/supplierController/supplierController";
import { Authentification } from "../../Middleware/Authentification";
const route: Router = Router()

route.post("/management/logged-in-user/create-supplier", Authentification, createSupplier)
route.delete("/management/logged-in-user/delete-supplier/:code", Authentification, deleteSupplier)
route.get("/management/logged-in-user/get-all-suppliers", Authentification, getAllSupplliers)
route.get("/management/logged-in-user/get-supplier/:code", Authentification, getSupplierByCode)
route.get("/management/logged-in-user/get-suppliers-by-pagination", Authentification, getSuppliersByPagination)
route.get("/management/logged-in-user/printing-suppliers", Authentification, printingSuppliers)
route.get("/management/logged-in-user/get-suppliers-by-projection", Authentification, getSuppliersByProjection)
route.put("/management/logged-in-user/update-supplier/:code", Authentification, updateSupplier)

export default route