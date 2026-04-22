/**
 * Unofficial study aid — not affiliated with CompTIA.
 * Domain names and exam weights follow the public SY0-701 certification blueprint summary.
 */
window.SEC_PLUS_DATA = {
  exam: {
    code: "SY0-701",
    name: "CompTIA Security+",
    note: "Always pair third-party notes with official CompTIA SY0-701 learning resources and practice tests.",
  },

  domains: [
    {
      id: "sy701-d1",
      order: 1,
      weight: 12,
      title: "General Security Concepts",
      subtitle: "Controls, CIA, governance, change & resilience basics, crypto concepts",
      icon: `<svg class="domain-icon" viewBox="0 0 48 48" aria-hidden="true"><rect x="10" y="14" width="28" height="22" rx="3" fill="#0f172a" stroke="#22d3ee" stroke-width="2"/><path d="M16 22h16M16 28h10" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/></svg>`,
      bullets: [
        "Control types to think in: preventive, detective, corrective, deterrent, compensating—and where physical controls fit.",
        "CIA plus friends: authenticity, non-repudiation, AAA (authn / authz / accounting) show up constantly in scenario questions.",
        "Change management ties security to reliability: approvals, rollback, and emergency changes still need evidence.",
        "Resilience vocabulary: redundancy, replication, fault tolerance, BCP/DRP—know intent, not just acronyms.",
        "Cryptography at concept level: hashing vs encryption, symmetric vs asymmetric, key exchange vs data protection.",
      ],
    },
    {
      id: "sy701-d2",
      order: 2,
      weight: 22,
      title: "Threats, Vulnerabilities, and Mitigations",
      subtitle: "Actors, attacks, vuln types, countermeasures, validation",
      icon: `<svg class="domain-icon" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="18" fill="#0f172a" stroke="#fb7185" stroke-width="2"/><path d="M16 28c2-6 6-10 16-10" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/><circle cx="30" cy="18" r="3" fill="#fbbf24"/></svg>`,
      bullets: [
        "Map threats to mitigations: phishing → awareness + MFA + email controls; weak defaults → hardening + baselines.",
        "Application & web attacks: injection, XSS, CSRF, API abuse—know what each breaks (integrity, sessions, data).",
        "Network & wireless: rogue AP, evil twin, on-path—think detection (NAC, monitoring) and segmentation.",
        "Vulnerability management: scanning cadence, prioritization (e.g. EPSS/CISA KEV mindset), patch exceptions with risk acceptance.",
        "Validation: pentesting vs vulnerability assessment; rules of engagement and scope reduce legal and operational risk.",
      ],
    },
    {
      id: "sy701-d3",
      order: 3,
      weight: 18,
      title: "Security Architecture",
      subtitle: "Enterprise, hybrid & cloud models, segmentation, data protection",
      icon: `<svg class="domain-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 34 L24 10 L40 34 Z" fill="#0f172a" stroke="#a78bfa" stroke-width="2"/><rect x="18" y="26" width="12" height="10" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/></svg>`,
      bullets: [
        "Reference architectures: identify trust boundaries between users, devices, apps, identity providers, and data stores.",
        "Cloud & hybrid: shared responsibility model—who patches the hypervisor vs who configures storage ACLs and IAM.",
        "Segmentation patterns: VLANs, micro-segmentation, zero trust (continuous verification, least privilege per request).",
        "Data protection: DLP, tokenization, masking, encryption at rest/in transit; residency and sovereignty constraints.",
        "Physical & environmental: access layers, surveillance, fire suppression, HVAC—small details appear in case studies.",
      ],
    },
    {
      id: "sy701-d4",
      order: 4,
      weight: 28,
      title: "Security Operations",
      subtitle: "Monitoring, automation, IR, forensics, recovery",
      icon: `<svg class="domain-icon" viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="12" width="32" height="26" rx="3" fill="#0f172a" stroke="#34d399" stroke-width="2"/><path d="M14 30 L20 24 L26 30 L34 18" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      bullets: [
        "Telemetry: firewall, DNS, proxy, EDR, DHCP, authentication logs—correlate time, user, host, and destination.",
        "SOAR/SIEM playbooks: automation for enrichment, ticketing, containment—human approval for destructive actions.",
        "IR lifecycle: preparation through lessons learned; communication plan is as exam-relevant as technical steps.",
        "Forensics mindset: order of volatility, chain of custody, validated images—avoid ‘fix first, investigate never’ traps.",
        "Recovery: backups (3-2-1), tested restores, alternate sites—RTO/RPO language shows up in continuity items.",
      ],
    },
    {
      id: "sy701-d5",
      order: 5,
      weight: 20,
      title: "Security Program Management & Oversight",
      subtitle: "Risk, compliance, third parties, awareness",
      icon: `<svg class="domain-icon" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="20" r="10" fill="#0f172a" stroke="#fbbf24" stroke-width="2"/><path d="M12 38c3-6 9-9 12-9s9 3 12 9" fill="none" stroke="#fbbf24" stroke-width="2"/></svg>`,
      bullets: [
        "Risk: identify → analyze → treat (avoid, mitigate, transfer, accept) with owners, not anonymous ‘the business’.",
        "Compliance vs security: frameworks (ISO, NIST, etc.) guide control selection; audits verify implementation.",
        "Third-party risk: contracts, right-to-audit, supply chain attestation, vendor offboarding and data return.",
        "Policies / standards / procedures / guidelines: exam prose often tests which document should change for a given gap.",
        "Awareness & culture: role-based training, phishing reporting metrics, executive support as a program ingredient.",
      ],
    },
  ],

  scenarios: [
    {
      prompt:
        "Finance reports odd outbound DNS queries from a workstation at 2 a.m. No user is logged in.",
      choices: [
        { text: "Immediately re-image the workstation", correct: false },
        { text: "Isolate the host and preserve volatile artifacts", correct: true },
        { text: "Ignore until business hours", correct: false },
        { text: "Disable DNS globally", correct: false },
      ],
      explain:
        "Per IR best practice: contain the endpoint to limit lateral movement, then preserve volatile evidence (memory, connections) before it is lost.",
    },
    {
      prompt: "A vendor email asks you to 'verify' payroll credentials on a look-alike domain.",
      choices: [
        { text: "Forward to everyone as a warning", correct: false },
        { text: "Report via official abuse/phishing channel and block the domain", correct: true },
        { text: "Click the link from a sandbox machine without telling anyone", correct: false },
        { text: "Reply with your credentials to confirm if it is real", correct: false },
      ],
      explain:
        "Program oversight + operations: use defined reporting, block IOCs, and track user education—never disclose secrets to unverified parties.",
    },
    {
      prompt: "A critical CVE drops for your edge VPN appliance; active exploitation is confirmed.",
      choices: [
        { text: "Schedule patch next quarter", correct: false },
        { text: "Emergency change: mitigate (rules/WAF) then patch with rollback plan", correct: true },
        { text: "Disable logging to reduce noise", correct: false },
        { text: "Post details publicly before patching", correct: false },
      ],
      explain:
        "Threats & mitigations + architecture: treat as emergency change with compensating controls, tested patching, and coordinated disclosure internally.",
    },
    {
      prompt:
        "Internal audit finds a SaaS admin account with no MFA, full org-wide access, and shared credentials in a runbook.",
      choices: [
        { text: "Accept the risk verbally in the hallway", correct: false },
        { text: "Document risk, enforce MFA, break glass credentials, and update standards", correct: true },
        { text: "Delete the audit report to reduce findings count", correct: false },
        { text: "Share the runbook publicly for transparency", correct: false },
      ],
      explain:
        "Domain 5 governance: formal risk treatment, technical compensating controls (MFA), and updating standards/procedures beats informal acceptance.",
    },
  ],

  matchPairs: [
    {
      control: "Administrative",
      story: "Security policy mandates MFA for all remote access.",
    },
    {
      control: "Technical",
      story: "Firewall rule blocks inbound RDP from the internet.",
    },
    {
      control: "Physical",
      story: "Server room requires badge + biometric entry.",
    },
  ],

  cryptoQuiz: [
    {
      q: "Which property does a digital signature primarily provide?",
      choices: ["Confidentiality", "Integrity + authenticity", "Availability", "Obfuscation"],
      answer: 1,
      explain: "SY0-701 crypto concepts: signatures prove source and detect tampering; use encryption when you need confidentiality.",
    },
    {
      q: "AES is best described as…",
      choices: ["Asymmetric stream cipher", "Symmetric block cipher", "Hash function", "Key exchange protocol"],
      answer: 1,
      explain: "AES is symmetric block encryption (128-bit blocks; common key sizes 128/192/256).",
    },
    {
      q: "A birthday attack primarily targets…",
      choices: ["TCP sequence prediction", "Hash collision probability", "Certificate transparency logs", "DNS cache"],
      answer: 1,
      explain: "Collision resistance of hashes: birthday math reduces brute-force work versus naive expectations.",
    },
    {
      q: "TLS 1.3 generally prefers which key exchange style?",
      choices: ["Static RSA key transport", "Ephemeral (forward secrecy) exchanges", "Cleartext pre-master", "DES-based KDC"],
      answer: 1,
      explain: "Modern suites favor ephemeral (EC)DH so past sessions resist key compromise later (forward secrecy).",
    },
    {
      q: "Which pairing best fits zero trust for SY0-701 scenarios?",
      choices: [
        "Trust the LAN; verify at the perimeter only",
        "Verify explicitly; assume breach; use least privilege continuously",
        "Disable all logging to reduce attack surface",
        "Use one shared admin password for speed",
      ],
      answer: 1,
      explain: "Zero trust: continuous verification, micro-segmentation, identity-centric access—not 'trust internal IP ranges by default'.",
    },
  ],
};
