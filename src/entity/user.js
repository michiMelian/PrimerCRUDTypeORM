import { EntitySchema } from "typeorm";

const User = new EntitySchema({
  name: "User",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      nullable: false,
    },
    user: {
      type: String,
      nullable: false,
    },
    age: {
      type: Number,
      nullable: false,
    },
    password: {
      type: String,
      nullable: false,
    },
  },
});

export default User;
