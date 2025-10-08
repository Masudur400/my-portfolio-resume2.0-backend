import { Router } from "express";
// import { checkAuth } from "../../middlewares/checkAuth";
// import { Role } from "../user/user.interface"; 
import { contactControllers } from "./contact.controller";

const router = Router(); 
 
router.post("/", contactControllers.sendContactMail);

export const ContactRoutes = router;