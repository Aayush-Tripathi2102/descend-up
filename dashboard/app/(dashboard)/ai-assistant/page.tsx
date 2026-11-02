"use client";

import { useEffect, useRef, useState } from "react";
import { readLocal, writeLocal } from "@/lib/demo";

type Message = { role: "assistant" | "user"; text: string };
const greeting: Message[] = [{ role: "assistant", text: "Hi Alex! I can walk you through this fictional channel's results. Ask about growth, titles, retention, or your next video. My responses are prewritten demo examples, not live AI." }];
function replyTo(question: string) {
  const text = question.toLowerCase();
  if (/title|seo|tag|description/.test(text)) return "For the sample desk setup video, try “Build a Focused Creative Workspace: My Minimal Desk Setup”. Lead with the benefit, add a two-sentence topic summary and chapters to the description, and use focused tags such as “desk setup” and “creator workspace”. You can simulate metadata changes on the Optimization page.";
  if (/retention|watch|hook/.test(text)) return "Your sample average watch time is 4m 46s, up 9.7%. The biggest opportunity is the opening: show the result immediately, explain the benefit in one sentence, and remove a long introduction. Add a visual change or useful example every 20–30 seconds. These are illustrative recommendations, not live analytics.";
  if (/idea|next|plan|content/.test(text)) return "A sample two-week content plan:\n\nTuesday: A Budget Desk Setup That Helps You Focus\nFriday: My Simple Lighting Setup for Better Videos\nTuesday: Plan Your Next 10 Uploads in One Hour\nFriday: 3 Editing Fixes You Can Use Today\n\nBuild on your strongest sample topic and keep the viewer benefit clear in every title.";
  return "In this sample month, your channel has 284,650 views (+24.8%), 12,840 subscribers (+12.6%), and a 6.4% click-through rate. Your desk setup tutorial leads with 68,420 views. Focus on a follow-up tutorial, stronger opening hooks, and refreshing older titles. Everything here is fictional demo data; no channel or AI API is connected.";
}
export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(greeting);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stored = readLocal<Message[]>("descendup-demo-chat-v1", greeting);
    // Read browser-only history after static hydration; never during the initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (Array.isArray(stored) && stored.every((m) => ["assistant", "user"].includes(m.role) && typeof m.text === "string")) setMessages(stored);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);
  useEffect(() => { end.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }); }, [messages]);
  function send(text: string) {
    if (!text.trim() || busy) return;
    const next: Message[] = [...messages, { role: "user", text: text.trim() }];
    setMessages(next); setInput(""); setBusy(true);
    timer.current = setTimeout(() => {
      const complete: Message[] = [...next, { role: "assistant", text: replyTo(text) }];
      setMessages(complete); writeLocal("descendup-demo-chat-v1", complete); setBusy(false);
    }, 450);
  }
  return <div className="space-y-6 max-w-4xl"><header className="py-4"><h1 className="text-2xl font-space font-bold">AI Assistant</h1><p className="mt-2 text-sm text-muted-foreground">Your creator copilot · Simulated responses, no AI service connected.</p></header>
    <div className="rounded-lg border border-border bg-card"><div className="h-[420px] overflow-y-auto p-6 space-y-5" role="log" aria-label="Demo conversation" aria-live="polite">{messages.map((message, i) => <div key={i} className={message.role === "user" ? "ml-auto max-w-xl" : "max-w-2xl"}><p className="mb-1 text-xs font-medium text-muted-foreground">{message.role === "user" ? "You" : "DescendUp · Demo"}</p><p className={`rounded-lg px-4 py-3 text-sm leading-6 whitespace-pre-wrap ${message.role === "user" ? "bg-primary text-white" : "bg-background border border-border"}`}>{message.text}</p></div>)}{busy && <p className="text-sm text-muted-foreground">Preparing sample response…</p>}<div ref={end} /></div>
      <form className="flex gap-3 border-t border-border p-4" onSubmit={(event) => { event.preventDefault(); send(input); }}><label htmlFor="assistant-input" className="sr-only">Your question</label><input id="assistant-input" maxLength={1000} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about your channel…" className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm" /><button disabled={busy || !input.trim()} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">Send</button></form>
    </div><div className="flex flex-wrap gap-2">{["How can I grow my channel?", "Suggest my next video", "Improve my video titles", "Help with retention"].map((prompt) => <button key={prompt} disabled={busy} onClick={() => send(prompt)} className="rounded-full border border-border bg-card px-3 py-2 text-xs hover:text-primary disabled:opacity-50">{prompt}</button>)}</div>
    <button className="text-sm text-muted-foreground hover:text-foreground" onClick={() => { if (timer.current) clearTimeout(timer.current); setBusy(false); setMessages(greeting); writeLocal("descendup-demo-chat-v1", greeting); }}>Clear conversation</button>
  </div>;
}
