import express from "express";
import { viewSecret } from "../controllers/viewSecret.js";
import { listSecret } from "../controllers/listSecret.js";

export const router = express.Router();

router.get("/view", viewSecret);

router.get("/list", listSecret);
