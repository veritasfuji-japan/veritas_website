import assert from "node:assert/strict";
import { buildApprovalsPayload, validateApprovalRecords } from "../src/components/humanApproval.js";

const baseRecords = [
  { reviewer: "reviewerA", signature: "sigA", decision: "approved", reason: "ok" },
  { reviewer: "reviewerB", signature: "sigB", decision: "approved", reason: "ok" },
];

{
  const errors = validateApprovalRecords(baseRecords, "approved");
  assert.equal(errors.length, 0);
  const payload = buildApprovalsPayload(baseRecords);
  assert.equal(payload.length, 2);
  assert.equal(payload[0].reviewer, "reviewerA");
}

{
  const dupReviewer = [
    { reviewer: "same", signature: "sigA", decision: "approved" },
    { reviewer: "same", signature: "sigB", decision: "approved" },
  ];
  const errors = validateApprovalRecords(dupReviewer, "approved");
  assert.ok(errors.includes("Reviewers must be unique."));
}

{
  const dupSignature = [
    { reviewer: "r1", signature: "same", decision: "approved" },
    { reviewer: "r2", signature: "same", decision: "approved" },
  ];
  const errors = validateApprovalRecords(dupSignature, "approved");
  assert.ok(errors.includes("Signatures must be unique."));
}

{
  const errors = validateApprovalRecords(baseRecords, "rejected");
  assert.ok(errors.includes("Apply is blocked while draft approval status is rejected."));
}

console.log("humanApproval tests passed");
