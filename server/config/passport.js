import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

const issueJWT = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, provider: user.provider },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { providerId: profile.id },
        });

        let user = existingUser;
        if (!existingUser) {
          user = await prisma.user.create({
            data: {
              email: profile.emais[0].value,
              name: profile.displayName,
              provider: "google",
              providerId: profile.id,
            },
          });
        }
        const token = issueJWT(user);
        return done(null, { user, token });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { providerId: profile.id },
        });

        let user = existingUser;
        if (!existingUser) {
          user = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              name: profile.displayName,
              provider: "github",
              providerId: profile.id,
            },
          });
        }
        const token = issueJWT(user);
        return done(null, { user, token });
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
