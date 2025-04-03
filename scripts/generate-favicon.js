const { favicons } = require('favicons');
const fs = require('fs');
const path = require('path');

// Source file
const source = path.resolve(__dirname, '../public/icon.svg');

// Configuration
const configuration = {
  path: "/",
  appName: "Portfolio",
  appShortName: "Portfolio",
  background: "#CBACF9",
  theme_color: "#CBACF9",
  icons: {
    android: false,
    appleIcon: false,
    appleStartup: false,
    favicons: true,
    windows: false,
    yandex: false,
  }
};

// Generate favicons
async function generateFavicons() {
  try {
    const response = await favicons(source, configuration);
    
    // Create files
    const outputDir = path.resolve(__dirname, '../public');
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write image files
    response.images.forEach(image => {
      fs.writeFileSync(
        path.join(outputDir, image.name),
        image.contents
      );
      console.log(`Created: ${image.name}`);
    });
    
    // Write other files (manifest, browserconfig, etc.)
    response.files.forEach(file => {
      fs.writeFileSync(
        path.join(outputDir, file.name),
        file.contents
      );
      console.log(`Created: ${file.name}`);
    });
    
    console.log('Favicon generation completed!');
  } catch (error) {
    console.error('Error generating favicons:', error.message);
  }
}

// Run the generator
generateFavicons(); 