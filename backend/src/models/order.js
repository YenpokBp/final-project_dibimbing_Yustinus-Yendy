import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define(
  "Order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    order_status: {
      type: DataTypes.ENUM("pending", "paid", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    total_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    paid_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

export default Order;
