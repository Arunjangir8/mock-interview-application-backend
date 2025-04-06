import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Create appointment
router.post("/", async (req, res) => {
    const { userId, interviewerId, dateTime } = req.body;
  
    if (!userId || !interviewerId || !dateTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    try {
      const appointment = await prisma.appointment.create({
        data: {
          userId,
          interviewerId,
          dateTime: new Date(dateTime), // This will now correctly parse ISO string
        },
      });
      res.status(201).json({ message: "Appointment booked", appointment });
    } catch (error) {
      console.log("Error details:", error);
      res.status(500).json({ message: "Failed to book appointment", error: error.message });
    }
  });

  router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const appointments = await prisma.appointment.findMany({
        where: { userId },
        include: {
          user: true,
        },
      });
  
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  });



export default router;