import { Router } from "express";
import { register } from "../controller/register";
import { login } from "../controller/login";
import { user } from "../controller/profile";
import { isAuthenticated } from "../middleware/verifyUser";
import { SaveImg, BuyImg, GetSaveImg, GetBuyImage, DeleteImgSave } from "../controller/image";
import { confirm_transaction } from "../controller/transaction";

const router = Router();

router.get("/", async (req, res) => {
  res.send(
    "API REST para proyecto e commerce en React"
  );
});

router.post("/register", register);

router.post("/login", login);

router.get("/user", isAuthenticated, user);

router.get("/user/save/images", isAuthenticated, GetSaveImg);

router.post("/img/save", isAuthenticated, SaveImg);

router.post("/img/buy", isAuthenticated, BuyImg);

router.get("/confirm/transaction", confirm_transaction);

router.get('/user/buy/images', isAuthenticated, GetBuyImage);

router.delete('/img/save/delete', isAuthenticated, DeleteImgSave)

router.get("*", async (req, res) => {
  return res.status(404).send("Esta ruta no existe :(");
});

export default router;
