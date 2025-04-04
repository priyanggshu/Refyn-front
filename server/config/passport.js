import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, ( accessToken, refreshToken, profile, done) => {
    const user = { id: profile.id, name: profile.displayName, email: profile.emails[0].value };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
    return done(null, { user, token });
}));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, ( accessToken, refreshToken, profile, done) => {
    const user = { id: profile.id, name: profile.displayName, email: profile.emails[0].value };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
    return done(null, { user, token });
}));

export default passport;
