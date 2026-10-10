import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Platform = sequelize.define(
  "Platform",
  {
    platform_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    platform_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  { tableName: "platforms", timestamps: false },
);

export default Platform;
