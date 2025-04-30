import type { Express } from "express";
import { createServer, type Server } from "http";
import * as z from "zod";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().min(10),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate form data
      const formData = contactFormSchema.parse(req.body);

      console.log("Contact form submission:", formData);

      res.status(200).json({
        success: true,
        message: "Contact form submitted successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request",
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
