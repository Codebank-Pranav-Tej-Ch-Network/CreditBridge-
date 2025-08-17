"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Building2,
  ArrowLeft,
  User,
  CreditCard,
  Smartphone,
  MapPin,
  Share2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock detailed profile data
const mockProfiles = [
  {
    id: "CR001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    address: "123 MG Road, Bangalore, Karnataka 560001",
    assessmentDate: "2024-01-15",
    loanAmount: 500000,
    creditScore: 750,
    riskLevel: "Low" as const,
    decision: "Approved" as const,
    confidence: 87.3,
    bankingScore: 85,
    creditBureauScore: 78,
    deviceScore: 82,
    geolocationScore: 88,
    socialMediaScore: 75,
    documentScore: 92,
    riskFactors: [
      { factor: "Default Risk", score: 15, weight: 0.25 },
      { factor: "Late Payment", score: 12, weight: 0.2 },
      { factor: "Fraud Risk", score: 8, weight: 0.15 },
      { factor: "Loan Stacking", score: 5, weight: 0.15 },
      { factor: "Identity Mismatch", score: 3, weight: 0.15 },
      { factor: "Repayment Stability", score: 10, weight: 0.1 },
    ],
    approvalReasons: [
      "Strong credit history with CIBIL score of 750",
      "Stable employment and consistent income patterns",
      "Low default risk indicators from alternative data",
      "Verified identity documents with high confidence",
      "Positive social media presence indicating stability",
      "Consistent geolocation patterns showing residential stability",
    ],
    monthlyTrends: [
      { month: "Jul", score: 720, transactions: 45 },
      { month: "Aug", score: 735, transactions: 52 },
      { month: "Sep", score: 742, transactions: 48 },
      { month: "Oct", score: 748, transactions: 55 },
      { month: "Nov", score: 750, transactions: 51 },
      { month: "Dec", score: 750, transactions: 49 },
    ],
  },
  {
    id: "CR002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    address: "456 Park Street, Mumbai, Maharashtra 400001",
    assessmentDate: "2024-01-14",
    loanAmount: 300000,
    creditScore: 680,
    riskLevel: "Medium" as const,
    decision: "Approved" as const,
    confidence: 72.1,
    bankingScore: 78,
    creditBureauScore: 72,
    deviceScore: 85,
    geolocationScore: 80,
    socialMediaScore: 68,
    documentScore: 88,
    riskFactors: [
      { factor: "Default Risk", score: 25, weight: 0.25 },
      { factor: "Late Payment", score: 20, weight: 0.2 },
      { factor: "Fraud Risk", score: 12, weight: 0.15 },
      { factor: "Loan Stacking", score: 8, weight: 0.15 },
      { factor: "Identity Mismatch", score: 5, weight: 0.15 },
      { factor: "Repayment Stability", score: 18, weight: 0.1 },
    ],
    approvalReasons: [
      "Decent credit history with CIBIL score of 680",
      "Regular income with minor fluctuations",
      "Medium risk profile acceptable for loan amount",
      "Strong device analytics indicating stability",
      "Verified documents with good confidence",
      "Consistent banking patterns over 6 months",
    ],
    monthlyTrends: [
      { month: "Jul", score: 650, transactions: 38 },
      { month: "Aug", score: 660, transactions: 42 },
      { month: "Sep", score: 665, transactions: 40 },
      { month: "Oct", score: 675, transactions: 45 },
      { month: "Nov", score: 680, transactions: 43 },
      { month: "Dec", score: 680, transactions: 41 },
    ],
  },
  {
    id: "CR003",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 76543 21098",
    address: "789 Civil Lines, Delhi, Delhi 110001",
    assessmentDate: "2024-01-13",
    loanAmount: 800000,
    creditScore: 620,
    riskLevel: "High" as const,
    decision: "Rejected" as const,
    confidence: 91.5,
    bankingScore: 65,
    creditBureauScore: 58,
    deviceScore: 70,
    geolocationScore: 75,
    socialMediaScore: 60,
    documentScore: 82,
    riskFactors: [
      { factor: "Default Risk", score: 45, weight: 0.25 },
      { factor: "Late Payment", score: 38, weight: 0.2 },
      { factor: "Fraud Risk", score: 25, weight: 0.15 },
      { factor: "Loan Stacking", score: 20, weight: 0.15 },
      { factor: "Identity Mismatch", score: 8, weight: 0.15 },
      { factor: "Repayment Stability", score: 35, weight: 0.1 },
    ],
    approvalReasons: [
      "High default risk indicators from credit bureau data",
      "Multiple late payments in recent credit history",
      "Loan amount too high relative to risk profile",
      "Inconsistent income patterns detected",
      "Multiple loan inquiries in short timeframe",
      "Geolocation data shows frequent address changes",
    ],
    monthlyTrends: [
      { month: "Jul", score: 640, transactions: 25 },
      { month: "Aug", score: 635, transactions: 28 },
      { month: "Sep", score: 630, transactions: 22 },
      { month: "Oct", score: 625, transactions: 30 },
      { month: "Nov", score: 620, transactions: 26 },
      { month: "Dec", score: 620, transactions: 24 },
    ],
  },
  {
    id: "CR004",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 65432 10987",
    address: "321 Tank Bund Road, Hyderabad, Telangana 500001",
    assessmentDate: "2024-01-12",
    loanAmount: 250000,
    creditScore: 720,
    riskLevel: "Low" as const,
    decision: "Approved" as const,
    confidence: 84.7,
    bankingScore: 82,
    creditBureauScore: 75,
    deviceScore: 88,
    geolocationScore: 85,
    socialMediaScore: 78,
    documentScore: 90,
    riskFactors: [
      { factor: "Default Risk", score: 18, weight: 0.25 },
      { factor: "Late Payment", score: 15, weight: 0.2 },
      { factor: "Fraud Risk", score: 10, weight: 0.15 },
      { factor: "Loan Stacking", score: 6, weight: 0.15 },
      { factor: "Identity Mismatch", score: 4, weight: 0.15 },
      { factor: "Repayment Stability", score: 12, weight: 0.1 },
    ],
    approvalReasons: [
      "Good credit history with CIBIL score of 720",
      "Stable employment in IT sector",
      "Low risk indicators across all data sources",
      "Strong social media presence with professional network",
      "Excellent document verification scores",
      "Consistent banking and spending patterns",
    ],
    monthlyTrends: [
      { month: "Jul", score: 700, transactions: 42 },
      { month: "Aug", score: 705, transactions: 45 },
      { month: "Sep", score: 710, transactions: 43 },
      { month: "Oct", score: 715, transactions: 48 },
      { month: "Nov", score: 720, transactions: 46 },
      { month: "Dec", score: 720, transactions: 44 },
    ],
  },
  {
    id: "CR005",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 54321 09876",
    address: "654 Mall Road, Shimla, Himachal Pradesh 171001",
    assessmentDate: "2024-01-11",
    loanAmount: 600000,
    creditScore: 590,
    riskLevel: "High" as const,
    decision: "Rejected" as const,
    confidence: 89.2,
    bankingScore: 60,
    creditBureauScore: 55,
    deviceScore: 65,
    geolocationScore: 70,
    socialMediaScore: 58,
    documentScore: 78,
    riskFactors: [
      { factor: "Default Risk", score: 50, weight: 0.25 },
      { factor: "Late Payment", score: 42, weight: 0.2 },
      { factor: "Fraud Risk", score: 28, weight: 0.15 },
      { factor: "Loan Stacking", score: 25, weight: 0.15 },
      { factor: "Identity Mismatch", score: 12, weight: 0.15 },
      { factor: "Repayment Stability", score: 38, weight: 0.1 },
    ],
    approvalReasons: [
      "Poor credit history with multiple defaults",
      "Low CIBIL score of 590 indicates high risk",
      "Evidence of loan stacking behavior",
      "Irregular income patterns detected",
      "High debt-to-income ratio",
      "Multiple rejected loan applications in past",
    ],
    monthlyTrends: [
      { month: "Jul", score: 610, transactions: 20 },
      { month: "Aug", score: 605, transactions: 22 },
      { month: "Sep", score: 600, transactions: 18 },
      { month: "Oct", score: 595, transactions: 25 },
      { month: "Nov", score: 590, transactions: 21 },
      { month: "Dec", score: 590, transactions: 19 },
    ],
  },
  {
    id: "CR006",
    name: "Anita Gupta",
    email: "anita.gupta@email.com",
    phone: "+91 43210 98765",
    address: "987 Residency Road, Pune, Maharashtra 411001",
    assessmentDate: "2024-01-10",
    loanAmount: 400000,
    creditScore: 700,
    riskLevel: "Medium" as const,
    decision: "Pending" as const,
    confidence: 76.8,
    bankingScore: 75,
    creditBureauScore: 70,
    deviceScore: 80,
    geolocationScore: 78,
    socialMediaScore: 72,
    documentScore: 85,
    riskFactors: [
      { factor: "Default Risk", score: 22, weight: 0.25 },
      { factor: "Late Payment", score: 18, weight: 0.2 },
      { factor: "Fraud Risk", score: 15, weight: 0.15 },
      { factor: "Loan Stacking", score: 10, weight: 0.15 },
      { factor: "Identity Mismatch", score: 6, weight: 0.15 },
      { factor: "Repayment Stability", score: 20, weight: 0.1 },
    ],
    approvalReasons: [
      "Moderate credit history requiring additional verification",
      "CIBIL score of 700 is acceptable but borderline",
      "Recent job change affecting stability assessment",
      "Pending verification of employment documents",
      "Good banking patterns but limited credit history",
      "Social media verification in progress",
    ],
    monthlyTrends: [
      { month: "Jul", score: 680, transactions: 35 },
      { month: "Aug", score: 685, transactions: 38 },
      { month: "Sep", score: 690, transactions: 36 },
      { month: "Oct", score: 695, transactions: 40 },
      { month: "Nov", score: 700, transactions: 37 },
      { month: "Dec", score: 700, transactions: 39 },
    ],
  },
]

// Function to find profile by ID
function findProfileById(id: string) {
  return mockProfiles.find((profile) => profile.id === id)
}

export default function ProfileDetailPage({ params }: { params: { id: string } }) {
  const profileData = findProfileById(params.id)

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/profiles">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Profiles
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Profile Not Found</h1>
                  <p className="text-sm text-muted-foreground">ID: {params.id}</p>
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Profile Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The profile with ID "{params.id}" could not be found in the database.
              </p>
              <Link href="/profiles">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Profiles
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const alternativeDataScores = [
    { name: "Banking Data", score: profileData.bankingScore, color: "#4f46e5" },
    { name: "Credit Bureau", score: profileData.creditBureauScore, color: "#3b82f6" },
    { name: "Device Analytics", score: profileData.deviceScore, color: "#22c55e" },
    { name: "Geolocation", score: profileData.geolocationScore, color: "#fbbf24" },
    { name: "Social Media", score: profileData.socialMediaScore, color: "#ef4444" },
    { name: "Documents", score: profileData.documentScore, color: "#8b5cf6" },
  ]

  const riskDistribution = [
    { name: "Low Risk", value: 65, color: "#22c55e" },
    { name: "Medium Risk", value: 25, color: "#fbbf24" },
    { name: "High Risk", value: 10, color: "#ef4444" },
  ]

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case "Approved":
        return <CheckCircle className="h-5 w-5 text-chart-3" />
      case "Rejected":
        return <XCircle className="h-5 w-5 text-chart-5" />
      default:
        return <AlertTriangle className="h-5 w-5 text-chart-4" />
    }
  }

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "Approved":
        return "text-chart-3"
      case "Rejected":
        return "text-chart-5"
      default:
        return "text-chart-4"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/profiles">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profiles
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Profile Details</h1>
                <p className="text-sm text-muted-foreground">ID: {profileData.id}</p>
              </div>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-accent/10 rounded-lg flex items-center justify-center">
                  <User className="h-8 w-8 text-accent" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
                  <p className="text-muted-foreground">{profileData.email}</p>
                  <p className="text-muted-foreground">{profileData.phone}</p>
                  <p className="text-sm text-muted-foreground">{profileData.address}</p>
                </div>
              </div>

              <div className="text-right space-y-2">
                <div className={`flex items-center space-x-2 ${getDecisionColor(profileData.decision)}`}>
                  {getDecisionIcon(profileData.decision)}
                  <span className="text-2xl font-bold">{profileData.decision}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Assessed on {new Date(profileData.assessmentDate).toLocaleDateString()}
                </p>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {profileData.confidence}% Confidence
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <CreditCard className="h-8 w-8 text-chart-1 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{profileData.creditScore}</p>
              <p className="text-sm text-muted-foreground">Credit Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-chart-2 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">₹{profileData.loanAmount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Loan Amount</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 text-chart-3 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{profileData.riskLevel}</p>
              <p className="text-sm text-muted-foreground">Risk Level</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-chart-4 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{profileData.confidence}%</p>
              <p className="text-sm text-muted-foreground">AI Confidence</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        {/* Alternative Data Scores - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle>Alternative Data Scores</CardTitle>
            <CardDescription>Performance across different data sources</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                score: {
                  label: "Score",
                  color: "#f59e0b",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={alternativeDataScores} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {alternativeDataScores.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution and Monthly Trends - Side by Side */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Risk Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Distribution</CardTitle>
              <CardDescription>Overall risk profile breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Percentage",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[350px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
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
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Score Trend</CardTitle>
              <CardDescription>6-month credit score and transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: "Credit Score",
                    color: "#10b981",
                  },
                  transactions: {
                    label: "Transactions",
                    color: "#f59e0b",
                  },
                }}
                className="h-[350px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profileData.monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                      name="Credit Score"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="transactions"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ fill: "#f59e0b", strokeWidth: 2, r: 6 }}
                      name="Transactions"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Risk Factors Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Factors Analysis</CardTitle>
            <CardDescription>Detailed breakdown of risk components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileData.riskFactors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{factor.factor}</span>
                  <span className="text-muted-foreground">
                    Score: {factor.score} | Weight: {(factor.weight * 100).toFixed(0)}%
                  </span>
                </div>
                <Progress value={factor.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Decision Reasoning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getDecisionIcon(profileData.decision)}
              <span>Decision Reasoning</span>
            </CardTitle>
            <CardDescription>
              AI-powered explanation for the {profileData.decision.toLowerCase()} decision
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profileData.approvalReasons.map((reason, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="h-5 w-5 text-chart-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">{reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alternative Data Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Banking & Financial Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Banking Score</span>
                <span className="font-semibold">{profileData.bankingScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Account Type</span>
                <span className="font-semibold">Savings Account</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Average Balance</span>
                <span className="font-semibold">₹45,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transaction Frequency</span>
                <span className="font-semibold">High</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Device & SIM Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Device Score</span>
                <span className="font-semibold">{profileData.deviceScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Device Type</span>
                <span className="font-semibold">Smartphone</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">SIM Age</span>
                <span className="font-semibold">2+ years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Network Provider</span>
                <span className="font-semibold">Jio</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Geolocation Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Location Score</span>
                <span className="font-semibold">{profileData.geolocationScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Location Stability</span>
                <span className="font-semibold">Stable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Travel Pattern</span>
                <span className="font-semibold">Local</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Home-Work Distance</span>
                <span className="font-semibold">15 km</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="h-5 w-5" />
                <span>Social Media & Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Social Media Score</span>
                <span className="font-semibold">{profileData.socialMediaScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Document Score</span>
                <span className="font-semibold">{profileData.documentScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">LinkedIn Verified</span>
                <CheckCircle className="h-4 w-4 text-chart-3" />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Document Match</span>
                <CheckCircle className="h-4 w-4 text-chart-3" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
