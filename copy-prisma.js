const fs = require('fs');
const path = require('path');

// Ensure the destination directory exists
const destDir = path.join(__dirname, 'dist', 'generated');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy the Prisma client from src to dist
const srcDir = path.join(__dirname, 'src', 'generated', 'prisma');
const destPrismaDir = path.join(destDir, 'prisma');

// Copy recursively
function copyRecursive(src, dest) {
  if (fs.existsSync(src)) {
    if (fs.lstatSync(src).isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      
      const entries = fs.readdirSync(src);
      for (const entry of entries) {
        const srcPath = path.join(src, entry);
        const destPath = path.join(dest, entry);
        copyRecursive(srcPath, destPath);
      }
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

copyRecursive(srcDir, destPrismaDir);
console.log('Prisma client copied successfully from src to dist!');
