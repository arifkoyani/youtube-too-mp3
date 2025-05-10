import { Router } from "express";
import { mp3Converter } from "../controlers/mp3.controler.js";

const mp3route = Router();
mp3route.route("/mp3").post(mp3Converter);
export default mp3route;
