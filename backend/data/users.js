import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345', 12),
    isAdmin: true,
  },
  {
    name: 'Vrunda Joshi',
    email: 'vrunda@example.com',
    password: bcrypt.hashSync('12345', 12),
  },
  {
    name: 'Nidhi Rathod',
    email: 'nidhi@example.com',
    password: bcrypt.hashSync('12345', 12),
  },
];

export default users;
