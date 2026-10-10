import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Cart = sequelize.define(
  "Cart",
  {
    cart_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  },
  {
    tableName: "carts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

export default Cart;
