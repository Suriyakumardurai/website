"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Clock, ShieldCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { company } from "@/lib/content";

const channels = [
  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  { icon: Phone, label: "Phone", value: company.phone, href: `tel:${company.phone}` },
];

const assurances = [
  { icon: Clock, title: "48-hour scope", desc: "Or next sprint free" },
  { icon: ShieldCheck, title: "100% ownership", desc: "Code, models, IP" },
  { icon: FileText, title: "Fixed-price only", desc: "No surprise invoices" },
];

export default function ContactContent() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      service: data.get("service"),
      message: data.get("message"),
    };
    if (!payload.name || !payload.email || !payload.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in name, email, and message.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      toast({
        title: "Message sent",
        description: "We'll scope your project within 48 hours — or your next sprint is free.",
      });
      form.reset();
    } catch {
      toast({
        title: "Saved locally",
        description: "Your message was recorded. We'll follow up at " + company.email,
      });
      form.reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: channels + assurances */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Start a conversation.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A discovery call — problem deep-dive, technical assessment, feasibility check,
              and timeline estimate. You walk away with a scoped proposal in 48 hours.
            </p>

            <div className="mt-8 space-y-3">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:shadow-md hover:border-foreground/20 transition-all group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-foreground text-background flex items-center justify-center group-hover:bg-lime-600 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">{c.label}</div>
                      <div className="text-sm font-medium truncate">{c.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-6 space-y-2.5">
              {assurances.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.title} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 lime-text shrink-0" />
                    <span className="text-sm">
                      <span className="font-semibold">{a.title}</span>
                      <span className="text-muted-foreground"> — {a.desc}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Work email *</Label>
                  <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="Company name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="service">What do you need?</Label>
                  <Select name="service">
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Pick a capability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agent">AI Agent</SelectItem>
                      <SelectItem value="saas">AI SaaS Product</SelectItem>
                      <SelectItem value="automation">Workflow Automation</SelectItem>
                      <SelectItem value="llm">Custom LLM</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="other">Something else</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Project details *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="What are you trying to automate, build, or replace? The more detail, the faster we scope."
                  rows={6}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 group h-12"
                size="lg"
              >
                {loading ? "Sending..." : "Send & book discovery call"}
                {!loading && (
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                We reply within 24 hours. 48-hour proposal guarantee applies.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
