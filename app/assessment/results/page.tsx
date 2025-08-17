"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Building2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  User,
  FileText,
  BarChart3,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock assessment results
const assessmentResults = {
  decision: "Approved", // This would be "Approved", "Rejected", or "Pending"
  confidence: 87.3,
  creditScore: 750,
  riskLevel: "Low",
  loanAmount: 500000,
  applicantName: "Rajesh Kumar",
  profileId: "CR001",

  // Risk factors breakdown
  riskFactors: [
    { factor: "Default Risk", score: 15, weight: 25, status: "low" },
    { factor: "Late Payment", score: 12, weight: 20, status: "low" },
    { factor: "Fraud Risk", score: 8, weight: 15, status: "low" },
    { factor: "Loan Stacking", score: 5, weight: 15, status: "low" },
    { factor: "Identity Mismatch", score: 3, weight: 15, status: "low" },
    { factor: "Repayment Stability", score: 10, weight: 10, status: "low" },
  ],

  // Alternative data scores
  dataSourceScores: [
    { source: "Banking Data", score: 85, reliability: 92 },
    { source: "Credit Bureau", score: 78, reliability: 89 },
    { source: "Device Analytics", score: 82, reliability: 85 },
    { source: "Geolocation", score: 88, reliability: 81 },
    { source: "Social Media", score: 75, reliability: 73 },
    { source: "Documents", score: 92, reliability: 94 },
  ],

  // Key decision factors
  approvalReasons: [
    "Strong credit history with CIBIL score of 750",
    "Stable employment and consistent income patterns",
    "Low default risk indicators from alternative data",
    "Verified identity documents with high confidence",
    "Positive social media presence indicating stability",
    "Consistent geolocation patterns showing residential stability",
  ],

  // Model explanation
  modelExplanation: {
    topFeatures: [
      { feature: "Credit Score", impact: 0.23, direction: "positive" },
      { feature: "Income Stability", impact: 0.18, direction: "positive" },
      { feature: "Document Verification", impact: 0.15, direction: "positive" },
      { feature: "Banking Behavior", impact: 0.12, direction: "positive" },
      { feature: "Location Stability", impact: 0.1, direction: "positive" },
    ],
  },
}

export default function ResultsPage() {
  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case "Approved":
        return <CheckCircle className="h-8 w-8 text-chart-3" />
      case "Rejected":
        return <XCircle className="h-8 w-8 text-chart-5" />
      default:
        return <AlertTriangle className="h-8 w-8 text-chart-4" />
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

  const getDecisionBg = (decision: string) => {
    switch (decision) {
      case "Approved":
        return "bg-chart-3/10"
      case "Rejected":
        return "bg-chart-5/10"
      default:
        return "bg-chart-4/10"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CreditBridge</h1>
              <p className="text-sm text-muted-foreground">Assessment Results</p>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Results Header */}
          <Card className={`${getDecisionBg(assessmentResults.decision)} border-2`}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">{getDecisionIcon(assessmentResults.decision)}</div>
                  <div className="space-y-2">
                    <h2 className={`text-3xl font-bold ${getDecisionColor(assessmentResults.decision)}`}>
                      Loan {assessmentResults.decision}
                    </h2>
                    <p className="text-lg text-muted-foreground">Assessment for {assessmentResults.applicantName}</p>
                    <p className="text-sm text-muted-foreground">
                      Loan Amount: ₹{assessmentResults.loanAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-3xl font-bold text-foreground">{assessmentResults.confidence}%</div>
                  <p className="text-sm text-muted-foreground">AI Confidence</p>
                  <Badge variant="secondary" className="text-sm">
                    Risk Level: {assessmentResults.riskLevel}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{assessmentResults.creditScore}</div>
                <p className="text-sm text-muted-foreground">Credit Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{assessmentResults.confidence}%</div>
                <p className="text-sm text-muted-foreground">Model Confidence</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{assessmentResults.riskLevel}</div>
                <p className="text-sm text-muted-foreground">Risk Assessment</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">6/6</div>
                <p className="text-sm text-muted-foreground">Data Sources</p>
              </CardContent>
            </Card>
          </div>

          {/* Decision Reasoning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Decision Reasoning</span>
              </CardTitle>
              <CardDescription>
                AI-powered explanation for the {assessmentResults.decision.toLowerCase()} decision using Explainable AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assessmentResults.approvalReasons.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                    <CheckCircle className="h-5 w-5 text-chart-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Model Feature Importance */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Importance Analysis</CardTitle>
              <CardDescription>SHAP values showing the most influential factors in the decision</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  impact: {
                    label: "Impact",
                    color: "#8b5cf6",
                  },
                }}
                className="h-[450px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={assessmentResults.modelExplanation.topFeatures}
                    margin={{ top: 20, right: 30, left: 20, bottom: 140 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="feature" angle={-45} textAnchor="end" height={140} interval={0} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="impact" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Risk Factors Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Factors Breakdown</CardTitle>
              <CardDescription>Detailed analysis of risk components and their weights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assessmentResults.riskFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{factor.factor}</span>
                    <span className="text-muted-foreground">
                      Score: {factor.score} | Weight: {factor.weight}%
                    </span>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alternative Data Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Alternative Data Source Performance</CardTitle>
              <CardDescription>Scores and reliability across different data sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {assessmentResults.dataSourceScores.map((source, index) => (
                  <div key={index} className="space-y-3 p-4 rounded-lg bg-muted/30">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-foreground">{source.source}</h4>
                      <Badge variant="secondary">{source.score}/100</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Score</span>
                        <span className="font-semibold">{source.score}%</span>
                      </div>
                      <Progress value={source.score} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Reliability</span>
                        <span className="font-semibold">{source.reliability}%</span>
                      </div>
                      <Progress value={source.reliability} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Link href={`/profiles/${assessmentResults.profileId}`}>
              <Button size="lg" className="px-8">
                <User className="h-4 w-4 mr-2" />
                View Full Profile
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/assessment/new">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                New Assessment
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Assessment Details</CardTitle>
              <CardDescription>Model and processing information for audit trail</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Model Information</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Algorithm:</span>
                      <span>XGBoost</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version:</span>
                      <span>v2.1.3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Training Date:</span>
                      <span>2024-01-01</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Processing Details</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Time:</span>
                      <span>17.2s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Features Used:</span>
                      <span>156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data Completeness:</span>
                      <span>94.2%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Compliance</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Explainability:</span>
                      <CheckCircle className="h-4 w-4 text-chart-3" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bias Check:</span>
                      <CheckCircle className="h-4 w-4 text-chart-3" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Audit Trail:</span>
                      <CheckCircle className="h-4 w-4 text-chart-3" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
