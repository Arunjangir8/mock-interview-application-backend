import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";


const app=express();
const port=8000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json())
const prisma = new PrismaClient()
const JWT_SECRET = "123456789"

import { LoginUser,Signuser } from "./Routes/Login.js";
app.post("/signup",Signuser)
app.post("/login",LoginUser)

import ProfileRoutes from "./Routes/Profile.js";
app.use("/profile", ProfileRoutes);

import AppointmentRoutes from "./Routes/Appointment.js";
app.use("/appointments", AppointmentRoutes);

app.delete("/appointments/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.appointment.delete({
        where: { id },
      });
      res.status(200).json({ message: "Appointment cancelled successfully" });
    } catch (error) {
      console.error("Error deleting appointment:", error);
      res.status(500).json({ error: "Failed to cancel appointment" });
    }
  });
  


app.listen(8000, () => console.log("Server running on http://localhost:8000"));