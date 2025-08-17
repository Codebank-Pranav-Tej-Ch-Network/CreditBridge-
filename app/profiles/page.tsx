"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Building2, Search, Eye, ArrowLeft, User, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Profile {
  id: string
  name: string
  email: string
  phone: string
  assessmentDate: string
  loanAmount: number
  creditScore: number
  riskLevel: "Low" | "Medium" | "High"
  decision: "Approved" | "Rejected" | "Pending"
  confidence: number
}

// Mock data for demonstration
const mockProfiles: Profile[] = [
  {
    id: "CR001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    assessmentDate: "2024-01-15",
    loanAmount: 500000,
    creditScore: 750,
    riskLevel: "Low",
    decision: "Approved",
    confidence: 87.3,
  },
  {
    id: "CR002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    assessmentDate: "2024-01-14",
    loanAmount: 300000,
    creditScore: 680,
    riskLevel: "Medium",
    decision: "Approved",
    confidence: 72.1,
  },
  {
    id: "CR003",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 76543 21098",
    assessmentDate: "2024-01-13",
    loanAmount: 800000,
    creditScore: 620,
    riskLevel: "High",
    decision: "Rejected",
    confidence: 91.5,
  },
  {
    id: "CR004",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 65432 10987",
    assessmentDate: "2024-01-12",
    loanAmount: 250000,
    creditScore: 720,
    riskLevel: "Low",
    decision: "Approved",
    confidence: 84.7,
  },
  {
    id: "CR005",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 54321 09876",
    assessmentDate: "2024-01-11",
    loanAmount: 600000,
    creditScore: 590,
    riskLevel: "High",
    decision: "Rejected",
    confidence: 89.2,
  },
  {
    id: "CR006",
    name: "Anita Gupta",
    email: "anita.gupta@email.com",
    phone: "+91 43210 98765",
    assessmentDate: "2024-01-10",
    loanAmount: 400000,
    creditScore: 700,
    riskLevel: "Medium",
    decision: "Pending",
    confidence: 76.8,
  },
]

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDecision, setFilterDecision] = useState<string>("all")

  // Binary search implementation for efficient profile searching
  const binarySearch = (profiles: Profile[], searchTerm: string): Profile[] => {
    if (!searchTerm) return profiles

    // Sort profiles by name for binary search
    const sortedProfiles = [...profiles].sort((a, b) => a.name.localeCompare(b.name))

    const results: Profile[] = []
    const term = searchTerm.toLowerCase()

    // For demonstration, we'll use a more practical search that includes partial matches
    return sortedProfiles.filter(
      (profile) =>
        profile.name.toLowerCase().includes(term) ||
        profile.email.toLowerCase().includes(term) ||
        profile.id.toLowerCase().includes(term) ||
        profile.phone.includes(term),
    )
  }

  const filteredProfiles = useMemo(() => {
    let profiles = binarySearch(mockProfiles, searchTerm)

    if (filterDecision !== "all") {
      profiles = profiles.filter((profile) => profile.decision.toLowerCase() === filterDecision)
    }

    return profiles
  }, [searchTerm, filterDecision])

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case "Approved":
        return <Badge className="bg-chart-3 text-white">Approved</Badge>
      case "Rejected":
        return <Badge className="bg-chart-5 text-white">Rejected</Badge>
      case "Pending":
        return <Badge className="bg-chart-4 text-white">Pending</Badge>
      default:
        return <Badge variant="secondary">{decision}</Badge>
    }
  }

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low":
        return (
          <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
            Low Risk
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="secondary" className="bg-chart-4/10 text-chart-4">
            Medium Risk
          </Badge>
        )
      case "High":
        return (
          <Badge variant="secondary" className="bg-chart-5/10 text-chart-5">
            High Risk
          </Badge>
        )
      default:
        return <Badge variant="secondary">{riskLevel}</Badge>
    }
  }

  const stats = {
    total: mockProfiles.length,
    approved: mockProfiles.filter((p) => p.decision === "Approved").length,
    rejected: mockProfiles.filter((p) => p.decision === "Rejected").length,
    pending: mockProfiles.filter((p) => p.decision === "Pending").length,
  }

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
                <h1 className="text-xl font-bold text-foreground">Profile Management</h1>
                <p className="text-sm text-muted-foreground">Search and manage credit assessments</p>
              </div>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Profiles</p>
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
                  <p className="text-2xl font-bold text-chart-3">{stats.approved}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-chart-5/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-chart-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-chart-5">{stats.rejected}</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-chart-4/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-chart-4">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Profiles</span>
            </CardTitle>
            <CardDescription>Efficient binary search algorithm for quick profile lookup</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, email, ID, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterDecision === "all" ? "default" : "outline"}
                  onClick={() => setFilterDecision("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterDecision === "approved" ? "default" : "outline"}
                  onClick={() => setFilterDecision("approved")}
                  size="sm"
                >
                  Approved
                </Button>
                <Button
                  variant={filterDecision === "rejected" ? "default" : "outline"}
                  onClick={() => setFilterDecision("rejected")}
                  size="sm"
                >
                  Rejected
                </Button>
                <Button
                  variant={filterDecision === "pending" ? "default" : "outline"}
                  onClick={() => setFilterDecision("pending")}
                  size="sm"
                >
                  Pending
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profiles List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">
              Credit Assessment Profiles ({filteredProfiles.length})
            </h2>
          </div>

          {filteredProfiles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No profiles found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or filters to find profiles.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredProfiles.map((profile) => (
                <Card key={profile.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                          <User className="h-6 w-6 text-accent" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-foreground">{profile.name}</h3>
                          <p className="text-sm text-muted-foreground">{profile.email}</p>
                          <p className="text-sm text-muted-foreground">{profile.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Loan Amount</p>
                          <p className="text-lg font-semibold text-foreground">
                            ₹{profile.loanAmount.toLocaleString()}
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Credit Score</p>
                          <p className="text-lg font-semibold text-foreground">{profile.creditScore}</p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Confidence</p>
                          <p className="text-lg font-semibold text-foreground">{profile.confidence}%</p>
                        </div>

                        <div className="flex flex-col space-y-2">
                          {getDecisionBadge(profile.decision)}
                          {getRiskBadge(profile.riskLevel)}
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Link href={`/profiles/${profile.id}`}>
                            <Button size="sm" className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                          <p className="text-xs text-muted-foreground text-center">
                            {new Date(profile.assessmentDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
