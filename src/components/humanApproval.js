/**
 * Human approval helpers for governance policy apply requests.
 */

/**
 * @typedef {Object} ApprovalRecord
 * @property {string} reviewer
 * @property {string} signature
 * @property {"approved"|"rejected"|"pending"} decision
 * @property {string=} reason
 * @property {string=} reviewed_at
 */

/**
 * Validate 4-eyes style approval records before apply.
 * @param {ApprovalRecord[]} approvals
 * @param {string} approvalStatus
 * @returns {string[]}
 */
export function validateApprovalRecords(approvals, approvalStatus) {
  const errors = [];
  if (approvalStatus === "rejected") {
    errors.push("Apply is blocked while draft approval status is rejected.");
  }

  const prepared = approvals.filter((item) => item.reviewer.trim() || item.signature.trim());
  if (prepared.length < 2) {
    errors.push("At least two approval records are required.");
  }

  for (const [index, item] of prepared.entries()) {
    if (!item.reviewer.trim()) {
      errors.push(`Reviewer ${index + 1} is required.`);
    }
    if (!item.signature.trim()) {
      errors.push(`Signature ${index + 1} is required.`);
    }
  }

  const reviewerSet = new Set(prepared.map((item) => item.reviewer.trim()).filter(Boolean));
  if (prepared.length >= 2 && reviewerSet.size !== prepared.length) {
    errors.push("Reviewers must be unique.");
  }

  const signatureSet = new Set(prepared.map((item) => item.signature.trim()).filter(Boolean));
  if (prepared.length >= 2 && signatureSet.size !== prepared.length) {
    errors.push("Signatures must be unique.");
  }

  return errors;
}

/**
 * Build backend-compatible approvals payload.
 * @param {ApprovalRecord[]} approvals
 * @returns {Array<{reviewer:string,signature:string,reason?:string,reviewed_at?:string}>}
 */
export function buildApprovalsPayload(approvals) {
  return approvals
    .filter((item) => item.reviewer.trim() && item.signature.trim())
    .map((item) => ({
      reviewer: item.reviewer.trim(),
      signature: item.signature.trim(),
      ...(item.reason?.trim() ? { reason: item.reason.trim() } : {}),
      ...(item.reviewed_at?.trim() ? { reviewed_at: item.reviewed_at.trim() } : {}),
    }));
}
