import React from "react";

export default function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md animate-pulse">
      <div className="h-1.5 bg-slate-200 w-full" />
      <div className="p-7 pt-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-slate-200" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-16 bg-slate-200 rounded" />
            <div className="h-7 w-24 bg-slate-200 rounded" />
          </div>
        </div>
        <div className="h-3 w-full bg-slate-200 rounded" />
        <div className="h-3 w-3/4 bg-slate-200 rounded" />
        <div className="h-24 bg-slate-100 rounded-xl" />
        <div className="h-10 bg-slate-200 rounded-xl mt-auto" />
      </div>
    </div>
  );
}