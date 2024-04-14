import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  findUser,
  getUsersForSideBar,
  changeSelfProfile,
  getAllUser,
  addUser,
  deleteUser,
} from "../controllers/usercontroller.js";

const router = express.Router();

router.put("/chat/change/:id", protectRoute, changeSelfProfile);
router.get("/chat/sidebar/:id", protectRoute, getUsersForSideBar);
router.get("/chat/search/alluser", protectRoute, getAllUser);
router.post("/chat/search-user", protectRoute, findUser);
router.post("/chat/add-user/:id", protectRoute, addUser);
router.delete("/chat/delete-user/:id", protectRoute, deleteUser);

export default router;
