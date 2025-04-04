import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", 
    passport.authenticate("google", { session: false}),
    (req, res) => {
        res.json({ user: req.user.user, token: req.user.token });
    }
);

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback",
    passport.authenticate("github", { session: false }),
    (req, res) => {
        res.json({ user: req.user.user, token: req.user.token });
    }
);

router.post("/logout", (req, res) => {
    res.json({ message: "Logged out" });
});

export default router;