import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDirectory = resolve('docs');
const indexPath = resolve(outputDirectory, 'index.html');
const fallbackPath = resolve(outputDirectory, '404.html');

await copyFile(indexPath, fallbackPath);
console.log(`[create-spa-fallback] Copied ${indexPath} to ${fallbackPath}`);
