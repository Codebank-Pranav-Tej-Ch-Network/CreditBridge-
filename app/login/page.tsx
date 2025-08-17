"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { Building2, Shield, Brain, Users } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
      window.location.href = "/dashboard"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding and Features */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">CreditBridge</h1>
                <p className="text-muted-foreground">Innovation that connects</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              Alternative Data Credit Risk Management System using Federated Learning and Explainable AI
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-chart-1/10 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Federated Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Collaborative model training while preserving data privacy across institutions
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-chart-2/10 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Explainable AI</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent decision-making with SHAP and LIME explanations for regulatory compliance
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-chart-3/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Alternative Data</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive creditworthiness assessment using 6 alternative data sources
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Developed by Digital Wizards Club</p>
            <p>Indian Institute of Technology, Tirupati</p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Bank Personnel Login</CardTitle>
            <CardDescription>Enter your credentials to access the credit risk assessment system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your bank email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Secure access for authorized banking personnel only</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
