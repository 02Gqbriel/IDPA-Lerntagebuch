import { Router } from "express";
import { reverseToken } from "../util/jwt";

export const router = Router();

router.get("/", (req, res) => {
  const token = req.headers["authorization"];

  if (token == undefined) {
    return res.render("index", { loggedIn: false });
  }

  const username = reverseToken(token);

  if (username == null) {
    return res.render("index", { loggedIn: false });
  }

  return res.render("index", { loggedIn: true, username });
});

router.get("/login", (req, res) => {
  res.render("login", { layout: "auth" });
});

router.get("/register", (req, res) => {
  res.render("register", { layout: "auth" });
});

router.get("*", (req, res) => {
  res.status(404).render("404");
});
