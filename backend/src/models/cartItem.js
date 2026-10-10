import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CartItem = sequelize.define(
  "CartItem",
  {
    cart_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 1 },
    },
  },
  { tableName: "cart_items", timestamps: false },
);

export default CartItem;
