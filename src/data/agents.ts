export interface AgentCategory {
  id: string;
  name: string;
  agents: AgentInfo[];
}

export interface AgentInfo {
  id: string;
  name: string;
  description: string;
  welcomeMessage: string;
  suggestedQuestions: string[];
  quickActions: QuickAction[];
}

export interface QuickAction {
  label: string;
  icon: "chart" | "warning" | "table" | "report" | "forecast" | "optimize";
  color: string;
}

export const agentCategories: AgentCategory[] = [
  {
    id: "procurement",
    name: "Procurement",
    agents: [
      {
        id: "purchase-assistant",
        name: "Purchase Assistant",
        description: "Assists with purchase orders, vendor management, and procurement workflows.",
        welcomeMessage: "Welcome! I am your Purchase Assistant. I can help you with purchase orders, vendor inquiries, and procurement processes.",
        suggestedQuestions: [
          "Show purchase order summary for this month",
          "What POs are pending approval?",
          "Compare vendor pricing for top 10 items",
        ],
        quickActions: [
          { label: "PO status overview", icon: "chart", color: "purple" },
          { label: "Pending approvals", icon: "warning", color: "yellow" },
          { label: "Vendor comparison", icon: "table", color: "blue" },
          { label: "Spend analysis report", icon: "report", color: "green" },
          { label: "Demand forecast", icon: "forecast", color: "purple" },
          { label: "Optimize reorder quantities", icon: "optimize", color: "orange" },
        ],
      },
      {
        id: "supplier-assistant",
        name: "Supplier Assistant",
        description: "Manages supplier relationships, evaluations, and communications.",
        welcomeMessage: "Welcome! I am your Supplier Assistant. I can help you manage supplier relationships, track performance, and handle communications.",
        suggestedQuestions: [
          "Show supplier performance scorecard",
          "Which suppliers have overdue deliveries?",
          "Generate supplier evaluation report",
        ],
        quickActions: [
          { label: "Supplier scorecard", icon: "chart", color: "purple" },
          { label: "Overdue deliveries", icon: "warning", color: "yellow" },
          { label: "Supplier ranking", icon: "table", color: "blue" },
          { label: "Compliance report", icon: "report", color: "green" },
          { label: "Risk assessment", icon: "forecast", color: "purple" },
          { label: "Optimize supplier mix", icon: "optimize", color: "orange" },
        ],
      },
      {
        id: "quote-agent",
        name: "Freight Quote Agent",
        description: "Handles freight quote requests, rate comparisons, and carrier pricing workflows.",
        welcomeMessage: "Welcome! I am your Freight Quote Agent. I can help you request freight quotes, compare carrier rates, and manage pricing workflows.",
        suggestedQuestions: [
          "Compare latest freight quotes",
          "What quotes are expiring this week?",
          "Show quote-to-shipment conversion rate",
        ],
        quickActions: [
          { label: "Quote comparison chart", icon: "chart", color: "purple" },
          { label: "Expiring quotes", icon: "warning", color: "yellow" },
          { label: "Quote history table", icon: "table", color: "blue" },
          { label: "Savings report", icon: "report", color: "green" },
          { label: "Rate trend forecast", icon: "forecast", color: "purple" },
          { label: "Negotiate recommendations", icon: "optimize", color: "orange" },
        ],
      },
    ],
  },
  {
    id: "inbound",
    name: "Inbound",
    agents: [
      {
        id: "inbound-agent",
        name: "Inbound Agent",
        description: "Manages inbound shipments, receiving, and dock scheduling.",
        welcomeMessage: "Welcome! I am your Inbound Agent. I can help you track inbound shipments, manage receiving processes, and schedule dock appointments.",
        suggestedQuestions: [
          "Print carton labels for IB20250514001",
          "Modify and print labels for IB20250514001",
          "What shipments are arriving today?",
        ],
        quickActions: [
          { label: "Today's inbound shipments", icon: "chart", color: "purple" },
          { label: "Dock schedule", icon: "table", color: "blue" },
          { label: "Pending receiving", icon: "warning", color: "yellow" },
        ],
      },
    ],
  },
  {
    id: "inventory",
    name: "Inventory",
    agents: [
      {
        id: "inventory-advisor",
        name: "Inventory Advisor",
        description: "Provides inventory insights, stock level monitoring, and replenishment recommendations.",
        welcomeMessage: "Welcome! I am your Inventory Advisor. I can help you monitor stock levels, identify low inventory, and provide replenishment recommendations.",
        suggestedQuestions: [
          "Show inventory health overview",
          "What items are below reorder point?",
          "Generate inventory turnover analysis",
        ],
        quickActions: [
          { label: "Show inventory health overview", icon: "chart", color: "purple" },
          { label: "Items below reorder point", icon: "warning", color: "yellow" },
          { label: "Inventory turnover analysis", icon: "table", color: "blue" },
          { label: "Dead stock report", icon: "report", color: "green" },
          { label: "Demand forecast for next month", icon: "forecast", color: "purple" },
          { label: "Optimize reorder quantities", icon: "optimize", color: "orange" },
        ],
      },
    ],
  },
  {
    id: "order-processing",
    name: "Order Processing",
    agents: [
      {
        id: "sales-assistant",
        name: "Sales Assistant",
        description: "Supports sales order creation, tracking, and customer communications.",
        welcomeMessage: "Welcome! I am your Sales Assistant. I can help you create sales orders, track order status, and manage customer communications.",
        suggestedQuestions: [
          "Show pending sales orders",
          "What's the order fulfillment rate this week?",
          "Top customers by order volume",
        ],
        quickActions: [
          { label: "Order volume trend", icon: "chart", color: "purple" },
          { label: "Pending orders", icon: "warning", color: "yellow" },
          { label: "Customer order table", icon: "table", color: "blue" },
          { label: "Fulfillment report", icon: "report", color: "green" },
          { label: "Sales forecast", icon: "forecast", color: "purple" },
          { label: "Optimize order routing", icon: "optimize", color: "orange" },
        ],
      },
      {
        id: "work-order-agent",
        name: "Work Order Agent",
        description: "Manages work orders, task assignments, and production scheduling.",
        welcomeMessage: "Welcome! I am your Work Order Agent. I can help you create and track work orders, assign tasks, and manage production schedules.",
        suggestedQuestions: [
          "What work orders are in progress?",
          "Show production schedule for this week",
          "Any overdue work orders?",
        ],
        quickActions: [
          { label: "Work order status chart", icon: "chart", color: "purple" },
          { label: "Overdue work orders", icon: "warning", color: "yellow" },
          { label: "Production schedule", icon: "table", color: "blue" },
          { label: "Completion report", icon: "report", color: "green" },
          { label: "Capacity forecast", icon: "forecast", color: "purple" },
          { label: "Optimize task assignment", icon: "optimize", color: "orange" },
        ],
      },
    ],
  },
  {
    id: "outbound",
    name: "Outbound",
    agents: [
      {
        id: "outbound-agent",
        name: "Outbound Agent",
        description: "Handles outbound shipment processing, picking, packing, and shipping label uploads.",
        welcomeMessage: "Welcome! I am your Outbound Agent. I can help you manage outbound shipments, upload shipping labels, track picking and packing progress, and resolve shipping issues.",
        suggestedQuestions: [
          "Upload shipping label for DN-3654668",
          "Show today's outbound shipments",
          "What orders are ready for dispatch?",
        ],
        quickActions: [
          { label: "Upload shipping label", icon: "optimize", color: "green" },
          { label: "Today's outbound shipments", icon: "chart", color: "purple" },
          { label: "Delayed shipments", icon: "warning", color: "yellow" },
          { label: "Picking progress", icon: "table", color: "blue" },
        ],
      },
      {
        id: "dispatch-coordinator",
        name: "Dispatch Coordinator",
        description: "Coordinates dispatch scheduling, carrier assignments, and delivery tracking.",
        welcomeMessage: "Welcome! I am your Dispatch Coordinator. I can help you schedule dispatches, assign carriers, and track deliveries.",
        suggestedQuestions: [
          "What dispatches are scheduled today?",
          "Show carrier performance metrics",
          "Any delivery exceptions?",
        ],
        quickActions: [
          { label: "Dispatch schedule", icon: "chart", color: "purple" },
          { label: "Delivery exceptions", icon: "warning", color: "yellow" },
          { label: "Carrier performance", icon: "table", color: "blue" },
          { label: "On-time delivery report", icon: "report", color: "green" },
          { label: "Route optimization", icon: "forecast", color: "purple" },
          { label: "Optimize carrier mix", icon: "optimize", color: "orange" },
        ],
      },
    ],
  },
  {
    id: "transportation-logistics",
    name: "Transportation & Logistics",
    agents: [
      {
        id: "yms-agent",
        name: "YMS Agent",
        description: "Manages yard operations, trailer tracking, and dock door assignments.",
        welcomeMessage: "Welcome! I am your YMS Agent. I can help you manage yard operations, track trailers, and assign dock doors.",
        suggestedQuestions: [
          "Show current yard status",
          "How many trailers are waiting?",
          "Dock door utilization report",
        ],
        quickActions: [
          { label: "Yard occupancy chart", icon: "chart", color: "purple" },
          { label: "Waiting trailers", icon: "warning", color: "yellow" },
          { label: "Dock assignment table", icon: "table", color: "blue" },
          { label: "Dwell time report", icon: "report", color: "green" },
          { label: "Traffic forecast", icon: "forecast", color: "purple" },
          { label: "Optimize dock assignments", icon: "optimize", color: "orange" },
        ],
      },
      {
        id: "small-parcel-agent",
        name: "Small Parcel Agent",
        description: "Handles small parcel shipping, rate shopping, and label generation.",
        welcomeMessage: "Welcome! I am your Small Parcel Agent. I can help you with parcel shipping, compare carrier rates, and generate shipping labels.",
        suggestedQuestions: [
          "Compare shipping rates for a package",
          "Show parcel volume by carrier",
          "What's the average delivery time?",
        ],
        quickActions: [
          { label: "Rate comparison chart", icon: "chart", color: "purple" },
          { label: "Failed deliveries", icon: "warning", color: "yellow" },
          { label: "Carrier volume table", icon: "table", color: "blue" },
          { label: "Cost savings report", icon: "report", color: "green" },
          { label: "Volume forecast", icon: "forecast", color: "purple" },
          { label: "Optimize carrier selection", icon: "optimize", color: "orange" },
        ],
      },
      {
        id: "ltl-agent",
        name: "LTL Agent",
        description: "Manages less-than-truckload shipments, freight quotes, and carrier selection.",
        welcomeMessage: "Welcome! I am your LTL Agent. I can help you manage LTL shipments, get freight quotes, and select optimal carriers.",
        suggestedQuestions: [
          "Get LTL freight quotes",
          "Show LTL shipment status",
          "Compare LTL carrier rates",
        ],
        quickActions: [
          { label: "Freight cost trend", icon: "chart", color: "purple" },
          { label: "Shipment delays", icon: "warning", color: "yellow" },
          { label: "Carrier rate table", icon: "table", color: "blue" },
          { label: "LTL spend report", icon: "report", color: "green" },
          { label: "Demand forecast", icon: "forecast", color: "purple" },
          { label: "Consolidation opportunities", icon: "optimize", color: "orange" },
        ],
      },
    ],
  },
  {
    id: "supply-chain-analysis",
    name: "Supply Chain Analysis",
    agents: [
      {
        id: "supply-chain-agent",
        name: "Supply Chain Agent",
        description: "Provides supply chain analytics, optimization insights, and performance metrics.",
        welcomeMessage: "Welcome! I am your Supply Chain Agent. I can help you analyze supply chain performance, identify bottlenecks, and provide optimization recommendations.",
        suggestedQuestions: [
          "Show supply chain performance metrics",
          "Where are the current bottlenecks?",
          "End-to-end lead time analysis",
        ],
        quickActions: [
          { label: "Performance dashboard", icon: "chart", color: "purple" },
          { label: "Bottleneck alerts", icon: "warning", color: "yellow" },
          { label: "Lead time breakdown", icon: "table", color: "blue" },
          { label: "Efficiency report", icon: "report", color: "green" },
          { label: "Disruption forecast", icon: "forecast", color: "purple" },
          { label: "Optimize flow paths", icon: "optimize", color: "orange" },
        ],
      },
    ],
  },
  {
    id: "exception-handling",
    name: "Exception Handling",
    agents: [
      {
        id: "exception-handler",
        name: "Exception Handler",
        description: "Manages exceptions, alerts, and resolution workflows across operations.",
        welcomeMessage: "Welcome! I am your Exception Handler. I can help you identify, track, and resolve operational exceptions and alerts.",
        suggestedQuestions: [
          "Show open exceptions",
          "What are the critical alerts today?",
          "Exception resolution time analysis",
        ],
        quickActions: [
          { label: "Exception trend chart", icon: "chart", color: "purple" },
          { label: "Critical alerts", icon: "warning", color: "yellow" },
          { label: "Open exceptions table", icon: "table", color: "blue" },
          { label: "Resolution time report", icon: "report", color: "green" },
          { label: "Predict recurring issues", icon: "forecast", color: "purple" },
          { label: "Auto-resolution rules", icon: "optimize", color: "orange" },
        ],
      },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    agents: [
      {
        id: "finance-specialist",
        name: "Finance Specialist",
        description: "Assists with invoicing, payment tracking, and financial reporting.",
        welcomeMessage: "Welcome! I am your Finance Specialist. I can help you with invoicing, payment tracking, financial reports, and billing inquiries.",
        suggestedQuestions: [
          "Show outstanding invoices",
          "What payments are overdue?",
          "Monthly revenue breakdown",
        ],
        quickActions: [
          { label: "Revenue trend chart", icon: "chart", color: "purple" },
          { label: "Overdue payments", icon: "warning", color: "yellow" },
          { label: "Invoice aging table", icon: "table", color: "blue" },
          { label: "Financial summary report", icon: "report", color: "green" },
          { label: "Cash flow forecast", icon: "forecast", color: "purple" },
          { label: "Optimize payment terms", icon: "optimize", color: "orange" },
        ],
      },
    ],
  },
  {
    id: "system-profile",
    name: "System & Profile",
    agents: [
      {
        id: "system-profile-agent",
        name: "System & Profile Agent",
        description: "Manages system settings, user profiles, and configuration tasks.",
        welcomeMessage: "Welcome! I am your System & Profile Agent. I can help you manage system settings, update user profiles, and handle configuration tasks.",
        suggestedQuestions: [
          "Show my profile settings",
          "What system notifications are active?",
          "User activity summary",
        ],
        quickActions: [
          { label: "System health chart", icon: "chart", color: "purple" },
          { label: "Active notifications", icon: "warning", color: "yellow" },
          { label: "User activity table", icon: "table", color: "blue" },
          { label: "Audit log report", icon: "report", color: "green" },
          { label: "Usage forecast", icon: "forecast", color: "purple" },
          { label: "Optimize settings", icon: "optimize", color: "orange" },
        ],
      },
    ],
  },
];

// Flatten all agents for easy lookup
export const allAgents = agentCategories.flatMap((cat) => cat.agents);
