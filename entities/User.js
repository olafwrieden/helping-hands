module.exports = {
  name: "User",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
      nullable: false,
    },
    first_name: {
      type: "varchar",
      nullable: false,
    },
    last_name: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      nullable: false,
      unique: true,
    },
    password: {
      type: "varchar",
      nullable: false,
      select: false,
    },
    enabled: {
      type: "boolean",
      nullable: false,
      default: true,
    },
  },
};
