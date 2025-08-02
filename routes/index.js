const express = require('express');
const passport = require("passport");

const router = express.Router();

// Swagger documentation
router.use('/', require('./swagger.js'));

// Main application routes
router.use('/events', require('./events.js'));
router.use('/tickets', require('./tickets.js'));
router.use('/customers', require('./customers.js'));
router.use('/venues', require('./venues.js'));
router.use('/admin', require('./admin.js'));

// Authentication routes
router.get("/", (req, res) => {
  // # swagger.tags = ["Hello World!"];
  res.send("Hello World! Navigate to /api-docs to view the API documentation.");
});

router.get("/login", passport.authenticate("github", {scope: ["user:email"]}));

router.get("/auth", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.username}`
      : "Logged Out"
  );
});

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
  }),
  (req, res) => {
    // Successful authentication
    req.session.user = req.user;
    res.redirect("/auth");
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        error: "Logout Error",
        message: "An error occurred while logging out.",
        statusCode: 500,
      });
    }
    req.session.destroy();
    res.redirect("/");
  });
});

// 404 Handler - Must be last route
router.use("*", (req, res) => {
  res.send(
    "This route does not exist. Please check the API documentation for available routes."
  );
});

module.exports = router;
