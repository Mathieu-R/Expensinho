const fs = require('fs');
const path = require('path');
const cleanCSS = require('clean-css');
const cssPath = path.join(__dirname, '../dist/css/keys-practice.css');

fs.writeFileSync(cssPath, new cleanCSS().minify([cssPath]).styles);
