export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface SavedCase {
  id: string;
  name: string;
  createdAt: Date;
  agentName: string;
  summary: SummaryCard[];
  alerts: AlertItem[];
  tableData: TableRow[];
  tableColumns: string[];
}

export interface SummaryCard {
  label: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  color: "purple" | "green" | "orange" | "blue";
}

export interface AlertItem {
  type: "warning" | "info" | "success";
  message: string;
}

export interface TableRow {
  [key: string]: string | number;
}
