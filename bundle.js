#!/usr/bin/env node
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync, rmSync } from "node:fs";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const viteBin = path.join(rootDir, "node_modules", ".bin", "vite");
const KEEP_IN_DIST = new Set(["index.js"]);

async function bundle(bundleRoot) {
  return new Promise((resolve, reject) => {
    console.log(`\nBundling ${bundleRoot}...`);
    const proc = spawn(
      viteBin,
      ["build", "--config", "vite.bundle.config.ts"],
      {
        env: { ...process.env, BUNDLE_ROOT: bundleRoot },
        stdio: "inherit",
        cwd: rootDir,
      },
    );
    proc.on("close", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`Failed to bundle ${bundleRoot}`)),
    );
  });
}

function pruneDist(distDir) {
  for (const name of readdirSync(distDir)) {
    if (KEEP_IN_DIST.has(name)) continue;
    const full = path.join(distDir, name);
    rmSync(full, { recursive: true });
  }
}

await bundle(rootDir);
pruneDist(path.join(rootDir, "dist"));
