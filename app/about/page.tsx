"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Building2,
  ArrowLeft,
  Users,
  Award,
  Shield,
  Brain,
  Network,
  Globe,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    "Member 1 - Team Lead",
    "Member 2 - Technical Lead",
    "Member 3 - AI/ML Specialist",
    "Member 4 - Security Expert",
  ]

  const technologies = [
    "Federated Learning",
    "Explainable AI (XAI)",
    "XGBoost Algorithm",
    "SHAP & LIME",
    "Alternative Data Analytics",
    "Cybersecurity Protocols",
  ]

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
                <h1 className="text-xl font-bold text-foreground">CreditBridge</h1>
                <p className="text-sm text-muted-foreground">About Our Project</p>
              </div>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">About CreditBridge</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Innovation that connects - Democratizing credit access through cutting-edge AI technology
            </p>
          </div>

          <div className="flex justify-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Alternative Data Credit Risk Management System
            </Badge>
          </div>
        </div>

        {/* Project Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Project Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Traditional credit scoring systems exclude approximately 1.4 billion unbanked and underbanked individuals
              globally, with 451 million Indians having limited credit access. Our solution leverages alternative data
              sources through a federated learning architecture combined with explainable AI to democratize credit
              access while maintaining regulatory compliance and risk management standards.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The CreditBridge system integrates six alternative data sources—Account Aggregator banking data, credit
              bureau information, device/SIM analytics, geolocation data, social media profiles, and document
              verification—to generate comprehensive creditworthiness assessments.
            </p>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Core Technologies</span>
              </CardTitle>
              <CardDescription>Advanced AI and machine learning technologies powering CreditBridge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className="h-2 w-2 bg-accent rounded-full" />
                    <span className="text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Development Team</span>
              </CardTitle>
              <CardDescription>The talented individuals behind CreditBridge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className="h-8 w-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-sm">{member}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Institution Credit */}
        <Card className="bg-gradient-to-r from-accent/5 to-chart-1/5 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-accent" />
              <span>Developed by Digital Wizards Club</span>
            </CardTitle>
            <CardDescription>Cybersecurity & Quantum Computing Domains</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-accent/10 rounded-lg flex items-center justify-center">
                <Globe className="h-8 w-8 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Indian Institute of Technology, Tirupati</h3>
                <p className="text-muted-foreground">
                  A premier technical institution fostering innovation in emerging technologies
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-chart-1" />
                  <h4 className="font-semibold">Cybersecurity Domain</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Focusing on secure data handling, privacy-preserving technologies, and robust authentication systems
                  for financial applications.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-chart-2" />
                  <h4 className="font-semibold">Quantum Computing Domain</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Exploring quantum-enhanced machine learning algorithms and future-proof cryptographic solutions for
                  next-generation financial systems.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Key Achievements & Impact</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="h-12 w-12 bg-chart-1/10 rounded-lg flex items-center justify-center mx-auto">
                  <TrendingUp className="h-6 w-6 text-chart-1" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-chart-1">17.92%</div>
                  <div className="text-sm text-muted-foreground">Performance Improvement</div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="h-12 w-12 bg-chart-2/10 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-chart-2">100%</div>
                  <div className="text-sm text-muted-foreground">Data Privacy Preserved</div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="h-12 w-12 bg-chart-3/10 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-chart-3" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-chart-3">451M</div>
                  <div className="text-sm text-muted-foreground">Target Beneficiaries</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Get in touch with the CreditBridge development team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Team Lead</p>
                <p className="text-sm text-muted-foreground">[Name] - [Email]</p>
              </div>
              <div>
                <p className="text-sm font-medium">Technical Lead</p>
                <p className="text-sm text-muted-foreground">[Name] - [Email]</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Project Repository</p>
              <p className="text-sm text-muted-foreground">[GitHub URL]</p>
            </div>
            <div>
              <p className="text-sm font-medium">Institution</p>
              <p className="text-sm text-muted-foreground">
                Digital Wizards Club, Indian Institute of Technology, Tirupati
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Dashboard */}
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
