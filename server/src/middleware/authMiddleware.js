// ============================================
// src/middleware/authMiddleware.js
// JWT verification middleware to protect private routes
// ============================================

import jwt from 'jsonwebtoken';

// ------------------------------------------------
// @desc    Protect routes by verifying a Bearer JWT
// @usage   router.get('/protected-route', protect, controllerFn)
// ------------------------------------------------
export const protect = (req, res, next) => {
  // Read the Authorization header
  const authHeader = req.headers.authorization;

  // Expect format: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }

  // Extract the token part after "Bearer "
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }

  try {
    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload ({ id, role }) to req.user
    req.user = decoded;

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token invalid or expired',
    });
  }
};