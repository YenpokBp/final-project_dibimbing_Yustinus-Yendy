import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    product_name: { type: DataTypes.STRING(150), allowNull: false },
    unit_price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    subtotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  },
  { tableName: "order_items", timestamps: false },
);

export default OrderItem;
