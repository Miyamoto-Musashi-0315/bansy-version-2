import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prismaClient';
import { Prisma } from '../generated/prisma';
import { authenticateUser } from '../middleware/auth';
import { JWT_SECRET } from '../config';

const router = Router();

// Register
router.post('/register', async (req, res) => {
  console.log('--- User registration attempt ---');
  try {
    const { email, password, name, company } = req.body;
    console.log('Registering email:', email);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error('Registration failed: Email already registered');
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Prepare user data
    const userData: Prisma.UserCreateInput = {
      email,
      password: hashedPassword,
      name,
      role: 'HR',
    };

    // If company is provided, connect or create it
    if (company) {
      userData.company = {
        connectOrCreate: {
          where: { name: company },
          create: { name: company },
        },
      };
    }

    const user = await prisma.user.create({
      data: userData,
    });
    console.log('User created:', user.id);

    console.log('Signing token with secret:', JWT_SECRET ? 'Exists' : 'MISSING!');

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    console.log('Generated token for new user:', token);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      user: userWithoutPassword,
      token,
    });
    console.log('--- Registration successful ---');
  } catch (error) {
    console.error('--- Registration failed with server error ---');
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log('--- User login attempt ---');
  try {
    const { email, password } = req.body;
    console.log('Login email:', email);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error('Login failed: User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      console.error('Login failed: Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Signing token with secret:', JWT_SECRET ? 'Exists' : 'MISSING!');

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    console.log('Generated token:', token);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword,
      token,
    });
    console.log('--- Login successful ---');
  } catch (error) {
    console.error('--- Login failed with server error ---');
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Validate token endpoint
router.get('/validate', authenticateUser, async (req, res) => {
  console.log('--- Token validation request ---');
  try {
    // If we reach here, the token is valid (middleware verified it)
    const user = req.user;
    console.log('Token validation successful for user:', user?.id);
    
    res.json({
      valid: true,
      user: user,
    });
  } catch (error) {
    console.error('Token validation error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
