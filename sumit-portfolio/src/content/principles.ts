/**
 * 02 · PRINCIPLES — how this engineer thinks, each anchored to
 * something real. These are the lines an EM quotes in a debrief.
 */
export const principles = [
  {
    line: "Permissions are architecture, not middleware.",
    anchor:
      "Tier-3 RBAC at Technocraze — module-, role-, and field-level granularity designed into the data model, not bolted on.",
  },
  {
    line: "Systems should heal themselves before paging a human.",
    anchor:
      "Self-healing permission sync on startup: ~90% fewer permission-related incidents.",
  },
  {
    line: "Latency is a feature with a budget.",
    anchor:
      "30% reduction in average API response time at TechPro via query optimisation and indexing strategy.",
  },
  {
    line: "Real-time is a consistency problem wearing a UX costume.",
    anchor:
      "State-aware Socket.IO broadcast targeted across sessions and browsers in Acurio.",
  },
] as const;
