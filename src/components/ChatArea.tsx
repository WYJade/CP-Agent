"use client";

import { useState, useEffect } from "react";
import { AgentInfo } from "@/data/agents";
import { ChatMessage } from "@/types/agent";
import ResultPanel from "@/components/ResultPanel";

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
}

export default function ChatArea({ agent, onBack, initialMessage }: ChatAreaProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);

  // Handle initial message from Agents page chat input
  useEffect(() => {
    if (initialMessage) {
      processMessage(initialMessage);
    }
  }, []);

  const addResult = (result: ResultItem) => {
    setResults((prev) => {
      const updated = [result, ...prev];
      return updated.slice(0, 3); // Keep only latest 3
    });
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

  return (
    <div className="flex-1 flex overflow-hidden bg-[#0d0d1a]">
      {/* Chat Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Agent Header */}
        <div className="h-11 border-b border-[#2a2a3e] flex items-center px-4 gap-3 flex-shrink-0 bg-[#12121f]">
          <button onClick={onBack} className="p-1 hover:bg-[#2a2a3e] rounded transition-colors">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-5 h-5 rounded bg-purple-600/30 flex items-center justify-center">
            <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-200">{agent.name}</span>
          <div className="ml-auto flex items-center gap-2">
            <button className="p-1 hover:bg-[#2a2a3e] rounded transition-colors">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <div className="flex items-center gap-1.5 ml-2 text-xs text-gray-400">
              <div className="w-5 h-5 rounded-full bg-purple-600/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span>Assistant</span>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.length === 0 ? (
            <WelcomeScreen agent={agent} onQuestionClick={handleQuestionClick} />
          ) : (
            <div className="max-w-2xl">
              {messages.map((msg) => (
                <div key={msg.id} className="mb-4">
                  {msg.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="bg-purple-600/20 border border-purple-600/30 text-purple-200 px-4 py-2 rounded-lg text-xs max-w-[80%]">
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#12121f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-[#2a2a3e] px-4 py-3 flex-shrink-0 bg-[#12121f]">
          <div className="flex items-center gap-2 border border-[#2a2a3e] rounded-lg px-3 py-2 bg-[#0d0d1a] focus-within:border-purple-600/50 transition-colors">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={`Ask ${agent.name} anything... Press Enter to send`}
              className="flex-1 outline-none text-xs text-gray-200 placeholder-gray-600 bg-transparent"
            />
            <button
              onClick={handleSend}
              className="p-1.5 bg-purple-600 hover:bg-purple-700 rounded text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <button onClick={handleClear} className="flex items-center gap-1 text-[10px] text-gray-600 hover:text-gray-400 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear Chat</span>
            </button>
            <span className="text-[10px] text-gray-600">© 2025 item.com</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <ResultPanel results={results} quickActions={agent.quickActions} onQuickAction={handleQuickAction} />
    </div>
  );
}

function WelcomeScreen({
  agent,
  onQuestionClick,
}: {
  agent: AgentInfo;
  onQuestionClick: (q: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <div className="max-w-md text-center">
        <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-white mb-2">{agent.name}</h1>
        <p className="text-[11px] text-gray-400 leading-relaxed mb-6">{agent.welcomeMessage}</p>

        <div className="flex flex-wrap justify-center gap-2">
          {agent.suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => onQuestionClick(q)}
              className="px-3 py-1.5 text-[11px] border border-[#2a2a3e] rounded-full hover:border-purple-600/50 hover:bg-purple-600/10 hover:text-purple-300 text-gray-400 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
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
