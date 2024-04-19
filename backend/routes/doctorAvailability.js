import express from 'express';
import handleAvailabilityTimeAndDate from "../controllers/doctorAvailability.js";

const doctorAvailabilityRouter = express.Router();

doctorAvailabilityRouter.get("/",handleAvailabilityTimeAndDate);

export default doctorAvailabilityRouter;