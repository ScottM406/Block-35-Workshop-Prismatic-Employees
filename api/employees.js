const express = require("express");
const prisma = require("../prisma");
const { UNABLE_TO_FIND_POSTINSTALL_TRIGGER_JSON_SCHEMA_ERROR } = require("@prisma/client/scripts/postinstall.js");
const router = express.Router();
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const books = await prisma.employee.findMany();
    res.json(books);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next({
      status: 400,
      message: "Employee name must be entered.",
    })
  }
  try{
    const employee = await prisma.employee.create({ data: { name } });
    res.status(201);
    res.json(employee);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({ where: { id: Number(id) } });
    if (employee) {
      res.json(employee.name);
    } else {
      next({
        status: 404,
        message: `No employee with ID ${id} exists.`
      });
    }
  } catch (e) {
    next(e);
    }
  });

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return next({
      status: 400,
      message: "You must provide a name for the employee."
    });
  }

  try {
    const employee = await prisma.employee.findUnique({ where: { id: Number(id) } });
    if (!employee) {
      return next({
        status: 404,
        message: `No employee with ID ${id} exists.`,
      });
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id)},
      data: {  name },
    });
    res.json(updatedEmployee);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params

  try {
    const employee =  await prisma.employee.findUnique({ where: { id: Number(id) }});
    if (!employee) {
      next({
        status: 404,
        message: `No employee with ID ${id} exists.`,
      })
    }

    const deletedEmployee = await prisma.employee.delete({
      where: { id: Number(id) }
    })
    res.sendStatus(204); 
  } catch (e) {
    next(e);
  }
});