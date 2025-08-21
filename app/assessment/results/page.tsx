"use client"
import { useEffect, useState } from "react"
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

export default function ResultsPage() {
   // --- ADD THIS NEW LOGIC ---
  const [results, setResults] = useState<any | null>(null) // State to hold dynamic data
  const [loading, setLoading] = useState(true) // State to handle loading

  useEffect(() => {
    // This code runs once when the page loads
    const storedData = localStorage.getItem('assessmentResult')

    if (storedData) {
      const { formData, apiResponse } = JSON.parse(storedData)

      // Transform the raw data into the rich format your page needs
      const formattedResult = {
        decision: apiResponse.prediction === 1 ? "Approved" : "Rejected",
        confidence: parseFloat((apiResponse.approval_probability * 100).toFixed(1)),
        applicantName: formData.fullName || "N/A",
        loanAmount: parseFloat(formData.loanAmount) || 0,
        creditScore: parseInt(formData.cibilScore, 10) || 0,
        riskLevel: apiResponse.approval_probability > 0.7 ? "Low" : "High",
        profileId: "CR001", // Example static ID
        approvalReasons: apiResponse.prediction === 1 ?
            [
                "Strong credit history with CIBIL score.",
                "Stable income patterns from banking data.",
                "Low default risk indicators from alternative data.",
            ] : [
                "Credit score is below the required threshold.",
                "Inconsistent income patterns detected in banking data.",
                "High risk indicators from device and location analytics.",
            ],
        // Mocking the rest of the data for UI completeness
        modelExplanation: {
          topFeatures: [
            { feature: "CIBIL Score", impact: 0.45, direction: "positive" },
            { feature: "Bank Balance", impact: 0.25, direction: "positive" },
            { feature: "Social Reach", impact: 0.15, direction: "positive" },
          ],
        },
        riskFactors: [ { factor: "Default Risk", score: Math.round((1 - apiResponse.approval_probability) * 100), weight: 50, status: "low" } ],
        dataSourceScores: [ { source: "Credit Bureau", score: parseInt(formData.cibilScore, 10) / 10, reliability: 92 } ],
      };

      setResults(formattedResult)
    }
    setLoading(false)
  }, []) // The empty array [] ensures this runs only once
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
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading Results...</div>
  }

  if (!results) {
    return <div className="flex justify-center items-center h-screen">Could not load assessment results. Please start a new assessment.</div>
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
          <Card className={`${getDecisionBg(results.decision)} border-2`}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">{getDecisionIcon(results.decision)}</div>
                  <div className="space-y-2">
                    <h2 className={`text-3xl font-bold ${getDecisionColor(results.decision)}`}>
                      Loan {results.decision}
                    </h2>
                    <p className="text-lg text-muted-foreground">Assessment for {results.applicantName}</p>
                    <p className="text-sm text-muted-foreground">
                      Loan Amount: ₹{results.loanAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-3xl font-bold text-foreground">{results.confidence}%</div>
                  <p className="text-sm text-muted-foreground">AI Confidence</p>
                  <Badge variant="secondary" className="text-sm">
                    Risk Level: {results.riskLevel}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{results.creditScore}</div>
                <p className="text-sm text-muted-foreground">Credit Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{results.confidence}%</div>
                <p className="text-sm text-muted-foreground">Model Confidence</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{results.riskLevel}</div>
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
                AI-powered explanation for the {results.decision.toLowerCase()} decision using Explainable AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.approvalReasons.map((reason, index) => (
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
                    data={results.modelExplanation.topFeatures}
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
              {results.riskFactors.map((factor, index) => (
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
                {results.dataSourceScores.map((source, index) => (
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
            <Link href={`/profiles/${results.profileId}`}>
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
