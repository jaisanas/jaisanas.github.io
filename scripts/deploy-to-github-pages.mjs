import { execSync } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const REPO = 'git@github.com:jaisanas/jaisanas.github.io.git'
const BRANCH = 'master'
const distDir = join(process.cwd(), 'dist')

const workDir = mkdtempSync(join(tmpdir(), 'gh-pages-deploy-'))
const cloneDir = join(workDir, 'repo')

execSync(`git clone --depth 1 --branch ${BRANCH} ${REPO} "${cloneDir}"`, {
  stdio: 'inherit',
})

for (const entry of execSync(`ls -A "${cloneDir}"`, { encoding: 'utf8' }).trim().split('\n')) {
  if (entry && entry !== '.git') {
    rmSync(join(cloneDir, entry), { recursive: true, force: true })
  }
}

mkdirSync(cloneDir, { recursive: true })
cpSync(distDir, cloneDir, { recursive: true })
writeFileSync(join(cloneDir, '.nojekyll'), '')

execSync('git add -A', { cwd: cloneDir, stdio: 'inherit' })

const changes = execSync('git status --porcelain', {
  cwd: cloneDir,
  encoding: 'utf8',
}).trim()

if (!changes) {
  console.log('No changes to deploy.')
} else {
  execSync('git commit -m "Deploy portfolio site"', { cwd: cloneDir, stdio: 'inherit' })
  execSync(`git push origin ${BRANCH}`, { cwd: cloneDir, stdio: 'inherit' })
  console.log('Deployed to https://jaisanas.github.io/')
}

rmSync(workDir, { recursive: true, force: true })
