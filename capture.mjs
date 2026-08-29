#!/usr/bin/env node
import { chromium } from 'playwright-core';
import path from 'path';
import fs from 'fs';

const ROOT = '/workspace/ysp-parent-photos-look';
const FRAMES = path.join(ROOT, 'frames');
const SHOTS = path.join(ROOT, 'shots');
fs.mkdirSync(SHOTS, { recursive: true });

const executablePath = '/opt/google/chrome/google-chrome';

const jobs = [
  { file: 'before-phone-team.html', out: 'before-phone-team.png', w: 390, h: 844 },
  { file: 'after-phone-empty.html', out: 'after-phone-empty.png', w: 390, h: 844 },
  { file: 'after-phone-grid.html', out: 'after-phone-grid.png', w: 390, h: 844 },
  { file: 'after-phone-upload.html', out: 'after-phone-upload.png', w: 390, h: 844 },
  { file: 'after-phone-detail.html', out: 'after-phone-detail.png', w: 390, h: 844 },
  { file: 'after-phone-consent.html', out: 'after-phone-consent.png', w: 390, h: 844 },
  { file: 'after-phone-held.html', out: 'after-phone-held.png', w: 390, h: 844 },
  { file: 'after-ipad-grid.html', out: 'after-ipad-grid.png', w: 820, h: 1180 },
  { file: 'after-desk-grid.html', out: 'after-desk-grid.png', w: 1440, h: 900 },
  { file: 'after-desk-consent.html', out: 'after-desk-consent.png', w: 1440, h: 900 },
  { file: 'before-desk-team.html', out: 'before-desk-team.png', w: 1440, h: 900 },
];

const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

for (const job of jobs) {
  const url = 'file://' + path.join(FRAMES, job.file);
  const page = await browser.newPage({ viewport: { width: job.w, height: job.h }, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(500);
  const out = path.join(SHOTS, job.out);
  await page.screenshot({ path: out, type: 'png' });
  await page.close();
  console.log('OK', job.out, Math.round(fs.statSync(out).size / 1024) + 'KB');
}

await browser.close();
console.log('Done', jobs.length, 'shots');
