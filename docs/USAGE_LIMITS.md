# Usage Limits and Abuse Protection

Ovrino now has a shared usage-policy module for both the mobile flow and the future server provider boundary.

## Current policy

- Maximum text length: 5,000 characters per speech request
- Maximum requests: 20 per rolling hour in the client policy
- Empty text is rejected
- Rate-limit responses expose a retry duration

## Server requirement

The client guard is a UX and cost-safety layer, not a security boundary. A production backend must enforce the same policy server-side using durable per-user or per-IP state and provider-specific cost limits.

The server guard intentionally avoids pretending an in-memory map is sufficient for a multi-instance deployment.
