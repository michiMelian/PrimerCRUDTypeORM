import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Product home page");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.send("");
});
