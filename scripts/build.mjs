import { cp, mkdir, readFile, rm, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
const scripts = ['app.js', 'theme.js', 'components.js', 'auth.js'];
const pages = ['index.html', 'auth.html', 'courses.html'];
const styles = ['styles.css', 'light.css', 'design-colors.css', 'design-layout.css', 'ui.css', 'auth.css'];
for (const file of scripts) execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
const sources = (await Promise.all([...pages, ...styles, ...scripts].map(file => readFile(file, 'utf8')))).join('\n');
const references = [...sources.matchAll(/(?:src|href)="([^"#][^"]*)"/g), ...sources.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(match => match[1]).filter(path => !/^(?:https?:|data:|mailto:|tel:)/.test(path)).map(path => path.replace(/[?#].*$/, ''));
for (const path of new Set(references)) await stat(resolve(root, path));
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of [...pages, ...styles, ...scripts, 'assets']) await cp(file, resolve('dist', file), { recursive: true });
console.log(`Build complete: dist/ — JavaScript syntax and ${new Set(references).size} local asset references verified.`);
