import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../sequelize.js";
import { emailRegexp } from "../../constants/auth.js";

const User = sequelize.define(
  "user",
  {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatarURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subscription: {
      type: DataTypes.ENUM,
      values: ["starter", "pro", "business"],
      defaultValue: "starter",
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  },
  { tableName: "users" }
);

User.sync({ alter: true });

export default User;
