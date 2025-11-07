import mongoose from "mongoose";
import config from "./config";
import Category from "./models/Category";
import Product from "./models/Product";
import User from "./models/User";
import {randomUUID} from "node:crypto";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('products');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [cpuCategory, ssdCategory] = await Category.create({
    title: 'CPUs',
    description: 'Central Processor Units',
  }, {
    title: 'SSDs',
    description: 'Solid State Drives',
  });

  await Product.create({
    category: cpuCategory._id,
    title: 'Intel Core I7 12700K',
    price: 350,
    image: 'fixtures/intel-i7.png',
    description: 'Intel\'s Hybrid Architecture The Core i7-12700K incorporates Intel\'s groundbreaking Hybrid Architecture, featuring a mix of Performance cores (P-cores) and Efficient cores (E-cores). This architecture optimizes both performance and energy efficiency by distributing tasks across the P-cores and E-cores.'
  }, {
    category: ssdCategory._id,
    title: 'Samsung 990 Pro 1TB',
    price: 170,
    image: 'fixtures/ssd.webp',
    description: 'The Samsung 990 Pro 1TB is a high-performance PCIe 4.0 NVMe M.2 SSD that delivers exceptional speeds of up to 7,450 MB/s sequential read and 6,900 MB/s write. Designed for enthusiasts, gamers, and creators, it offers significant improvements in random performance over its predecessor, boasts intelligent thermal control for sustained performance, and maintains high power efficiency. This compact M.2 drive provides the capacity and speed needed for demanding applications like gaming, 3D editing, and data analysis.  '
  });

  await User.create({
    username: 'Admin',
    password: 'Qwerty123',
    role: 'admin',
    token: randomUUID()
  }, {
    username: 'User',
    password: 'Qwerty123',
    role: 'user',
    token: randomUUID()
  });

  await db.close();
};

run().catch(console.error);