const mysql = require("mysql2/promise");
const createCard = (req, res) => {
  res.json({ data: req.body });
};

const deleteCard = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const updateCard = (req, res) => {
  console.log(req.body);
  res.json({ data: req.body });
};

const fetchCard = (req, res) => {};

module.exports = { createCard, deleteCard, updateCard, fetchCard };
