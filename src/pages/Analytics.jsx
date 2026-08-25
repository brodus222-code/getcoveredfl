import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, Users, TrendingUp, DollarSign, Phone, MailCheck, ShieldCheck, UserCheck, Clock, Home } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/analytics/StatCard';
import ChartCard from '@/components/analytics/ChartCard';
import LeadsTrendChart from '@/components/analytics/LeadsTrendChart';
import CountBarChart from '@/components/analytics/CountBarChart';
import StatusFunnel from '@/components/analytics/StatusFunnel';
import BooleanStatRow from '@/components/analytics/BooleanStatRow';
import AgentTable from '@/components/analytics/AgentTable';
import TopZipsList from '@/components/analytics/TopZipsList';
import {
  filterByDays, countBy, boolBreakdown, leadsPerDay, leadsByHour, leadsByWeekday,
  statusFunnel, incomeBuckets, ageBuckets, topZips, agentBreakdown, summary,
  COVERAGE_LABELS, REASON_LABELS, TIMING_LABELS,
} from '@/lib/leadAnalytics';

const RANGES = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
  { value: 'all', label: 'All time' },
];

export default function Analytics() {
  const { user } = useAuth();
  const [range, setRange] = useState('30');

  const { data: allLeads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: () => base44.entities.Lead.list('-created_date'),
    enabled: !!user,
  });

  const leads = useMemo(
    () => filterByDays(allLeads, range === 'all' ? null : Number(range)),
    [allLeads, range]
  );

  const s = useMemo(() => summary(leads), [leads]);
  const trendDays = range === 'all' ? 90 : Number(range);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Clock className="w-8 h-8 text-muted-foreground animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-primary" />
            <div>
              <h1 className="text-xl font-bold font-heading text-navy">Analytics</h1>
              <p className="text-sm text-muted-foreground">Everything we track about your leads</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RANGES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button asChild variant="outline">
              <Link to="/LeadManagement">Leads</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Users} label="Total Leads" value={s.total} sub={RANGES.find((r) => r.value === range)?.label} />
          <StatCard icon={TrendingUp} label="Enrolled" value={`${s.enrolled}`} sub={`${s.enrolledRate}% of leads`} />
          <StatCard icon={Phone} label="Worked (not new)" value={`${s.contactRate}%`} sub="Moved past 'new' status" />
          <StatCard icon={UserCheck} label="Assigned" value={`${s.assignedRate}%`} sub="Have an agent / destination" />
          <StatCard icon={DollarSign} label="Avg. Income" value={`$${s.avgIncome.toLocaleString()}`} sub="Self-reported annual" />
          <StatCard icon={Home} label="Avg. Household" value={s.avgHousehold} sub="People per lead" />
          <StatCard icon={MailCheck} label="Confirmation Emails" value={`${s.emailSentRate}%`} sub="Welcome email delivered" />
          <StatCard icon={ShieldCheck} label="Qualified" value={`${s.qualifiedRate}%`} sub={`${s.unqualified} disqualified`} />
        </div>

        {/* Volume */}
        <ChartCard title="Lead volume" description={`Leads per day over the last ${trendDays} days (ET)`}>
          <LeadsTrendChart data={leadsPerDay(leads, trendDays)} />
        </ChartCard>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Pipeline by status" description="Where leads sit right now">
            <StatusFunnel data={statusFunnel(leads)} total={s.total} />
          </ChartCard>

          <ChartCard title="Coverage interest" description="What leads are shopping for">
            <CountBarChart data={countBy(leads, 'coverage_type', COVERAGE_LABELS)} nameKey="name" horizontal />
          </ChartCard>

          <ChartCard title="Lead source" description="Where leads came from">
            <CountBarChart
              data={countBy(leads, 'lead_source', { website: 'Website', meta_instant_form: 'Meta Instant Form', other: 'Other' })}
              nameKey="name"
              horizontal
              height={200}
              color="hsl(var(--accent))"
            />
          </ChartCard>

          <ChartCard title="Why they're shopping" description="Qualifying life event">
            <CountBarChart data={countBy(leads, 'lead_reason', REASON_LABELS)} nameKey="name" horizontal height={200} />
          </ChartCard>

          <ChartCard title="Coverage start timing" description="How urgent the need is">
            <CountBarChart data={countBy(leads, 'start_coverage', TIMING_LABELS)} nameKey="name" horizontal height={180} color="hsl(var(--accent))" />
          </ChartCard>

          <ChartCard title="Household size" description="People per household">
            <CountBarChart data={countBy(leads, 'household_size').map((d) => ({ label: String(d.name), count: d.count }))} height={180} />
          </ChartCard>

          <ChartCard title="Income distribution" description="Estimated annual household income">
            <CountBarChart data={incomeBuckets(leads)} height={220} />
          </ChartCard>

          <ChartCard title="Primary applicant age" description="Age of the first household member">
            <CountBarChart data={ageBuckets(leads)} height={220} color="hsl(var(--accent))" />
          </ChartCard>

          <ChartCard title="Top ZIP codes" description="Highest-volume coverage areas">
            <TopZipsList rows={topZips(leads)} total={s.total} />
          </ChartCard>

          <ChartCard title="Lead qualities" description="Self-reported answers (primary bar = Yes)">
            <div>
              <BooleanStatRow label="Currently insured" stats={boolBreakdown(leads, 'currently_insured')} />
              <BooleanStatRow label="Takes prescriptions" stats={boolBreakdown(leads, 'takes_prescriptions')} />
              <BooleanStatRow label="Prefers specific network" stats={boolBreakdown(leads, 'prefers_specific_network')} />
              <BooleanStatRow label="SMS opt-in" stats={boolBreakdown(leads, 'sms_opt_in')} />
              <BooleanStatRow label="Confirmation email sent" stats={boolBreakdown(leads, 'confirmation_email_sent')} />
            </div>
          </ChartCard>

          <ChartCard title="Leads by hour" description="When leads submit (Eastern Time)">
            <CountBarChart data={leadsByHour(leads)} height={220} />
          </ChartCard>

          <ChartCard title="Leads by weekday" description="Busiest days of the week">
            <CountBarChart data={leadsByWeekday(leads)} height={220} color="hsl(var(--accent))" />
          </ChartCard>
        </div>

        <ChartCard title="Agent performance" description="Leads and enrollments by assigned agent or destination">
          <AgentTable rows={agentBreakdown(leads)} />
        </ChartCard>
      </div>
    </div>
  );
}