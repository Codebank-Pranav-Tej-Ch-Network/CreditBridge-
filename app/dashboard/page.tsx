"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Progress } from "@/components/ui/progress"
import { Building2, TrendingUp, Database, Eye, Network, BarChart3, FileText, Search, Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const modelFeatures = [
    "Account Aggregator Banking Data",
    "Credit Bureau Information",
    "Device/SIM Analytics",
    "Geolocation Data",
    "Social Media Profiles",
    "Document Verification",
  ]

  const modelMetrics = [
    { label: "Model Accuracy", value: 98.96, color: "bg-chart-1" },
    { label: "Precision", value: 99.0, color: "bg-chart-2" },
    { label: "Recall", value: 99.0, color: "bg-chart-3" },
    { label: "F1-Score", value: 99.0, color: "bg-chart-4" },
    { label: "ROC AUC", value: 99.84, color: "bg-chart-5" },
  ]

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
              <p className="text-sm text-muted-foreground">Credit Risk Assessment Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/profiles">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search Profiles
              </Button>
            </Link>
            <Link href="/assessment/new">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Assessment
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Alternative Data Credit Risk Management System</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Leveraging Federated Learning and Explainable AI to democratize credit access while maintaining regulatory
            compliance and risk management standards.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-chart-1/10 rounded-lg flex items-center justify-center">
                  <Network className="h-5 w-5 text-chart-1" />
                </div>
                <CardTitle className="text-lg">Federated Learning</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Collaborative model training across institutions while preserving data privacy.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Performance Improvement</span>
                  <span className="font-semibold">17.92%</span>
                </div>
                <Progress value={17.92} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-chart-2/10 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-chart-2" />
                </div>
                <CardTitle className="text-lg">Explainable AI</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Transparent decision-making with SHAP and LIME explanations for compliance.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">SHAP</Badge>
                <Badge variant="secondary">LIME</Badge>
                <Badge variant="secondary">Bias Detection</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-chart-3/10 rounded-lg flex items-center justify-center">
                  <Database className="h-5 w-5 text-chart-3" />
                </div>
                <CardTitle className="text-lg">Alternative Data</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive assessment using 6 alternative data sources.
              </p>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Data Sources</span>
                  <span className="font-semibold">6 Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Model Performance */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Model Performance Metrics</span>
              </CardTitle>
              <CardDescription>Current XGBoost model performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {modelMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{metric.label}</span>
                    <span className="font-semibold">{metric.value}%</span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Alternative Data Features</span>
              </CardTitle>
              <CardDescription>Data sources integrated into the risk assessment model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {modelFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
                    <div className="h-2 w-2 bg-accent rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Expected Impact & Business Benefits</span>
            </CardTitle>
            <CardDescription>Projected outcomes from implementing CreditBridge system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-chart-1">451M</div>
                <div className="text-sm text-muted-foreground">Indians with Limited Credit Access</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-chart-2">60-70%</div>
                <div className="text-sm text-muted-foreground">Increase in Credit Approvals</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-chart-3">80%</div>
                <div className="text-sm text-muted-foreground">Reduction in Processing Time</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-chart-4">€200M</div>
                <div className="text-sm text-muted-foreground">Potential Cost Savings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4">
          <Link href="/assessment/new">
            <Button size="lg" className="px-8">
              <Plus className="h-4 w-4 mr-2" />
              Start New Assessment
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              <Search className="h-4 w-4 mr-2" />
              Advanced Search
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              <FileText className="h-4 w-4 mr-2" />
              About Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
