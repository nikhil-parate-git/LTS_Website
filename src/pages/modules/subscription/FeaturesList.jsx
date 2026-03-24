import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FEATURES_PREVIEW } from "../../../utils/subscriptionHelpers";

export default function FeaturesList({ features, dotClass, moreBtnClass }) {
  const [expanded, setExpanded] = useState(false);

  if (!features?.length) return null;

  const hasMore     = features.length > FEATURES_PREVIEW;
  const visible     = expanded ? features : features.slice(0, FEATURES_PREVIEW);
  const hiddenCount = features.length - FEATURES_PREVIEW;

  return (
    <div className="flex flex-col gap-2">
      {visible.map((f, i) => (
        <div key={i} className="flex items-center gap-2 text-[13px] text-slate-600">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotClass}`} />
          {f}
        </div>
      ))}

      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className={`mt-1 self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-bold tracking-wide transition-all duration-200 ${moreBtnClass}`}
        >
          {expanded
            ? <><ChevronUp className="w-3 h-3" /> Show less</>
            : <><ChevronDown className="w-3 h-3" /> Show {hiddenCount} more</>
          }
        </button>
      )}
    </div>
  );
}