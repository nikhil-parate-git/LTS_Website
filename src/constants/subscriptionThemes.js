// constants/subscriptionThemes.js
// subCategory enum: ["Prime", "Dynamic", "Gold", "Diamond"]

export const THEME = {
  Prime: {
    color:    "from-blue-400 to-cyan-300",
    accent:   "text-blue-600",
    dot:      "bg-blue-400",
    btn:      "bg-blue-500 hover:bg-blue-600",
    shadow:   "shadow-blue-500/20",
    moreBtn:  "border-blue-200 text-blue-600 hover:bg-blue-50",
    featured: false,
    emoji:    "🛡️",
  },
  Dynamic: {
    color:    "from-purple-500 to-violet-400",
    accent:   "text-purple-600",
    dot:      "bg-purple-400",
    btn:      "bg-purple-600 hover:bg-purple-700",
    shadow:   "shadow-purple-500/20",
    moreBtn:  "border-purple-200 text-purple-600 hover:bg-purple-50",
    featured: false,
    emoji:    "⚡",
  },
  Gold: {
    color:    "from-amber-400 to-orange-400",
    accent:   "text-amber-500",
    dot:      "bg-amber-400",
    btn:      "bg-amber-400 hover:bg-amber-500",
    shadow:   "shadow-amber-400/20",
    moreBtn:  "border-amber-200 text-amber-600 hover:bg-amber-50",
    featured: true,    // Most Popular
    emoji:    "🥇",
  },
  Diamond: {
    color:    "from-cyan-400 to-teal-400",
    accent:   "text-cyan-600",
    dot:      "bg-cyan-400",
    btn:      "bg-cyan-500 hover:bg-cyan-600",
    shadow:   "shadow-cyan-500/20",
    moreBtn:  "border-cyan-200 text-cyan-600 hover:bg-cyan-50",
    featured: false,
    emoji:    "💎",
  },
};

export const DEFAULT_THEME = {
  color:    "from-slate-400 to-slate-300",
  accent:   "text-slate-600",
  dot:      "bg-slate-400",
  btn:      "bg-slate-700 hover:bg-slate-800",
  shadow:   "shadow-slate-500/20",
  moreBtn:  "border-slate-200 text-slate-600 hover:bg-slate-50",
  featured: false,
  emoji:    "📦",
};