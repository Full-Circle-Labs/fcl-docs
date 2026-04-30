import {readFileSync, readdirSync, statSync, writeFileSync, mkdirSync} from 'fs';
import {join, relative, basename} from 'path';
import {fileURLToPath} from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const docsDir = join(__dirname, '../docs');
const buildDir = join(__dirname, '../build');

function extractTitle(content) {
  const fmTitle = content.match(/^---[\s\S]*?^title:\s*(.+)$/m);
  if (fmTitle) return fmTitle[1].trim().replace(/^["']|["']$/g, '');
  const h1 = content.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  return null;
}

function extractDescription(content) {
  const fmDesc = content.match(/^---[\s\S]*?^description:\s*(.+)$/m);
  if (fmDesc) return fmDesc[1].trim().replace(/^["']|["']$/g, '');
  return null;
}

function extractId(content) {
  const fmId = content.match(/^---[\s\S]*?^id:\s*(.+)$/m);
  if (fmId) return fmId[1].trim().replace(/^["']|["']$/g, '');
  return null;
}

function filePathToUrl(filePath, docId) {
  const rel = relative(docsDir, filePath).replace(/\\/g, '/');
  const dir = rel.substring(0, rel.lastIndexOf('/') + 1);
  if (docId) return `/docs/${dir}${docId}`.replace(/\/$/, '');
  const withoutExt = rel.replace(/\.(mdx?)$/, '');
  const cleaned = withoutExt.replace(/\/index$/, '');
  return `/docs/${cleaned}`;
}

function walkDir(dir) {
  const files = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const name of entries) {
    if (name.startsWith('.') || name.startsWith('_')) continue;
    const fullPath = join(dir, name);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (/\.(mdx?)$/.test(name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = walkDir(docsDir);
const docs = [];
const apiDocs = [];

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  const title = extractTitle(content);
  if (!title) continue;
  const description = extractDescription(content);
  const docId = extractId(content);
  const url = filePathToUrl(file, docId);
  const entry = {title, url, description};
  const bucket = file.includes('/api/') ? apiDocs : docs;
  const isIndex = basename(file, '.mdx') === 'index';
  isIndex ? bucket.unshift(entry) : bucket.push(entry);
}

function formatEntry({title, url, description}) {
  return description ? `- [${title}](${url}): ${description}` : `- [${title}](${url})`;
}

const lines = [
  '# FCL Docs',
  '',
  '> Full Circle Labs documentation and API reference.',
  '',
];

if (docs.length > 0) {
  lines.push('## Documentation', '', ...docs.map(formatEntry), '');
}
if (apiDocs.length > 0) {
  lines.push('## API Reference', '', ...apiDocs.map(formatEntry), '');
}

mkdirSync(buildDir, {recursive: true});
writeFileSync(join(buildDir, 'llms.txt'), lines.join('\n'));
console.log(`Generated build/llms.txt with ${docs.length + apiDocs.length} entries`);
