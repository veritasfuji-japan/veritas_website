#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), "..");
const claimsPath = path.join(repoRoot, "src", "data", "claims.json");

function loadClaims() {
  return JSON.parse(fs.readFileSync(claimsPath, "utf8")).claims ?? [];
}

async function requestProofUrl(url, method) {
  return fetch(url, {
    method,
    redirect: "follow",
    headers: {
      "user-agent": "veritas-website-proof-url-check/1.0",
    },
  });
}

async function checkProofUrl(claim) {
  const url = claim.proof_url;
  if (!url) {
    return {
      claimId: claim.id,
      url: "(missing)",
      status: "missing proof_url",
    };
  }

  let response;
  try {
    response = await requestProofUrl(url, "HEAD");
    if (response.status === 405 || response.status === 501) {
      response = await requestProofUrl(url, "GET");
    }
  } catch (error) {
    return {
      claimId: claim.id,
      url,
      status: error.message,
    };
  }

  if (!response.ok) {
    return {
      claimId: claim.id,
      url,
      status: `${response.status} ${response.statusText}`.trim(),
    };
  }

  return null;
}

const failures = [];
for (const claim of loadClaims()) {
  const failure = await checkProofUrl(claim);
  if (failure) {
    failures.push(failure);
  }
}

if (failures.length > 0) {
  console.error("Proof URL guardrail failed.\n");
  for (const failure of failures) {
    console.error(`- claim_id: ${failure.claimId}`);
    console.error(`  proof_url: ${failure.url}`);
    console.error(`  status: ${failure.status}`);
  }
  process.exit(1);
}

console.log("Proof URL guardrail passed.");
