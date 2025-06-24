const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Create a simple SVG logo
const svgLogo = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="90" ry="90" fill="url(#grad1)"/>
  <g fill="white" stroke="white" stroke-width="8">
    <path d="M160 140 L160 200 L280 200 L160 340 L160 400 L320 240 L200 240 L320 140 Z"/>
  </g>
  <text x="256" y="450" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white">FREE</text>
</svg>`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  // Ensure icons directory exists
  const iconsDir = path.join(process.cwd(), 'public', 'icons');
  try {
    await fs.mkdir(iconsDir, { recursive: true });
  } catch (error) {
    console.log('Icons directory already exists');
  }

  // Generate favicon
  await sharp(Buffer.from(svgLogo))
    .resize(32, 32)
    .png()
    .toFile(path.join(process.cwd(), 'public', 'favicon.ico'));

  console.log('✅ Generated favicon.ico');

  // Generate apple-touch-icon
  await sharp(Buffer.from(svgLogo))
    .resize(180, 180)
    .png()
    .toFile(path.join(process.cwd(), 'public', 'apple-touch-icon.png'));

  console.log('✅ Generated apple-touch-icon.png');

  // Generate PWA icons
  for (const size of sizes) {
    const filename = `icon-${size}x${size}.png`;
    await sharp(Buffer.from(svgLogo))
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, filename));
    
    console.log(`✅ Generated ${filename}`);
  }

  console.log('🎉 All icons generated successfully!');
}

generateIcons().catch(console.error);
