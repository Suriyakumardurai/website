"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ShieldAlert, Users, Clock, CalendarDays, KeyRound, Building, Mail } from "lucide-react";

type ClientSubmission = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  message: string;
  createdAt: string;
};

export default function ClassifiedPage() {
  const [passphrase, setPassphrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clients, setClients] = useState<ClientSubmission[] | null>(null);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Access Denied");
      }

      setClients(data.clients);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // If not authenticated, show lock screen
  if (clients === null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 border border-border/50 bg-card rounded-3xl shadow-2xl relative overflow-hidden"
        >
          {/* subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-lime-500/10 blur-[60px] pointer-events-none" />
          
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="h-16 w-16 bg-muted/50 rounded-2xl flex items-center justify-center mb-6 border border-border/50">
              <KeyRound className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-2xl font-semibold font-instrument-serif tracking-wide mb-2 uppercase">Classified Access</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Enter your master passphrase to access client data.
            </p>

            <form onSubmit={handleUnlock} className="w-full space-y-4">
              <input
                type="password"
                placeholder="Passphrase..."
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all text-center placeholder:text-muted-foreground/50 tracking-widest"
                required
              />
              
              {error && (
                <div className="flex items-center justify-center gap-2 text-red-500 text-sm mt-2 bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Decrypting..." : "Unlock Vault"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Grouping logic
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const newClients = clients.filter(c => new Date(c.createdAt) >= sevenDaysAgo);
  const recentClients = clients.filter(c => new Date(c.createdAt) >= thirtyDaysAgo && new Date(c.createdAt) < sevenDaysAgo);
  const olderClients = clients.filter(c => new Date(c.createdAt) < thirtyDaysAgo);

  const renderGroup = (title: string, group: ClientSubmission[], icon: any) => {
    if (group.length === 0) return null;
    const Icon = icon;

    return (
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6 pb-2 border-b border-border/50">
          <div className="p-2 bg-muted/50 rounded-lg">
            <Icon className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <span className="ml-2 text-xs font-medium bg-foreground/5 text-foreground px-2 py-1 rounded-full">
            {group.length}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {group.map((client) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 border border-border/50 bg-card rounded-2xl hover:border-border transition-colors group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{client.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <Mail className="w-3 h-3" />
                    <a href={`mailto:${client.email}`} className="hover:text-foreground transition-colors">{client.email}</a>
                  </div>
                </div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider bg-muted/50 px-2 py-1 rounded-md">
                  {new Date(client.createdAt).toLocaleDateString()}
                </div>
              </div>

              {(client.company || client.service) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {client.company && (
                    <div className="flex items-center gap-1.5 text-xs bg-lime-500/10 text-lime-700 dark:text-lime-400 border border-lime-500/20 px-2 py-1 rounded-md">
                      <Building className="w-3 h-3" />
                      {client.company}
                    </div>
                  )}
                  {client.service && (
                    <div className="text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 px-2 py-1 rounded-md capitalize">
                      {client.service}
                    </div>
                  )}
                </div>
              )}

              <div className="text-sm text-muted-foreground/80 leading-relaxed bg-muted/20 p-3 rounded-xl border border-border/30 line-clamp-4 group-hover:line-clamp-none transition-all">
                {client.message}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-instrument-serif tracking-wide uppercase mb-2">Client Intel Vault</h1>
          <p className="text-muted-foreground">Classified database access. {clients.length} total records found.</p>
        </div>
        <button
          onClick={() => setClients(null)}
          className="text-sm px-4 py-2 border border-border rounded-full hover:bg-muted transition-colors flex items-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Lock Vault
        </button>
      </div>

      <div className="space-y-4">
        {renderGroup("New Leads (Last 7 Days)", newClients, Users)}
        {renderGroup("Recent Pipeline (Last 30 Days)", recentClients, Clock)}
        {renderGroup("Historical Archive", olderClients, CalendarDays)}

        {clients.length === 0 && (
          <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-3xl">
            No client records found in the database.
          </div>
        )}
      </div>
    </div>
  );
}
