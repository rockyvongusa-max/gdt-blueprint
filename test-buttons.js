const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://gdt-blueprint.vercel.app', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const btn = document.querySelector('a.btn-primary');
    if (!btn) return 'NOT FOUND';
    const cs = getComputedStyle(btn);
    return { bg: cs.background, color: cs.color, fontSize: cs.fontSize };
  });

  console.log('📋 btn-primary computed styles:', JSON.stringify(result, null, 2));

  const rgbGold = 'rgb(212, 168, 67)';
  const rgbDark = 'rgb(26, 18, 8)';
  const isGold = result.bg.includes('212, 168, 67') || result.bg.includes('212,168,67');
  const isDark = result.color.includes('26, 18, 8') || result.color.includes('26,18,8');

  console.log('\n✅ Check:');
  console.log(`${isGold ? '✅ GOLD bg' : '❌ NOT GOLD bg'}: ${result.bg}`);
  console.log(`${isDark ? '✅ DARK text' : '❌ NOT DARK text'}: ${result.color}`);

  await browser.close();
})();
