"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Building2, Brain, Database, Network, Eye, CheckCircle, Loader2, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProcessingStep {
  id: string
  name: string
  description: string
  status: "pending" | "processing" | "completed"
  duration: number
}

export default function ProcessingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [processingComplete, setProcessingComplete] = useState(false)

  const processingSteps: ProcessingStep[] = [
    {
      id: "data_validation",
      name: "Data Validation",
      description: "Validating input data and checking completeness",
      status: "pending",
      duration: 2000,
    },
    {
      id: "feature_engineering",
      name: "Feature Engineering",
      description: "Processing alternative data sources and extracting features",
      status: "pending",
      duration: 3000,
    },
    {
      id: "federated_inference",
      name: "Federated Model Inference",
      description: "Running XGBoost model with federated learning enhancements",
      status: "pending",
      duration: 4000,
    },
    {
      id: "explainable_ai",
      name: "Explainable AI Analysis",
      description: "Generating SHAP and LIME explanations for decision transparency",
      status: "pending",
      duration: 3500,
    },
    {
      id: "risk_assessment",
      name: "Risk Assessment",
      description: "Calculating final risk score and confidence metrics",
      status: "pending",
      duration: 2500,
    },
    {
      id: "profile_creation",
      name: "Profile Creation",
      description: "Storing assessment results and creating user profile",
      status: "pending",
      duration: 2000,
    },
  ]

  const [steps, setSteps] = useState(processingSteps)

  useEffect(() => {
    const processSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        // Update current step to processing
        setSteps((prev) =>
          prev.map((step, index) => ({
            ...step,
            status: index === i ? "processing" : index < i ? "completed" : "pending",
          })),
        )
        setCurrentStep(i)

        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, steps[i].duration))

        // Update progress
        setProgress(((i + 1) / steps.length) * 100)

        // Mark step as completed
        setSteps((prev) =>
          prev.map((step, index) => ({
            ...step,
            status: index <= i ? "completed" : "pending",
          })),
        )
      }

      setProcessingComplete(true)

      // Redirect to results after a short delay
      setTimeout(() => {
        router.push("/assessment/results")
      }, 2000)
    }

    processSteps()
  }, [router, steps.length])

  const getStepIcon = (step: ProcessingStep) => {
    switch (step.status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-chart-3" />
      case "processing":
        return <Loader2 className="h-5 w-5 text-chart-1 animate-spin" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
    }
  }

  const getStepColor = (step: ProcessingStep) => {
    switch (step.status) {
      case "completed":
        return "text-chart-3"
      case "processing":
        return "text-chart-1"
      default:
        return "text-muted-foreground"
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
              <p className="text-sm text-muted-foreground">Processing Credit Assessment</p>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Processing Header */}
          <div className="text-center space-y-4">
            <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Brain className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">AI Model Processing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our advanced XGBoost model with federated learning is analyzing the submitted data using alternative data
              sources and explainable AI techniques.
            </p>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Processing Progress</span>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {Math.round(progress)}% Complete
                </Badge>
              </CardTitle>
              <CardDescription>
                {processingComplete
                  ? "Assessment completed successfully! Redirecting to results..."
                  : `Currently processing: ${steps[currentStep]?.name}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="h-3 mb-4" />

              {processingComplete && (
                <div className="flex items-center justify-center space-x-2 text-chart-3">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Processing Complete!</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Processing Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Processing Pipeline</span>
              </CardTitle>
              <CardDescription>Real-time view of the AI model processing pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="flex-shrink-0">{getStepIcon(step)}</div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${getStepColor(step)}`}>{step.name}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {step.status === "processing" && (
                        <Badge variant="secondary" className="bg-chart-1/10 text-chart-1">
                          Processing...
                        </Badge>
                      )}
                      {step.status === "completed" && (
                        <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                          Completed
                        </Badge>
                      )}
                      {step.status === "pending" && <Badge variant="secondary">Pending</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Database className="h-5 w-5 text-chart-1" />
                  <span>Data Sources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Banking Data</span>
                    <CheckCircle className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credit Bureau</span>
                    <CheckCircle className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Device Analytics</span>
                    <CheckCircle className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Geolocation</span>
                    <CheckCircle className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Social Media</span>
                    <CheckCircle className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Documents</span>
                    <CheckCircle className="h-4 w-4 text-chart-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Network className="h-5 w-5 text-chart-2" />
                  <span>Model Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Algorithm</span>
                    <span className="font-semibold">XGBoost</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-semibold">87.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Features</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Training Data</span>
                    <span className="font-semibold">300K+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">FL Enhancement</span>
                    <span className="font-semibold">+17.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-chart-3" />
                  <span>Explainability</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SHAP Values</span>
                    <CheckCircle className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LIME Analysis</span>
                    <CheckCircle className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Feature Importance</span>
                    <CheckCircle className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bias Detection</span>
                    <CheckCircle className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Decision Tree</span>
                    <CheckCircle className="h-4 w-4 text-chart-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Processing Animation */}
          <Card>
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="flex justify-center space-x-2">
                  <div className="h-3 w-3 bg-chart-1 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-3 w-3 bg-chart-2 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-3 w-3 bg-chart-3 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <p className="text-muted-foreground">
                  {processingComplete
                    ? "Assessment completed! Preparing results..."
                    : "Please wait while we process your credit assessment..."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
