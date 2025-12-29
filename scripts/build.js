const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const assetsDir = path.join(__dirname, '..', 'assets');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Create assets directory in public
const publicAssetsDir = path.join(publicDir, 'assets');
if (!fs.existsSync(publicAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// Copy index.html
fs.copyFileSync(
    path.join(__dirname, '..', 'index.html'),
    path.join(publicDir, 'index.html')
);
console.log('✓ Copied index.html');

// Copy styles.css
fs.copyFileSync(
    path.join(__dirname, '..', 'styles.css'),
    path.join(publicDir, 'styles.css')
);
console.log('✓ Copied styles.css');

// Copy assets folder
if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    files.forEach(file => {
        fs.copyFileSync(
            path.join(assetsDir, file),
            path.join(publicAssetsDir, file)
        );
        console.log(`✓ Copied assets/${file}`);
    });
}

console.log('\n✅ Build completed successfully!');
