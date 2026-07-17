import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import rawData from "@/data/gujcet.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, MapPin, TrendingUp, Users, IndianRupee, Search, Sparkles, Building2 } from "lucide-react";

type Row = {
  "AISHE Code": string;
  "College Name": string;
  District: string;
  Course: string;
  Program: string;
  Exam: string;
  "Median Salary": number | null;
  "Avg Placement": number | null;
  "NIRF Ranking": number | null;
  "Type of College": string;
  category: string;
  closing_marks: number;
  "Course Fees (per year)": number | null;
  "Total Seats": number | null;
  "Medical Stipend": number | null;
};

const data = rawData as Row[];

export const Route = createFileRoute("/")({
  component: Predictor,
});

function fmtINR(n: number | null | undefined) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

function Predictor() {
  const [marks, setMarks] = useState<string>("");
  const [category, setCategory] = useState<string>("general");
  const [program, setProgram] = useState<string>("all");
  const [district, setDistrict] = useState<string>("all");
  const [collegeType, setCollegeType] = useState<string>("all");
  const [submitted, setSubmitted] = useState(false);

  const districts = useMemo(() => Array.from(new Set(data.map(d => d.District))).sort(), []);
  const programs = useMemo(() => Array.from(new Set(data.map(d => d.Program))).sort(), []);

  const results = useMemo(() => {
    const m = parseFloat(marks);
    if (isNaN(m)) return [];
    return data
      .filter(r => r.category === category)
      .filter(r => r.closing_marks <= m)
      .filter(r => program === "all" || r.Program === program)
      .filter(r => district === "all" || r.District === district)
      .filter(r => collegeType === "all" || r["Type of College"] === collegeType)
      .sort((a, b) => b.closing_marks - a.closing_marks);
  }, [marks, category, program, district, collegeType]);

  const grouped = useMemo(() => {
    const map = new Map<string, Row[]>();
    for (const r of results) {
      const k = r["College Name"];
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(r);
    }
    return Array.from(map.entries());
  }, [results]);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 text-primary-foreground">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Gujarat Common Entrance Test (GujCET) College Predictor
          </div>
          <h1 className="mt-6 text-5xl font-semibold leading-tight md:text-6xl">
            Find the colleges<br />your GujCET score unlocks.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
            A precision predictor built on real cut-off data from Engineering, Pharmacy and Medical
            programs across Gujarat.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {new Set(data.map(d=>d["College Name"])).size} colleges</div>
            <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> {new Set(data.map(d=>d.Course)).size} courses</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {districts.length} districts</div>
          </div>
        </div>
      </header>

      {/* Predictor Form */}
      <main className="mx-auto max-w-6xl px-6 -mt-16 pb-24">
        <Card className="border-0" style={{ boxShadow: "var(--shadow-glow)" }}>
          <CardHeader>
            <CardTitle className="text-2xl">Enter your details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePredict} className="grid grid-cols-1 gap-4 md:grid-cols-6">
              <div className="md:col-span-2">
                <Label htmlFor="marks">GujCET Marks (percentile)</Label>
                <Input
                  id="marks"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="e.g. 78.5"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="mt-1.5"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="st">ST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Program</Label>
                <Select value={program} onValueChange={setProgram}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All programs</SelectItem>
                    {programs.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>District</Label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent className="max-h-72">
                    <SelectItem value="all">All districts</SelectItem>
                    {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>College Type</Label>
                <Select value={collegeType} onValueChange={setCollegeType}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="Govt">Government</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="Grant-in-aid">Grant-in-aid</SelectItem>
                    <SelectItem value="SFI">Self-Financed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 flex items-end">
                <Button type="submit" size="lg" className="w-full gap-2">
                  <Search className="h-4 w-4" /> Predict Colleges
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {submitted && (
          <section className="mt-10">
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-semibold">
                {results.length > 0 ? `${grouped.length} colleges · ${results.length} eligible seats` : "No matches"}
              </h2>
              <p className="text-sm text-muted-foreground">Sorted by closing cutoff (highest first)</p>
            </div>

            {results.length === 0 ? (
              <Card className="mt-6">
                <CardContent className="py-12 text-center text-muted-foreground">
                  No colleges match your marks and filters. Try lowering the score requirement or clearing filters.
                </CardContent>
              </Card>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-5">
                {grouped.map(([name, rows]) => {
                  const first = rows[0];
                  return (
                    <Card key={name} className="overflow-hidden border-border/60 transition hover:border-primary/40" style={{ boxShadow: "var(--shadow-soft)" }}>
                      <CardHeader className="pb-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <CardTitle className="text-lg leading-snug">{name}</CardTitle>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{first.District}</span>
                              <Badge variant="secondary">{first["Type of College"]}</Badge>
                              {first["NIRF Ranking"] != null && <Badge variant="outline">NIRF #{first["NIRF Ranking"]}</Badge>}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs uppercase tracking-wider text-muted-foreground">Median Salary</div>
                            <div className="text-lg font-semibold">{fmtINR(first["Median Salary"])}</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3 border-b border-border/60 pb-4 text-sm md:grid-cols-4">
                          <Stat icon={<TrendingUp className="h-3.5 w-3.5" />} label="Avg placement" value={first["Avg Placement"] != null ? `${first["Avg Placement"]}%` : "—"} />
                          <Stat icon={<IndianRupee className="h-3.5 w-3.5" />} label="Fees / year" value={fmtINR(first["Course Fees (per year)"])} />
                          <Stat icon={<Users className="h-3.5 w-3.5" />} label="Total seats" value={first["Total Seats"] != null ? `${first["Total Seats"]}` : "—"} />
                          <Stat icon={<GraduationCap className="h-3.5 w-3.5" />} label="Program" value={first.Program} />
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Eligible courses</div>
                          {rows.map((r, i) => (
                            <div key={i} className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 text-sm">
                              <span className="font-medium">{r.Course}</span>
                              <div className="flex items-center gap-3">
                                <span className="text-muted-foreground">Cutoff</span>
                                <Badge className="bg-accent text-accent-foreground hover:bg-accent">{r.closing_marks.toFixed(2)}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {!submitted && (
          <section className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { t: "Real cutoffs", d: "Category-wise closing marks from official GujCET admission rounds." },
              { t: "Smart filters", d: "Narrow results by district, program, and college type in one click." },
              { t: "Beyond cutoffs", d: "See placement stats, fees, and seat availability for each match." },
            ].map((f) => (
              <Card key={f.t} className="border-border/60">
                <CardContent className="pt-6">
                  <div className="mb-2 h-8 w-8 rounded-lg" style={{ background: "var(--gradient-accent)" }} />
                  <h3 className="text-lg font-semibold">{f.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        Data is indicative and sourced from public admission records. Verify with official ACPC sources before final decisions.
      </footer>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground">{icon}{label}</div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  );
}
