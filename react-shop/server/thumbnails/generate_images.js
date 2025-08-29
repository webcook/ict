const fs = require('fs');
const path = require('path');

// 간단한 SVG 이미지들을 생성
const products = [
  { name: '용과', filename: 'jeju-dragon-fruit-001.jpeg', color: '#FF6B6B' },
  { name: '바나나', filename: 'jeju-banana-002.jpeg', color: '#FFD93D' },
  { name: '천혜향', filename: 'jeju-cheonhaehyang-003.jpeg', color: '#FF8A65' },
  { name: '한라봉', filename: 'jeju-hallabong-004.jpeg', color: '#FF7043' },
  { name: '카라향', filename: 'jeju-carahyung-005.jpeg', color: '#FF5722' },
  { name: '레드향', filename: 'jeju-redhyung-006.jpeg', color: '#E64A19' },
  { name: '노지감귤', filename: 'jeju-orange-007.jpeg', color: '#FF9800' },
  { name: '황금향', filename: 'jeju-golden-008.jpeg', color: '#FFC107' }
];

// SVG 이미지 생성 함수
function createSVGImage(product) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${product.color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${product.color}CC;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#grad)" rx="12"/>
  <text x="200" y="150" font-family="Arial, sans-serif" font-size="32" font-weight="bold"
        text-anchor="middle" fill="white" stroke="#333" stroke-width="1">
    ${product.name}
  </text>
  <text x="200" y="180" font-family="Arial, sans-serif" font-size="16"
        text-anchor="middle" fill="white" opacity="0.8">
    제주 특산물
  </text>
</svg>`;

  // SVG를 파일로 저장
  fs.writeFileSync(path.join(__dirname, product.filename.replace('.jpeg', '.svg')), svg);
  console.log(`Created: ${product.filename.replace('.jpeg', '.svg')}`);
}

// 모든 이미지 생성
products.forEach(createSVGImage);

console.log('All images generated successfully!');
