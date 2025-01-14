import { Router } from "express";
import { signin } from "../../Controller/userController/userController";

const route: Router = Router()

route.post("/management/signin", signin)

export default route