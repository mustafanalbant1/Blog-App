import express from "express";
import {
  addComments,
  deleteComments,
  getPostComments,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/:postId", addComments);
router.delete("/:id", deleteComments);

export default router;
