import { Bot, Zap, BarChart3, Radio, CheckCircle } from "lucide-react";

import botArtrix from "@/assets/bot-artrix.jpg";
import botTwjLive from "@/assets/bot-twj-live.jpg";
import botTwjFuture from "@/assets/bot-twj-future.jpg";
import botVeltrix from "@/assets/bot-veltrix.jpg";
import botResults from "@/assets/bot-results.jpg";

export interface BotData {
  name: string;
  slug: string;
  price: number;
  desc: string;
  icon: typeof Bot;
  tag: string | null;
  features: string[];
  image: string;
  results: { label: string; value: string }[];
  accent: string;
}

export const bots: BotData[] = [
  {
    name: "ARTRIX AI",
    slug: "artrix-ai",
    price: 120,
    desc: "Our flagship AI-driven trading bot. Automated precision for maximum returns on every market move. Powered by deep learning algorithms that adapt to real-time market conditions.",
    icon: Bot,
    tag: "FLAGSHIP",
    features: ["Fully Automated", "AI-Powered", "24/7 Trading"],
    image: botArtrix,
    accent: "from-blue-500/20 to-purple-500/20",
    results: [
      { label: "Win Rate", value: "87.3%" },
      { label: "Monthly ROI", value: "+32.4%" },
      { label: "Total Trades", value: "12,847" },
      { label: "Avg. Profit", value: "+4.2%" },
    ],
  },
  {
    name: "TWJ LIVE SIGNAL",
    slug: "twj-live-signal",
    price: 100,
    desc: "Real-time live trading signals delivered instantly. Never miss a profitable entry again. Get precise entry, stop-loss, and take-profit levels for every signal.",
    icon: Zap,
    tag: "POPULAR",
    features: ["Live Alerts", "Instant Delivery", "Multi-Pair"],
    image: botTwjLive,
    accent: "from-emerald-500/20 to-cyan-500/20",
    results: [
      { label: "Win Rate", value: "82.1%" },
      { label: "Monthly ROI", value: "+28.7%" },
      { label: "Signals/Day", value: "8-12" },
      { label: "Avg. Profit", value: "+3.6%" },
    ],
  },
  {
    name: "TWJ FUTURE SIGNAL",
    slug: "twj-future-signal",
    price: 80,
    desc: "Futures market signals with advanced predictive analysis and risk management built in. Leverage-optimized entries with calculated risk-reward ratios.",
    icon: BarChart3,
    tag: null,
    features: ["Futures Focus", "Risk Management", "Predictive AI"],
    image: botTwjFuture,
    accent: "from-amber-500/20 to-orange-500/20",
    results: [
      { label: "Win Rate", value: "79.5%" },
      { label: "Monthly ROI", value: "+24.1%" },
      { label: "Signals/Day", value: "5-8" },
      { label: "Risk/Reward", value: "1:3.2" },
    ],
  },
  {
    name: "VELTRIX SIGNALS",
    slug: "veltrix-signals",
    price: 60,
    desc: "TradingView-integrated signals with chart overlays, alerts, and automated notifications. Seamless integration with your existing trading setup.",
    icon: Radio,
    tag: null,
    features: ["TradingView", "Chart Overlays", "Auto Alerts"],
    image: botVeltrix,
    accent: "from-rose-500/20 to-pink-500/20",
    results: [
      { label: "Win Rate", value: "76.8%" },
      { label: "Monthly ROI", value: "+19.3%" },
      { label: "Pairs", value: "25+" },
      { label: "Avg. Profit", value: "+2.8%" },
    ],
  },
  {
    name: "RESULTS CHECKER",
    slug: "results-checker",
    price: 30,
    desc: "Verify and track signal performance in real-time. Full transparency on every trade. Comprehensive analytics dashboard with historical performance data.",
    icon: CheckCircle,
    tag: "VALUE",
    features: ["Performance Logs", "Transparency", "Real-Time"],
    image: botResults,
    accent: "from-violet-500/20 to-indigo-500/20",
    results: [
      { label: "Accuracy", value: "99.9%" },
      { label: "Tracked Bots", value: "All" },
      { label: "History", value: "90 Days" },
      { label: "Reports", value: "Daily" },
    ],
  },
];
