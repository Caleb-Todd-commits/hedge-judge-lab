import { writeFileSync } from "node:fs";
import { evaluateUpload } from "../lib/upload-policy.js";

const rejected = [
  { authenticated: false, ownerId: "user-123", type: "image/png", size: 1 },
  { authenticated: true, ownerId: "", type: "image/png", size: 1 },
  { authenticated: true, ownerId: "user-123", type: "application/x-executable", size: 1 },
  { authenticated: true, ownerId: "user-123", type: "image/png", size: 5_000_001 }
].every((upload) => !evaluateUpload(upload).accepted);

const outcome = rejected
  ? {
      outcome: "blocked-by-control",
      reason: "Authentication, ownership, content type, and size boundaries rejected independently."
    }
  : {
      outcome: "reproduced",
      reason: "At least one required upload boundary was not enforced."
    };
const serialized = `${JSON.stringify(outcome)}\n`;

if (process.env.HEDGE_OUTCOME_PATH) {
  writeFileSync(process.env.HEDGE_OUTCOME_PATH, serialized, {
    encoding: "utf8",
    mode: 0o600
  });
}
process.stdout.write(serialized);
if (!rejected) process.exitCode = 1;
