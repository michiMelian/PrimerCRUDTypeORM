import express from "express";
const router = express.Router();
import User from "../entity/user.js";
import MyDataSource from "typeorm";

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

// define the home page route
router.get("/", async (req, res) => {
  const userRepository = MyDataSource.getRepository(User);
  res.json(await userRepository.find());
});

// Este(/:id) es para buscar por un id especifico(por parametro)
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const userRepository = MyDataSource.getRepository(User);
  const a = await userRepository.findOneBy({ id: id });
  console.log("Buscando por id");
  res.json(a);
});

// Este es para crear un uasuario
router.post("/", async (req, res, next) => {
  const { name, age, user, password } = req.body; //<= Este es para obtener la informacion del body
  const userRepository = MyDataSource.getRepository(User);

  try {
    const userNew = {
      name,
      age,
      user,
      password,
    };
    const a = await userRepository.save(userNew);
    console.log("Creando un usuario", a);
    return res.json(a);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return next(error);
  }
});

//Este es para editar un usuario
router.patch("/:id", async (req, res) => {
  const { name, age, user, password } = req.body;
  const id = req.params.id;
  try {
    const userEdit = {
      name,
      age,
      user,
      password,
    };
    const userRepository = MyDataSource.getRepository(User);
    await userRepository.update(id, userEdit);
    const updatedUser = await userRepository.findOneBy({ id: id });
    console.log("Editando un Usuario");
    res.json(updatedUser);
  } catch (error) {
    console.error("Error al Modificar un usuario:", error);
    return next(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const userRepository = MyDataSource.getRepository(User);
  const a = await userRepository.delete({ id: id });
  console.log(a);
  res.json({ message: "Usuario deleted" }).status(); //Esta linea es para saber el estado que devuelve la peticion
});

export default router;
