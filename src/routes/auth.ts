import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from '../prismaClient';
import { config } from '../config';
import { Prisma } from '@prisma/client';
import { authenticateUser } from '../middleware/auth';

const router = Router();

// Hard-coded developer credentials for monitoring access
const DEV_USERNAME = 'vinayak';
const DEV_PASSWORD = '123456'; // Plain password for direct comparison

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    // Return user info and token
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, company } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password with optimized rounds for better performance
    const hashedPassword = await hash(password, 8);

    // Prepare user data
    const userData: Prisma.UserCreateInput = {
      email,
      password: hashedPassword,
      name,
      role: 'HR',
    };

    // Add company if provided
    if (company) {
      userData.company = {
        connectOrCreate: {
          where: { name: company },
          create: { name: company },
        },
      };
    }

    // Create user
    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Create JWT token
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    // Return user info and token
    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        company: user.company,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.get('/validate', authenticateUser, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Special developer login endpoint for monitoring access
router.post('/dev-login', (req, res) => {
  try {
    console.log('Developer login attempt - Request body:', req.body);
    const { username, password } = req.body;
    
    console.log(`Developer login attempt - Username: "${username}", Password length: ${password ? password.length : 0}`);
    console.log(`Expected credentials - Username: "${DEV_USERNAME}", Password: "${DEV_PASSWORD}"`);
    
    // Debug checks
    console.log('Username match:', username === DEV_USERNAME);
    console.log('Password match:', password === DEV_PASSWORD);
    console.log('Combined check:', username === DEV_USERNAME && password === DEV_PASSWORD);

    // Simple direct comparison for developer credentials
    if (username !== DEV_USERNAME || password !== DEV_PASSWORD) {
      console.log('Invalid developer credentials');
      return res.status(401).json({ error: 'Invalid developer credentials' });
    }

    // Create JWT token with special developer role
    const token = sign(
      {
        userId: 'dev-portal',
        username: username,
        role: 'DEVELOPER',
      },
      config.jwtSecret || 'fallback-secret-for-dev-only',
      { expiresIn: '8h' }
    );

    console.log('Developer login successful:', username);
    console.log('JWT token created with role DEVELOPER');

    // Return developer info and token
    res.json({
      user: {
        id: 'dev-portal',
        username: username,
        role: 'DEVELOPER',
      },
      token,
    });
  } catch (error) {
    console.error('Developer login error:', error);
    res.status(500).json({ error: 'Failed to log in to developer portal' });
  }
});

export default router;