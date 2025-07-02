import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

export const verifyClerk = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
  onError: (err, req, res, next) => {
    console.log("Clerk auth error:", err);
    return res.status(401).json({ message: "Unauthorized access" });
  },
  onAuthorized: (req, res, next) => {
    next();
  }
});