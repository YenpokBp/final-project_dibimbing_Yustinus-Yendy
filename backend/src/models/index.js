import sequelize from "../config/db.js";

import User from "./user.js";
import Category from "./category.js";
import Platform from "./platform.js";
import Product from "./product.js";
import Cart from "./cart.js";
import CartItem from "./cartItem.js";
import Order from "./order.js";
import OrderItem from "./orderItem.js";

// Category & Platform -> Product
Category.hasMany(Product, {
  foreignKey: "category_id",
  sourceKey: "category_id",
  as: "products",
});
Product.belongsTo(Category, {
  foreignKey: "category_id",
  targetKey: "category_id",
  as: "category",
});

Platform.hasMany(Product, {
  foreignKey: "platform_id",
  sourceKey: "platform_id",
  as: "products",
});
Product.belongsTo(Platform, {
  foreignKey: "platform_id",
  targetKey: "platform_id",
  as: "platform",
});

// User -> Cart (satu user satu cart, sesuai unique user_id)
User.hasOne(Cart, { foreignKey: "user_id", sourceKey: "user_id", as: "cart" });
Cart.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
  as: "user",
});

// Cart -> CartItem -> Product
Cart.hasMany(CartItem, {
  foreignKey: "cart_id",
  sourceKey: "cart_id",
  as: "items",
});
CartItem.belongsTo(Cart, {
  foreignKey: "cart_id",
  targetKey: "cart_id",
  as: "cart",
});

Product.hasMany(CartItem, {
  foreignKey: "product_id",
  sourceKey: "product_id",
  as: "cartItems",
});
CartItem.belongsTo(Product, {
  foreignKey: "product_id",
  targetKey: "product_id",
  as: "product",
});

// User -> Order -> OrderItem -> Product
User.hasMany(Order, {
  foreignKey: "user_id",
  sourceKey: "user_id",
  as: "orders",
});
Order.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
  as: "user",
});

Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  sourceKey: "order_id",
  as: "items",
});
OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
  targetKey: "order_id",
  as: "order",
});

Product.hasMany(OrderItem, {
  foreignKey: "product_id",
  sourceKey: "product_id",
  as: "orderItems",
});
OrderItem.belongsTo(Product, {
  foreignKey: "product_id",
  targetKey: "product_id",
  as: "product",
});

export {
  sequelize,
  User,
  Category,
  Platform,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
};
