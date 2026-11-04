import { cp, mkdir, readFile, rm, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
for (const file of ['app.js', 'theme.js']) execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
const html = await readFile('index.html', 'utf8');
const css = (await Promise.all(['styles.css', 'light.css', 'design-colors.css', 'design-layout.css'].map(file => readFile(file, 'utf8')))).join('\n');
const references = [...html.matchAll(/(?:src|href)="([^"#][^"]*)"/g), ...css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(match => match[1]).filter(path => !/^(?:https?:|data:)/.test(path));
for (const path of new Set(references)) await stat(resolve(root, path));
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'light.css', 'design-colors.css', 'design-layout.css', 'app.js', 'theme.js', 'assets']) await cp(file, resolve('dist', file), { recursive: true });
console.log(`Build complete: dist/ — JavaScript syntax and ${new Set(references).size} local asset references verified.`);
