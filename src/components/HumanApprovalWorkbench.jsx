import React, { useMemo, useState } from "react";
import { buildApprovalsPayload, validateApprovalRecords } from "./humanApproval.js";

const boxStyle = {
  marginTop: "1rem",
  padding: "1rem",
  border: "1px solid #d0d7de",
  borderRadius: "8px",
  background: "#ffffff",
};

const rowStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", marginTop: "0.7rem" };

const defaultRecords = [
  { reviewer: "", signature: "", decision: "pending", reason: "", reviewed_at: "" },
  { reviewer: "", signature: "", decision: "pending", reason: "", reviewed_at: "" },
];

export default function HumanApprovalWorkbench() {
  const [records, setRecords] = useState(defaultRecords);
  const [approvalStatus, setApprovalStatus] = useState("pending");
  const [logs, setLogs] = useState([]);
  const [errors, setErrors] = useState([]);

  const preparedApprovals = useMemo(() => buildApprovalsPayload(records), [records]);

  const updateRecord = (index, field, value) => {
    setRecords((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const approveChanges = () => {
    const validationErrors = validateApprovalRecords(records, "approved");
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    setApprovalStatus("approved");
    setErrors([]);
    setLogs((prev) => [...prev, `approval records prepared by ${preparedApprovals[0].reviewer} and ${preparedApprovals[1].reviewer}`, "draft approved by two reviewers"]);
  };

  const rejectChanges = () => {
    setApprovalStatus("rejected");
    setLogs((prev) => [...prev, "draft rejected by reviewer workbench"]);
  };

  const applyPolicy = async () => {
    const validationErrors = validateApprovalRecords(records, approvalStatus);
    if (validationErrors.length) {
      setErrors(validationErrors);
      setLogs((prev) => [...prev, "apply blocked: missing approval signatures"]);
      return;
    }

    const body = { approval_status: approvalStatus, approvals: buildApprovalsPayload(records) };
    const res = await fetch("/api/veritas/v1/governance/policy", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      setErrors([`Apply failed with status ${res.status}.`]);
      return;
    }

    setErrors([]);
    setLogs((prev) => [...prev, "governance policy apply request sent with approvals"]);
  };

  return (
    <section style={boxStyle}>
      <h2 style={{ marginTop: 0 }}>Human Approval Workbench</h2>
      {records.map((record, index) => (
        <div key={`reviewer-${index}`} style={rowStyle}>
          <label>
            Reviewer {index + 1}
            <input value={record.reviewer} onChange={(e) => updateRecord(index, "reviewer", e.target.value)} />
          </label>
          <label>
            Signature {index + 1}
            <input value={record.signature} onChange={(e) => updateRecord(index, "signature", e.target.value)} />
          </label>
          <label>
            Decision
            <select value={record.decision} onChange={(e) => updateRecord(index, "decision", e.target.value)}>
              <option value="pending">pending</option>
              <option value="approved">approved</option>
              <option value="rejected">rejected</option>
            </select>
          </label>
          <label>
            Optional reason / note
            <input value={record.reason} onChange={(e) => updateRecord(index, "reason", e.target.value)} />
          </label>
        </div>
      ))}
      <p>Draft approval status: <strong>{approvalStatus}</strong></p>
      {!!errors.length && <ul>{errors.map((error) => <li key={error} style={{ color: "#b00020" }}>{error}</li>)}</ul>}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="button" onClick={approveChanges}>Approve</button>
        <button type="button" onClick={rejectChanges}>Reject</button>
        <button type="button" onClick={applyPolicy}>Apply policy</button>
      </div>
      <h3>TrustLogStream (UI)</h3>
      <ul>
        {logs.map((line, idx) => <li key={`${line}-${idx}`}>{line}</li>)}
      </ul>
    </section>
  );
}
