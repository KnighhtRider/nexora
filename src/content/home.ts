export const homeContent = {
  hero: {
    eyebrow: "NEXORA AI",
    h1: "Intelligence that moves business forward.",
    supporting:
      "NEXORA is designed to connect business systems, agents and workflows, with human oversight for decisions that need it.",
    ctas: [
      { label: "Explore the Platform", href: "/platform" },
      { label: "Request a Demo", href: "/request-demo" },
    ],
    claims: ["C-001", "C-004"],
  },
  problem: {
    eyebrow: "Start with the work",
    headline: "Where does context need to travel?",
    supporting:
      "Use these prompts to consider how systems, handoffs and information connect across complex work.",
    items: [
      {
        title: "Disconnected systems",
        description: "Where does context need to move between separate tools?",
        icon: "Unplug",
      },
      {
        title: "Manual processes",
        description: "Which repeatable checks call for human judgment?",
        icon: "Hand",
      },
      {
        title: "Fragmented knowledge",
        description: "Which information should be easier for your team to locate?",
        icon: "Layers",
      },
    ],
    claims: [],
  },
  platformPillars: {
    eyebrow: "The platform",
    headline: "Three proposed modules. One connected vision.",
    supporting:
      "Agents, Flow and Intelligence are proposed capabilities designed to connect task execution, workflow coordination and organizational knowledge.",
    items: [
      {
        title: "NEXORA Agents",
        description:
          "Task-oriented agents designed to use organizational context and approved tools.",
        icon: "Bot",
        status: "Concept",
      },
      {
        title: "NEXORA Flow",
        description:
          "Multi-step workflows designed to coordinate applications, agents and human decisions.",
        icon: "Workflow",
        status: "Concept",
      },
      {
        title: "NEXORA Intelligence",
        description:
          "Proposed capabilities for knowledge retrieval, document understanding and contextual insights.",
        icon: "BrainCircuit",
        status: "Concept",
      },
    ],
    cta: { label: "See how the modules fit", href: "/platform" },
    claims: ["C-001", "C-002"],
  },
  howItWorks: {
    eyebrow: "How it works",
    headline: "Connect. Understand. Coordinate. Review.",
    items: [
      {
        title: "Connect",
        description: "Design integrations around governed, approved access.",
        icon: "Plug",
      },
      {
        title: "Understand",
        description: "Use documents and business context to inform defined workflow steps.",
        icon: "ScanText",
      },
      {
        title: "Coordinate",
        description: "Bring applications, proposed agents and people into defined workflows.",
        icon: "GitBranch",
      },
      {
        title: "Review",
        description: "Keep records for human review and future process decisions.",
        icon: "RefreshCw",
      },
    ],
    claims: ["C-001", "C-004", "C-006", "C-007"],
  },
  demo: {
    eyebrow: "Interactive simulation",
    headline: "See a sample invoice workflow step by step.",
    supporting:
      "Explore sample-data extraction, policy checks and a simulated human approval step.",
    simulationLabel:
      "Interactive simulation using sample data. No real invoice, AI model or ERP is involved.",
    claims: ["C-003"],
  },
  useCases: {
    eyebrow: "Use cases",
    headline: "Explore where intelligent workflows may help.",
    items: [
      {
        title: "Document processing",
        description: "Explore how invoices, contracts and forms might become structured data.",
        icon: "FileText",
      },
      {
        title: "Knowledge assistance",
        description:
          "Consider how teams could find answers across internal documents with source references.",
        icon: "MessageSquareText",
      },
      {
        title: "Workflow automation",
        description: "Design repeatable multi-step workflows with human review at selected points.",
        icon: "Cog",
      },
      {
        title: "Operational intelligence",
        description:
          "Explore how contextual insights could help teams review operational patterns.",
        icon: "LineChart",
      },
    ],
    cta: { label: "Explore solutions", href: "/solutions" },
    claims: ["C-008"],
  },
  technologyAndTrust: {
    eyebrow: "Technology and trust",
    headline: "Governance shapes the design.",
    supporting:
      "The NEXORA concept emphasizes controlled integrations, human oversight and reviewable records. No certifications are claimed.",
    items: [
      {
        title: "Integrations",
        description: "Design connections around governed, least-privilege access.",
        icon: "Cable",
      },
      {
        title: "Governance",
        description: "Define which roles and tools could act on specified data.",
        icon: "ShieldCheck",
      },
      {
        title: "Human oversight",
        description: "Route selected decisions for review by people.",
        icon: "UserCheck",
      },
      {
        title: "Observability",
        description: "Keep a reviewable record of steps and decisions.",
        icon: "Activity",
      },
    ],
    cta: { label: "Read the technology approach", href: "/technology" },
    claims: ["C-004", "C-006", "C-007"],
  },
  closingCta: {
    headline: "The future of business is intelligent.",
    supporting:
      "Explore the interactive simulation and discuss where the platform concept might fit your operations.",
    cta: { label: "Request a Demo", href: "/request-demo" },
    claims: ["C-003"],
  },
} as const;
