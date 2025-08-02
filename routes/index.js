const passport = require("passport");

const router = require("express").Router();

// router.use("/", require("../swagger"));

router.get("/", (req, res) => {
  // # swagger.tags = ["Hello World!"];
  res.send("Hello World! Navigate to /api-docs to view the API documentation.");
});

router.use("/venues", require("./venues"));
router.use("/customers", require("./customers"));

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
