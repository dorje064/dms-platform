/**
 * Seed Script - Populates sample students and donors into MongoDB
 * Usage: npx ts-node apps/api/src/scripts/seed.ts
 * Make sure MONGODB_URI is set in apps/api/.env
 */

import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env['MONGODB_URI'];
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set in .env file');
  process.exit(1);
}

// Schemas
const adminSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'admin' },
  },
  { timestamps: true },
);

const studentSchema = new mongoose.Schema(
  {
    name: String,
    grade: String,
    school: String,
    region: String,
    status: { type: String, default: 'Active' },
    avatar: { type: String, default: '' },
    email: String,
    phone: String,
    notes: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'students' },
);

const donorSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    amount: Number,
    currency: { type: String, default: 'NPR' },
    location: String,
    type: { type: String, default: 'One-time' },
    date: { type: Date, default: Date.now },
    avatar: { type: String, default: '' },
    message: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'donors' },
);

const SAMPLE_STUDENTS = [
  { name: 'Tenzin Dorjee', grade: 'Grade 11', school: 'Namkha Khyung Dzong School', region: 'Yultsho Dhun', status: 'Active' },
  { name: 'Pema Sherpa', grade: 'Grade 12', school: 'Himalayan Model School', region: 'Limi', status: 'Active' },
  { name: 'Karma Lhamo', grade: 'Bachelor 1st Year', school: 'Trinity College', region: 'Global', status: 'Pending' },
  { name: 'Dorje Gyaltsen', grade: 'Grade 11', school: 'Namkha Khyung Dzong School', region: 'Nyin', status: 'Active' },
  { name: 'Yangchen Dolma', grade: 'Grade 12', school: 'Golden Gate Box', region: 'Chang', status: 'Active' },
  { name: 'Pasang Norbu', grade: 'Bachelor 2nd Year', school: 'St. Xaviers', region: 'Bhalu-Drukpa', status: 'Graduated' },
  { name: 'Tashi Wangmo', grade: 'Grade 11', school: 'Namkha Khyung Dzong School', region: 'Drukchu Lung', status: 'Active' },
  { name: 'Sonam Tsering', grade: 'Grade 12', school: 'Bernhardt College', region: 'Yultsho Dhun', status: 'Active' },
  { name: 'Dawa Phuti', grade: 'Bachelor 1st Year', school: 'Islington College', region: 'Limi', status: 'Pending' },
  { name: 'Ngawang Chodrak', grade: 'Grade 11', school: 'Namkha Khyung Dzong School', region: 'Nyin', status: 'Active' },
];

const SAMPLE_DONORS = [
  { name: 'Tsering Ngetup Lama', amount: 25005, location: 'Nyin, Nepal', type: 'One-time', message: 'Supporting education and preserving our cultural heritage.' },
  { name: 'Norbu Angdu Lama', amount: 20000, location: 'Nyin, Nepal', type: 'Monthly', message: 'Committed to helping students achieve their dreams.' },
  { name: 'Chhapal Dorje', amount: 15500, location: 'Namkha, Nepal', type: 'One-time', message: 'Honoring the legacy of His Holiness Degyal Rinpoche.' },
  { name: 'Lakha Thapa', amount: 15500, location: 'Namkha, Nepal', type: 'One-time', message: 'Dedicated to empowering future generations through education.' },
  { name: 'Kunchong Tashi', amount: 15005, location: 'Nyin, Nepal', type: 'Monthly', message: 'Investing in the future of our community\'s youth.' },
  { name: 'Pema Mugtup', amount: 15005, location: 'Nyin, Nepal', type: 'Monthly' },
  { name: 'Chhakka Bahadhur Lama', amount: 15005, location: 'Nyin, Nepal', type: 'One-time' },
  { name: 'Donor Name 8', amount: 10000, location: 'Kathmandu, Nepal', type: 'One-time' },
  { name: 'Donor Name 9', amount: 5000, location: 'Pokhara, Nepal', type: 'Monthly' },
  { name: 'Donor Name 10', amount: 3500, location: 'Boudha, Nepal', type: 'One-time' },
];

async function seed() {
  console.log('🌱 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI!);
  console.log('✅ Connected!');

  const AdminModel = mongoose.model('Admin', adminSchema, 'admins');
  const StudentModel = mongoose.model('Student', studentSchema);
  const DonorModel = mongoose.model('Donor', donorSchema);

  // Seed admin
  const existingAdmin = await AdminModel.findOne({ email: 'admin@dms.org' });
  if (!existingAdmin) {
    const hashedPw = await bcrypt.hash('Admin@123', 12);
    await AdminModel.create({
      name: 'Super Admin',
      email: 'admin@dms.org',
      password: hashedPw,
      role: 'superadmin',
    });
    console.log('✅ Default admin created: admin@dms.org / Admin@123');
  } else {
    console.log('ℹ️  Admin already exists, skipping.');
  }

  // Seed students
  const studentCount = await StudentModel.countDocuments({ isDeleted: false });
  if (studentCount === 0) {
    await StudentModel.insertMany(SAMPLE_STUDENTS);
    console.log(`✅ Inserted ${SAMPLE_STUDENTS.length} sample students`);
  } else {
    console.log(`ℹ️  ${studentCount} students already exist, skipping.`);
  }

  // Seed donors
  const donorCount = await DonorModel.countDocuments({ isDeleted: false });
  if (donorCount === 0) {
    await DonorModel.insertMany(SAMPLE_DONORS);
    console.log(`✅ Inserted ${SAMPLE_DONORS.length} sample donors`);
  } else {
    console.log(`ℹ️  ${donorCount} donors already exist, skipping.`);
  }

  await mongoose.disconnect();
  console.log('🎉 Seed complete!');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
