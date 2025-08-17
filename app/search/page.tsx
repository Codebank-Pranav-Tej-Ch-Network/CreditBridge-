"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Building2,
  ArrowLeft,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  User,
  Eye,
  CreditCard,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface SearchProfile {
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
  bankingScore: number
  socialMediaScore: number
  documentScore: number
}

// Extended mock data for advanced search
const searchProfiles: SearchProfile[] = [
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
    bankingScore: 85,
    socialMediaScore: 75,
    documentScore: 92,
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
    bankingScore: 78,
    socialMediaScore: 82,
    documentScore: 88,
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
    bankingScore: 65,
    socialMediaScore: 58,
    documentScore: 75,
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
    bankingScore: 88,
    socialMediaScore: 79,
    documentScore: 91,
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
    bankingScore: 62,
    socialMediaScore: 45,
    documentScore: 68,
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
    bankingScore: 82,
    socialMediaScore: 71,
    documentScore: 85,
  },
  // Additional profiles for better search demonstration
  {
    id: "CR007",
    name: "Arjun Mehta",
    email: "arjun.mehta@email.com",
    phone: "+91 32109 87654",
    assessmentDate: "2024-01-09",
    loanAmount: 750000,
    creditScore: 640,
    riskLevel: "Medium",
    decision: "Rejected",
    confidence: 83.4,
    bankingScore: 70,
    socialMediaScore: 65,
    documentScore: 78,
  },
  {
    id: "CR008",
    name: "Kavya Nair",
    email: "kavya.nair@email.com",
    phone: "+91 21098 76543",
    assessmentDate: "2024-01-08",
    loanAmount: 350000,
    creditScore: 780,
    riskLevel: "Low",
    decision: "Approved",
    confidence: 92.1,
    bankingScore: 94,
    socialMediaScore: 87,
    documentScore: 96,
  },
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("assessmentDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterDecision, setFilterDecision] = useState("all")
  const [filterRisk, setFilterRisk] = useState("all")
  const [minLoanAmount, setMinLoanAmount] = useState("")
  const [maxLoanAmount, setMaxLoanAmount] = useState("")
  const [minCreditScore, setMinCreditScore] = useState("")
  const [maxCreditScore, setMaxCreditScore] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Advanced binary search implementation
  const binarySearchProfiles = (profiles: SearchProfile[], searchTerm: string): SearchProfile[] => {
    if (!searchTerm) return profiles

    const term = searchTerm.toLowerCase()

    // Create multiple sorted arrays for different search fields
    const sortedByName = [...profiles].sort((a, b) => a.name.localeCompare(b.name))
    const sortedByEmail = [...profiles].sort((a, b) => a.email.localeCompare(b.email))
    const sortedById = [...profiles].sort((a, b) => a.id.localeCompare(b.id))

    const results = new Set<SearchProfile>()

    // Binary search function
    const binarySearch = (arr: SearchProfile[], getValue: (profile: SearchProfile) => string) => {
      let left = 0
      let right = arr.length - 1

      // Find the leftmost match
      while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        const value = getValue(arr[mid]).toLowerCase()

        if (value.includes(term)) {
          // Found a match, add it and search for more matches around it
          results.add(arr[mid])

          // Search left for more matches
          let leftIdx = mid - 1
          while (leftIdx >= 0 && getValue(arr[leftIdx]).toLowerCase().includes(term)) {
            results.add(arr[leftIdx])
            leftIdx--
          }

          // Search right for more matches
          let rightIdx = mid + 1
          while (rightIdx < arr.length && getValue(arr[rightIdx]).toLowerCase().includes(term)) {
            results.add(arr[rightIdx])
            rightIdx++
          }
          break
        } else if (value < term) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }
    }

    // Search in different fields
    binarySearch(sortedByName, (p) => p.name)
    binarySearch(sortedByEmail, (p) => p.email)
    binarySearch(sortedById, (p) => p.id)

    // Also search phone numbers (simple includes for phone)
    profiles.forEach((profile) => {
      if (profile.phone.includes(searchTerm)) {
        results.add(profile)
      }
    })

    return Array.from(results)
  }

  const filteredAndSortedProfiles = useMemo(() => {
    let profiles = binarySearchProfiles(searchProfiles, searchTerm)

    // Apply filters
    if (filterDecision !== "all") {
      profiles = profiles.filter((p) => p.decision.toLowerCase() === filterDecision)
    }

    if (filterRisk !== "all") {
      profiles = profiles.filter((p) => p.riskLevel.toLowerCase() === filterRisk)
    }

    if (minLoanAmount) {
      profiles = profiles.filter((p) => p.loanAmount >= Number.parseInt(minLoanAmount))
    }

    if (maxLoanAmount) {
      profiles = profiles.filter((p) => p.loanAmount <= Number.parseInt(maxLoanAmount))
    }

    if (minCreditScore) {
      profiles = profiles.filter((p) => p.creditScore >= Number.parseInt(minCreditScore))
    }

    if (maxCreditScore) {
      profiles = profiles.filter((p) => p.creditScore <= Number.parseInt(maxCreditScore))
    }

    // Apply sorting
    profiles.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "name":
          aValue = a.name
          bValue = b.name
          break
        case "assessmentDate":
          aValue = new Date(a.assessmentDate)
          bValue = new Date(b.assessmentDate)
          break
        case "loanAmount":
          aValue = a.loanAmount
          bValue = b.loanAmount
          break
        case "creditScore":
          aValue = a.creditScore
          bValue = b.creditScore
          break
        case "confidence":
          aValue = a.confidence
          bValue = b.confidence
          break
        default:
          return 0
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return profiles
  }, [
    searchTerm,
    sortBy,
    sortOrder,
    filterDecision,
    filterRisk,
    minLoanAmount,
    maxLoanAmount,
    minCreditScore,
    maxCreditScore,
  ])

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
                <h1 className="text-xl font-bold text-foreground">Advanced Search</h1>
                <p className="text-sm text-muted-foreground">Binary search algorithm for efficient profile lookup</p>
              </div>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search & Filter Profiles</span>
            </CardTitle>
            <CardDescription>
              Advanced search with binary search algorithm and comprehensive filtering options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Search */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, email, ID, or phone number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="bg-transparent"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Select value={filterDecision} onValueChange={setFilterDecision}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Decision" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Decisions</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assessmentDate">Assessment Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="loanAmount">Loan Amount</SelectItem>
                  <SelectItem value="creditScore">Credit Score</SelectItem>
                  <SelectItem value="confidence">Confidence</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="bg-transparent"
              >
                {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="border-t pt-4 space-y-4">
                <h4 className="font-semibold text-foreground">Advanced Filters</h4>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Loan Amount Range</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Min amount"
                        value={minLoanAmount}
                        onChange={(e) => setMinLoanAmount(e.target.value)}
                        type="number"
                      />
                      <Input
                        placeholder="Max amount"
                        value={maxLoanAmount}
                        onChange={(e) => setMaxLoanAmount(e.target.value)}
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Credit Score Range</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Min score"
                        value={minCreditScore}
                        onChange={(e) => setMinCreditScore(e.target.value)}
                        type="number"
                      />
                      <Input
                        placeholder="Max score"
                        value={maxCreditScore}
                        onChange={(e) => setMaxCreditScore(e.target.value)}
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMinLoanAmount("")
                      setMaxLoanAmount("")
                      setMinCreditScore("")
                      setMaxCreditScore("")
                      setFilterDecision("all")
                      setFilterRisk("all")
                      setSearchTerm("")
                    }}
                    className="bg-transparent"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Search Results ({filteredAndSortedProfiles.length})</h2>
            {searchTerm && (
              <Badge variant="secondary" className="text-sm">
                Binary search algorithm used for "{searchTerm}"
              </Badge>
            )}
          </div>

          {filteredAndSortedProfiles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No profiles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find matching profiles.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredAndSortedProfiles.map((profile) => (
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
                          <p className="text-xs text-muted-foreground">ID: {profile.id}</p>
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

                    {/* Additional scores row */}
                    <div className="mt-4 pt-4 border-t flex justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <CreditCard className="h-4 w-4 text-chart-1" />
                        <span className="text-muted-foreground">Banking:</span>
                        <span className="font-semibold">{profile.bankingScore}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-chart-2" />
                        <span className="text-muted-foreground">Social:</span>
                        <span className="font-semibold">{profile.socialMediaScore}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4 text-chart-3" />
                        <span className="text-muted-foreground">Documents:</span>
                        <span className="font-semibold">{profile.documentScore}</span>
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
