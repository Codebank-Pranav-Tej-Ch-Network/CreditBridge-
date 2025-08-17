"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  ArrowLeft,
  TrendingUp,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Target,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import {
  Bar,
  BarChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock analytics data
const monthlyAssessments = [
  { month: "Jul", total: 145, approved: 87, rejected: 45, pending: 13 },
  { month: "Aug", total: 162, approved: 98, rejected: 52, pending: 12 },
  { month: "Sep", total: 178, approved: 112, rejected: 48, pending: 18 },
  { month: "Oct", total: 195, approved: 125, rejected: 55, pending: 15 },
  { month: "Nov", total: 210, approved: 138, rejected: 58, pending: 14 },
  { month: "Dec", total: 234, approved: 156, rejected: 62, pending: 16 },
]

const riskDistribution = [
  { name: "Low Risk", value: 65, count: 152, color: "#22c55e" },
  { name: "Medium Risk", value: 25, count: 58, color: "#fbbf24" },
  { name: "High Risk", value: 10, count: 24, color: "#ef4444" },
]

const modelPerformance = [
  { metric: "Accuracy", value: 98.96, target: 85, color: "#4f46e5" },
  { metric: "Precision", value: 99.0, target: 80, color: "#3b82f6" },
  { metric: "Recall", value: 99.0, target: 85, color: "#22c55e" },
  { metric: "F1-Score", value: 99.0, target: 82, color: "#fbbf24" },
  { metric: "ROC AUC", value: 99.84, target: 90, color: "#8b5cf6" },
]

const alternativeDataUsage = [
  { source: "Banking Data", usage: 95, reliability: 92 },
  { source: "Credit Bureau", usage: 88, reliability: 89 },
  { source: "Device Analytics", usage: 82, reliability: 85 },
  { source: "Geolocation", usage: 78, reliability: 81 },
  { source: "Social Media", usage: 65, reliability: 73 },
  { source: "Documents", usage: 92, reliability: 94 },
]

const loanAmountDistribution = [
  { range: "0-1L", count: 45, percentage: 19.2 },
  { range: "1-3L", count: 78, percentage: 33.3 },
  { range: "3-5L", count: 56, percentage: 23.9 },
  { range: "5-10L", count: 42, percentage: 17.9 },
  { range: "10L+", count: 13, percentage: 5.6 },
]

const federatedLearningMetrics = [
  { institution: "Bank A", improvement: 17.2, dataPoints: 15420 },
  { institution: "Bank B", improvement: 14.8, dataPoints: 12350 },
  { institution: "Bank C", improvement: 19.5, dataPoints: 18760 },
  { institution: "Bank D", improvement: 16.3, dataPoints: 13890 },
  { institution: "Bank E", improvement: 21.1, dataPoints: 20140 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("assessments")

  const totalAssessments = monthlyAssessments.reduce((sum, month) => sum + month.total, 0)
  const totalApproved = monthlyAssessments.reduce((sum, month) => sum + month.approved, 0)
  const totalRejected = monthlyAssessments.reduce((sum, month) => sum + month.rejected, 0)
  const approvalRate = ((totalApproved / totalAssessments) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">System performance and insights</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Key Performance Indicators */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-chart-1/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalAssessments.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Assessments</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-chart-3" />
                    <span className="text-xs text-chart-3">+12.5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-chart-3/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-chart-3">{approvalRate}%</p>
                  <p className="text-sm text-muted-foreground">Approval Rate</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-chart-3" />
                    <span className="text-xs text-chart-3">+2.3%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-chart-2/10 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">98.96%</p>
                  <p className="text-sm text-muted-foreground">Model Accuracy</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-chart-3" />
                    <span className="text-xs text-chart-3">+11.66%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-chart-4/10 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">17.9%</p>
                  <p className="text-sm text-muted-foreground">FL Improvement</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-chart-3" />
                    <span className="text-xs text-chart-3">+0.5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assessment Trends - Line Chart Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Assessment Trends</span>
              </CardTitle>
              <CardDescription>Monthly assessment volume and decision breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  total: { label: "Total", color: "hsl(var(--chart-1))" },
                  approved: { label: "Approved", color: "hsl(var(--chart-3))" },
                  rejected: { label: "Rejected", color: "hsl(var(--chart-5))" },
                  pending: { label: "Pending", color: "hsl(var(--chart-4))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyAssessments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="approved"
                      stackId="1"
                      stroke="var(--color-approved)"
                      fill="var(--color-approved)"
                      name="Approved"
                    />
                    <Area
                      type="monotone"
                      dataKey="rejected"
                      stackId="1"
                      stroke="var(--color-rejected)"
                      fill="var(--color-rejected)"
                      name="Rejected"
                    />
                    <Area
                      type="monotone"
                      dataKey="pending"
                      stackId="1"
                      stroke="var(--color-pending)"
                      fill="var(--color-pending)"
                      name="Pending"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Model Performance - Bar Chart Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Model Performance</span>
              </CardTitle>
              <CardDescription>AI model accuracy metrics vs targets</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: { label: "Current", color: "#4f46e5" },
                  target: { label: "Target", color: "#e5e7eb" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={modelPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" angle={-45} textAnchor="end" height={100} interval={0} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {modelPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Risk Distribution - Pie Chart Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Risk Assessment Distribution</span>
              </CardTitle>
              <CardDescription>Comprehensive risk profile analysis and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Pie Chart */}
                <div className="lg:col-span-1">
                  <ChartContainer
                    config={{
                      value: { label: "Percentage", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={riskDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                {/* Risk Breakdown */}
                <div className="lg:col-span-1 space-y-4">
                  <h4 className="font-semibold text-foreground mb-4">Risk Categories</h4>
                  {riskDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold">{item.count}</span>
                        <p className="text-sm text-muted-foreground">profiles</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Insights */}
                <div className="lg:col-span-1 space-y-4">
                  <h4 className="font-semibold text-foreground mb-4">Key Insights</h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-chart-3/10 border border-chart-3/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-chart-3" />
                        <span className="font-medium text-chart-3">Low Risk Dominance</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        65% of profiles are classified as low risk, indicating strong model confidence and quality
                        applicant pool.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-chart-4/10 border border-chart-4/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-chart-4" />
                        <span className="font-medium text-chart-4">Balanced Distribution</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Only 10% high-risk profiles suggest effective pre-screening and alternative data validation.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-chart-1/10 border border-chart-1/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="h-4 w-4 text-chart-1" />
                        <span className="font-medium text-chart-1">Optimal Range</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        25% medium risk provides healthy balance for portfolio diversification and growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Data Usage - Bar Chart Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alternative Data Source Performance</CardTitle>
              <CardDescription>Usage rates and reliability scores across data sources</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  usage: { label: "Usage Rate", color: "#22c55e" },
                  reliability: { label: "Reliability", color: "#3b82f6" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={alternativeDataUsage} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" angle={-45} textAnchor="end" height={100} interval={0} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="usage" fill="#22c55e" name="Usage Rate %" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="reliability" fill="#3b82f6" name="Reliability %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Federated Learning Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Federated Learning Impact</CardTitle>
            <CardDescription>Performance improvement across participating institutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {federatedLearningMetrics.map((institution, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{institution.institution}</h4>
                      <p className="text-sm text-muted-foreground">
                        {institution.dataPoints.toLocaleString()} data points
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-chart-3" />
                      <span className="text-lg font-bold text-chart-3">+{institution.improvement}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Performance Improvement</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loan Amount Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Amount Distribution</CardTitle>
            <CardDescription>Breakdown of loan applications by amount ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loanAmountDistribution.map((range, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">₹{range.range}</span>
                    <span className="text-muted-foreground">
                      {range.count} applications ({range.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-chart-1 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${range.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health Indicators */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Activity className="h-5 w-5 text-chart-3" />
                <span>System Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">API Response Time</span>
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                    180ms
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Model Inference Time</span>
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                    0.8s
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">System Uptime</span>
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                    99.9%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-chart-4" />
                <span>Data Quality</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completeness</span>
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                    97.8%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                    98.96%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Freshness</span>
                  <Badge variant="secondary" className="bg-chart-4/10 text-chart-4">
                    89.1%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-chart-1" />
                <span>Business Impact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Processing Time Saved</span>
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                    78%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Default Rate Reduction</span>
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                    17.92%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cost Savings</span>
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                    ₹2.4Cr
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
