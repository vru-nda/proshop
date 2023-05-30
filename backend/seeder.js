// // A separate script that is being used to import the sample data to DB for inital use

// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import colors from 'colors';

// import users from './data/users.js';
// import products from './data/products.js';

// import User from './models/User.js';
// import Product from './models/Product.js';
// import Order from './models/Order.js';

// import connectDB from './config/db.js';

// dotenv.config();

// connectDB();

// //import the data
// const importData = async () => {
//   try {
//     await Order.deleteMany();
//     await Product.deleteMany();
//     await User.deleteMany();

//     //users
//     const createdUsers = await User.insertMany(users);
//     const adminUser = createdUsers[0]._id;

//     //products
//     const sampleProds = products.map((product) => {
//       return {
//         ...product,
//         user: adminUser,
//       };
//     });
//     await Product.insertMany(sampleProds);

//     console.log('Data imported!'.green.inverse);
//     process.exit();
//   } catch (err) {
//     console.log(`${err}`.red.inverse);
//     process.exit(1);
//   }
// };

// //destroy the data
// const destroyData = async () => {
//   try {
//     await Order.deleteMany();
//     await Product.deleteMany();
//     await User.deleteMany();

//     console.log('Data Destroyed!'.red.inverse);
//     process.exit();
//   } catch (err) {
//     console.log(`${err}`.red.inverse);
//     process.exit(1);
//   }
// };

// // destroy data if -d flag
// if (process.argv[2] === '-d') {
//   destroyData();
// } else {
//   importData();
// }
