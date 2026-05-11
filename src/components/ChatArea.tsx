"use client";

import { useState, useEffect } from "react";
import { AgentInfo } from "@/data/agents";
import { ChatMessage, SavedCase } from "@/types/agent";
import ResultPanel from "@/components/ResultPanel";
import SaveCaseModal from "@/components/SaveCaseModal";
import { useTheme } from "@/context/ThemeContext";

export interface ResultItem {
  id: string;
  title: string;
  type: "chart" | "table" | "alert";
  content: ResultContent;
  timestamp: Date;
}

export interface ResultContent {
  chartType?: string;
  data?: any;
  summary?: string;
}

interface ChatAreaProps {
  agent: AgentInfo;
  onBack: () => void;
  initialMessage?: string;
  onSaveCase?: (caseData: SavedCase) => void;
}

export default function ChatArea({ agent, onBack, initialMessage, onSaveCase }: ChatAreaProps) {
  const { theme } = useTheme();
  const d = theme === "dark";
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [currentCaseData, setCurrentCaseData] = useState<SavedCase | null>(null);
  const [followUpGuide, setFollowUpGuide] = useState<string>("");
  const [suggestedFollowUps, setSuggestedFollowUps] = useState<string[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Handle initial message from Agents page chat input
  useEffect(() => {
    if (initialMessage) {
      processMessage(initialMessage);
    }
  }, []);

  const addResult = (result: ResultItem) => {
    setResults((prev) => {
      const updated = [result, ...prev];
      return updated.slice(0, 3);
    });
    setCurrentCaseData(generateCaseData(result.title, agent.name));
    // Generate follow-up guidance based on the result
    const guidance = generateFollowUpGuidance(result.title);
    setFollowUpGuide(guidance.guide);
    setSuggestedFollowUps(guidance.questions);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    processMessage(inputValue);
    setInputValue("");
  };

  const processMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const response = generateResponse(agent.id, text);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (response.result) {
        addResult(response.result);
      }
    }, 800);
  };

  const handleQuestionClick = (question: string) => {
    processMessage(question);
  };

  const handleQuickAction = (label: string) => {
    processMessage(label);
  };

  const handleClear = () => {
    setMessages([]);
  };

  const handleSaveAsCase = () => {
    if (!onSaveCase || !currentCaseData) return;
    setShowSaveModal(true);
  };

  const handleConfirmSave = (caseName: string) => {
    if (!onSaveCase || !currentCaseData) return;
    const savedCase: SavedCase = { ...currentCaseData, id: Date.now().toString(), name: caseName, createdAt: new Date() };
    onSaveCase(savedCase);
    setShowSaveModal(false);
  };

  return (
    <div className={`flex-1 flex overflow-hidden ${d ? "bg-[#0d0d1a]" : "bg-white"}`}>
      {/* Chat Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Agent Header */}
        <div className={`h-11 border-b flex items-center px-4 gap-3 flex-shrink-0 ${d ? "border-[#2a2a3e] bg-[#12121f]" : "border-gray-200 bg-white"}`}>
          <button onClick={onBack} className={`p-1 rounded transition-colors ${d ? "hover:bg-[#2a2a3e]" : "hover:bg-gray-100"}`}>
            <svg className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className={`w-5 h-5 rounded flex items-center justify-center ${d ? "bg-purple-600/30" : "bg-purple-100"}`}>
            <svg className={`w-3 h-3 ${d ? "text-purple-400" : "text-purple-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className={`text-xs font-medium ${d ? "text-gray-200" : "text-gray-800"}`}>{agent.name}</span>
          <div className="ml-auto flex items-center gap-1.5 text-xs">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${d ? "bg-purple-600/20" : "bg-purple-100"}`}>
              <svg className={`w-3 h-3 ${d ? "text-purple-400" : "text-purple-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <span className={d ? "text-gray-400" : "text-gray-600"}>Assistant</span>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.length === 0 ? (
            <WelcomeScreen agent={agent} onQuestionClick={handleQuestionClick} dark={d} />
          ) : (
            <div className="max-w-2xl">
              {messages.map((msg) => (
                <div key={msg.id} className="mb-4">
                  {msg.role === "user" ? (
                    <div className="flex justify-end">
                      <div className={`px-4 py-2 rounded-lg text-xs max-w-[80%] ${d ? "bg-purple-600/20 border border-purple-600/30 text-purple-200" : "bg-purple-100 border border-purple-200 text-purple-800"}`}>{msg.content}</div>
                    </div>
                  ) : (
                    <div className={`rounded-lg px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap ${d ? "bg-[#12121f] border border-[#2a2a3e] text-gray-300" : "bg-gray-50 border border-gray-200 text-gray-700"}`}>{msg.content}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={`border-t px-4 py-3 flex-shrink-0 ${d ? "border-[#2a2a3e] bg-[#12121f]" : "border-gray-200 bg-white"}`}>
          <div className={`flex items-center gap-2 border rounded-lg px-3 py-2 transition-colors ${d ? "border-[#2a2a3e] bg-[#0d0d1a] focus-within:border-purple-600/50" : "border-gray-300 bg-white focus-within:border-purple-400"}`}>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder={`Ask ${agent.name} anything... Press Enter to send`} className={`flex-1 outline-none text-xs bg-transparent ${d ? "text-gray-200 placeholder-gray-600" : "text-gray-700 placeholder-gray-400"}`} />
            <button onClick={handleSend} className="p-1.5 bg-purple-600 hover:bg-purple-700 rounded text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>

          {/* Follow-up guidance & suggested questions below input */}
          {followUpGuide && messages.length > 0 && (
            <p className={`text-[10px] mt-2 px-1 ${d ? "text-gray-500" : "text-gray-500"}`}>
              💡 {followUpGuide}
            </p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {(messages.length === 0 ? agent.suggestedQuestions : suggestedFollowUps).map((q, i) => (
              <button key={i} onClick={() => handleQuestionClick(q)} className={`px-2.5 py-1 text-[10px] border rounded-full transition-colors ${d ? "border-[#2a2a3e] text-gray-500 hover:border-purple-600/40 hover:text-purple-400 hover:bg-purple-600/5" : "border-gray-200 text-gray-500 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50"}`}>
                {q}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-2">
            <button onClick={handleClear} className={`flex items-center gap-1 text-[10px] transition-colors ${d ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"}`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              <span>Clear Chat</span>
            </button>
            <span className={`text-[10px] ${d ? "text-gray-600" : "text-gray-400"}`}>© 2025 item.com</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <ResultPanel results={results} quickActions={agent.quickActions} onQuickAction={handleQuickAction} onSaveAsCase={handleSaveAsCase} caseData={currentCaseData} />

      {/* Save Case Modal */}
      {showSaveModal && currentCaseData && (
        <SaveCaseModal
          defaultName={currentCaseData.name || `${agent.name} Report`}
          onSave={handleConfirmSave}
          onCancel={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}

function WelcomeScreen({ agent, onQuestionClick, dark }: { agent: AgentInfo; onQuestionClick: (q: string) => void; dark: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <div className="max-w-md text-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${dark ? "bg-purple-600/10" : "bg-purple-50"}`}>
          <svg className={`w-6 h-6 ${dark ? "text-purple-400" : "text-purple-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h1 className={`text-lg font-bold mb-2 ${dark ? "text-white" : "text-gray-900"}`}>{agent.name}</h1>
        <p className={`text-[11px] leading-relaxed mb-6 ${dark ? "text-gray-400" : "text-gray-500"}`}>{agent.welcomeMessage}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {agent.suggestedQuestions.map((q, i) => (
            <button key={i} onClick={() => onQuestionClick(q)} className={`px-3 py-1.5 text-[11px] border rounded-full transition-colors ${dark ? "border-[#2a2a3e] hover:border-purple-600/50 hover:bg-purple-600/10 hover:text-purple-300 text-gray-400" : "border-gray-300 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 text-gray-600"}`}>{q}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Generate follow-up guidance based on the last result
function generateFollowUpGuidance(title: string): { guide: string; questions: string[] } {
  const t = title.toLowerCase();

  if (t.includes("health") || t.includes("overview")) {
    return {
      guide: "You now have a full inventory health snapshot. Consider drilling into critical items or exploring optimization opportunities to reduce carrying costs.",
      questions: [
        "Show critical items detail",
        "What's causing the overstock?",
        "Suggest reorder optimizations",
        "Compare with last month",
      ],
    };
  }
  if (t.includes("reorder") || t.includes("below")) {
    return {
      guide: "These items need attention soon. You can generate purchase orders for urgent items or analyze why they dropped below reorder point.",
      questions: [
        "Generate PO for critical items",
        "Why did these items drop?",
        "Adjust reorder points",
        "Show supplier lead times",
      ],
    };
  }
  if (t.includes("turnover")) {
    return {
      guide: "Turnover analysis reveals slow-moving inventory. Consider markdown strategies for dead stock or increasing promotion for slow movers.",
      questions: [
        "Markdown recommendations",
        "Promote slow movers",
        "Dead stock liquidation plan",
        "Category-level breakdown",
      ],
    };
  }
  if (t.includes("forecast") || t.includes("demand")) {
    return {
      guide: "Based on the forecast, you may want to pre-order high-demand items or negotiate bulk pricing with suppliers before the demand spike.",
      questions: [
        "Pre-order recommendations",
        "Negotiate bulk pricing",
        "Seasonal trend analysis",
        "Risk assessment for stockouts",
      ],
    };
  }
  if (t.includes("dead") || t.includes("stock report")) {
    return {
      guide: "Dead stock ties up capital. Consider liquidation channels, bundling strategies, or write-off decisions to free up warehouse space.",
      questions: [
        "Liquidation options",
        "Bundle with fast movers",
        "Calculate write-off impact",
        "Free up warehouse space",
      ],
    };
  }
  // Default
  return {
    guide: "Based on this analysis, you can explore related metrics, drill into specific items, or take action on the recommendations provided.",
    questions: [
      "Show more details",
      "Export full report",
      "Compare with previous period",
      "What actions should I take?",
    ],
  };
}

// Generate case data for the right panel
function generateCaseData(title: string, agentName: string): SavedCase {
  return {
    id: Date.now().toString(),
    name: title,
    createdAt: new Date(),
    agentName,
    summary: [
      { label: "SKU Count", value: "1,284", change: "↑12% vs last month", changeType: "up", color: "purple" },
      { label: "Available Stock", value: "86,420", change: "↓3% vs last week", changeType: "down", color: "green" },
      { label: "Below Reorder Point", value: "37", change: "↓5% improvement", changeType: "down", color: "orange" },
      { label: "Total Inventory Value", value: "$2,381,600", change: "↑2% growth", changeType: "up", color: "blue" },
    ],
    alerts: [
      { type: "warning", message: "37 items are below reorder point — consider restocking soon" },
      { type: "info", message: "Inventory turnover rate is 4.2x, above target of 4.0x" },
      { type: "success", message: "Fill rate improved to 97.8% this week" },
    ],
    tableColumns: ["SKU", "Product Name", "Warehouse", "Category", "Available Stock", "Status"],
    tableData: [
      { SKU: "SKU-001234", "Product Name": "Wireless Bluetooth Headset Pro", Warehouse: "Shenzhen", Category: "3C Digital", "Available Stock": 1240, Status: "Normal" },
      { SKU: "SKU-001234", "Product Name": "Wireless Bluetooth Headset Pro", Warehouse: "Guangzhou", Category: "3C Digital", "Available Stock": 360, Status: "Normal" },
      { SKU: "SKU-001235", "Product Name": "USB-C Charger 65W", Warehouse: "Guangzhou", Category: "3C Digital", "Available Stock": 170, Status: "Low" },
      { SKU: "SKU-001235", "Product Name": "USB-C Charger 65W", Warehouse: "Shanghai", Category: "3C Digital", "Available Stock": 520, Status: "Normal" },
      { SKU: "SKU-001236", "Product Name": "Sports Water Bottle 500ml", Warehouse: "Shanghai", Category: "Outdoor Sports", "Available Stock": 3560, Status: "Normal" },
      { SKU: "SKU-001236", "Product Name": "Sports Water Bottle 500ml", Warehouse: "Yiwu", Category: "Outdoor Sports", "Available Stock": 1200, Status: "Normal" },
      { SKU: "SKU-001237", "Product Name": "LED Desk Lamp Smart", Warehouse: "Shenzhen", Category: "Home Appliance", "Available Stock": 0, Status: "Out" },
      { SKU: "SKU-001238", "Product Name": "Folding Umbrella Large", Warehouse: "Yiwu", Category: "Daily Essentials", "Available Stock": 2100, Status: "Normal" },
      { SKU: "SKU-001239", "Product Name": "Children Building Blocks Set", Warehouse: "Guangzhou", Category: "Toys", "Available Stock": 80, Status: "Low" },
      { SKU: "SKU-001240", "Product Name": "Stainless Steel Thermos", Warehouse: "Shanghai", Category: "Kitchen", "Available Stock": 890, Status: "Normal" },
    ],
  };
}

// Generate mock responses
function generateResponse(agentId: string, question: string): { text: string; result?: ResultItem } {
  const q = question.toLowerCase();

  if (agentId === "inventory-advisor" || q.includes("inventory") || q.includes("health") || q.includes("stock")) {
    if (q.includes("health") || q.includes("overview")) {
      return {
        text: `📊 **Inventory Health Overview**

**Total Inventory Value:** $2.45M
**SKU Count:** 2,847 active items

**Health Metrics:**
🟢 Healthy Stock: 2,412 SKUs (84.7%)
🟡 Low Stock: 298 SKUs (10.5%)
🔴 Critical: 89 SKUs (3.1%)
⚫ Overstock: 48 SKUs (1.7%)

**Key Indicators:**
• Inventory Turnover: 4.2x (Target: 4.0x) 🟢
• Days of Supply: 42 days (Target: 45) 🟢
• Fill Rate: 97.8% (Target: 98%) ⚠️
• Carrying Cost: $18,500/month

**Recommendations:**
1. Address 89 critical items immediately
2. Review 48 overstock items for markdown
3. Improve fill rate by 0.2%

Would you like details on any category?`,
        result: {
          id: Date.now().toString(),
          title: "Inventory Health Overview",
          type: "chart",
          content: { chartType: "inventory-health", summary: "2,847 SKUs | $2.45M Total Value" },
          timestamp: new Date(),
        },
      };
    }
    if (q.includes("reorder") || q.includes("below")) {
      return {
        text: `⚠️ **Items Below Reorder Point**

Found **89 items** currently below reorder point:

**By Category:**
• Electronics: 23 items
• Raw Materials: 31 items
• Packaging: 18 items
• Finished Goods: 17 items

**Top Priority (Stockout in 3 days):**
1. SKU-4521 - Circuit Board A (Stock: 12, ROP: 50)
2. SKU-1893 - Steel Rod 10mm (Stock: 45, ROP: 200)
3. SKU-7234 - Cardboard Box L (Stock: 89, ROP: 500)

Shall I generate purchase orders for critical items?`,
        result: {
          id: Date.now().toString(),
          title: "Reorder Point Alerts",
          type: "alert",
          content: { chartType: "reorder-alert", summary: "89 items below reorder point" },
          timestamp: new Date(),
        },
      };
    }
    if (q.includes("turnover")) {
      return {
        text: `📈 **Inventory Turnover Analysis**

**Overall Turnover Rate:** 4.2x (annualized)

**By Category:**
• Fast Moving (>6x): 892 SKUs
• Normal (3-6x): 1,245 SKUs
• Slow Moving (1-3x): 512 SKUs
• Dead Stock (<1x): 198 SKUs

**Recommendations:**
• Increase stock for high-velocity items
• Review pricing for slow movers
• Liquidate dead stock ($45K value)

I've opened the turnover trend chart.`,
        result: {
          id: Date.now().toString(),
          title: "Turnover Trend Analysis",
          type: "chart",
          content: { chartType: "turnover-chart", summary: "Overall: 4.2x | Target: 4.0x" },
          timestamp: new Date(),
        },
      };
    }
    if (q.includes("dead") || q.includes("report")) {
      return {
        text: `📋 **Dead Stock Report**

**Total Dead Stock:** 198 SKUs | Value: $80,200

**Top Dead Stock Items:**
| SKU | Item | Value | Last Sold |
|-----|------|-------|-----------|
| SKU-8821 | Legacy Adapter V1 | $12,400 | 8 months ago |
| SKU-3345 | Discontinued Panel | $9,800 | 11 months ago |
| SKU-6612 | Old Connector Type | $7,200 | 6 months ago |

**Recommended Actions:**
• Liquidation candidates: 45 items ($32K)
• Markdown candidates: 89 items ($28K)
• Write-off candidates: 64 items ($20K)`,
        result: {
          id: Date.now().toString(),
          title: "Dead Stock Report",
          type: "table",
          content: { chartType: "dead-stock-table", summary: "198 SKUs | $80,200 value" },
          timestamp: new Date(),
        },
      };
    }
    if (q.includes("forecast") || q.includes("demand")) {
      return {
        text: `🔮 **Demand Forecast - Next Month**

**Projected Demand Increase:** +8.3% vs current month

**Top Growth Categories:**
• Electronics: +12.4%
• Packaging: +9.1%
• Raw Materials: +6.8%

**Key Recommendations:**
1. Pre-order 15% more Circuit Boards
2. Increase safety stock for packaging
3. Negotiate bulk pricing with steel suppliers

**Confidence Level:** 87% (based on 12-month trend)`,
        result: {
          id: Date.now().toString(),
          title: "Demand Forecast",
          type: "chart",
          content: { chartType: "forecast-chart", summary: "Next month: +8.3% projected" },
          timestamp: new Date(),
        },
      };
    }
    if (q.includes("optimize") || q.includes("reorder quantities")) {
      return {
        text: `⚡ **Reorder Quantity Optimization**

**Analysis Complete** - Reviewed 2,847 SKUs

**Optimization Results:**
• 342 items: Increase reorder qty (avg +18%)
• 156 items: Decrease reorder qty (avg -12%)
• 2,349 items: No change needed

**Projected Savings:**
• Carrying cost reduction: -$3,200/month
• Stockout risk reduction: -23%
• Order frequency optimization: -15 orders/month

**Top Changes Recommended:**
1. SKU-1001: 100 → 145 units (+45%)
2. SKU-2234: 500 → 380 units (-24%)
3. SKU-4456: 200 → 260 units (+30%)`,
        result: {
          id: Date.now().toString(),
          title: "Reorder Optimization",
          type: "table",
          content: { chartType: "optimization-table", summary: "Savings: $3,200/month" },
          timestamp: new Date(),
        },
      };
    }
  }

  // Generic responses for other agents
  if (q.includes("help") || q.includes("what can")) {
    return {
      text: `I can assist you with the following:

• **Data Analysis** - Query and analyze operational data
• **Reports** - Generate detailed reports and summaries
• **Alerts** - Monitor and notify about critical issues
• **Recommendations** - Provide optimization suggestions
• **Forecasting** - Predict trends and future needs

Try clicking one of the Quick Actions on the right panel, or ask me a specific question.`,
    };
  }

  return {
    text: `I've analyzed your request: "${question}"

**Summary:**
• Processing complete across available data sources
• Found relevant metrics and trends
• Generated visualization for your review

**Key Findings:**
• Current performance is within expected parameters
• 3 items require attention
• Trend shows improvement over last 30 days

Check the results panel on the right for details. Would you like me to drill down into any specific area?`,
    result: {
      id: Date.now().toString(),
      title: question.length > 30 ? question.slice(0, 30) + "..." : question,
      type: "chart",
      content: { chartType: "generic-chart", summary: "Analysis complete" },
      timestamp: new Date(),
    },
  };
}
