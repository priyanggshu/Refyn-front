import express from "express";
import passport from "passport";
import { handleAuthCallback, getCurrentUser, logoutUser } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/` }),
  handleAuthCallback
);

// GitHub OAuth routes
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: `${process.env.FRONTEND_URL}/` }),
  handleAuthCallback
);

// Get current user
router.get('/me', authenticateToken, getCurrentUser);

// Logout
router.post('/logout', authenticateToken, logoutUser);

export default router;