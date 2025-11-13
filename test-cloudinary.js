/**
 * Cloudinary Upload Verification Script
 * 
 * This script helps verify Cloudinary configuration
 * Run with: node test-cloudinary.js
 */

// Check if environment variables are set
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Cloudinary Configuration...\n');

// Check for .env.local file
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('   Please create .env.local file with Cloudinary credentials.\n');
  process.exit(1);
}

// Read .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
    }
  }
});

// Check required variables
const requiredVars = [
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  'NEXT_PUBLIC_CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

let allPresent = true;
console.log('📋 Environment Variables Check:');
requiredVars.forEach(varName => {
  if (envVars[varName]) {
    const value = varName.includes('SECRET') 
      ? '***' + envVars[varName].slice(-4) 
      : envVars[varName];
    console.log(`   ✅ ${varName}: ${value}`);
  } else {
    console.log(`   ❌ ${varName}: NOT SET`);
    allPresent = false;
  }
});

if (!allPresent) {
  console.log('\n❌ Missing required environment variables!');
  console.log('   Please add them to .env.local and restart the server.\n');
  process.exit(1);
}

// Check package.json for next-cloudinary
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  console.log('\n📦 Package Check:');
  if (deps['next-cloudinary']) {
    console.log(`   ✅ next-cloudinary: ${deps['next-cloudinary']}`);
  } else {
    console.log('   ❌ next-cloudinary: NOT INSTALLED');
    console.log('   Run: npm install next-cloudinary');
  }
}

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules', 'next-cloudinary');
if (fs.existsSync(nodeModulesPath)) {
  console.log('   ✅ next-cloudinary: INSTALLED in node_modules');
} else {
  console.log('   ⚠️  next-cloudinary: Not found in node_modules');
  console.log('   Run: npm install');
}

console.log('\n✅ Configuration check complete!');
console.log('\n📝 Next Steps:');
console.log('   1. Make sure your Cloudinary upload preset "blog_images" exists');
console.log('   2. Verify the preset is set to "Unsigned"');
console.log('   3. Restart your development server: npm run dev');
console.log('   4. Test the upload at: http://localhost:3000/admin');
console.log('\n');

