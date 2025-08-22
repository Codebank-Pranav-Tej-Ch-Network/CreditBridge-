"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"

interface FormData {
  // Personal Information
  fullName: string
  dateOfBirth: string
  panNumber: string
  aadharNumber: string
  phoneNumber: string
  email: string
  address: string

  // Banking Data
  bankName: string
  accountType: string
  monthlyIncome: string
  averageBalance: string
  transactionFrequency: string

  // Credit Bureau
  cibilScore: string
  creditHistory: string
  existingLoans: string
  loanAmount: string

  // Device/SIM Analytics
  deviceType: string
  simAge: string
  networkProvider: string
  appUsagePattern: string

  // Geolocation
  homeLocation: string
  workLocation: string
  travelPattern: string
  locationStability: string

  // ADD THESE NEW FIELDS
  socialMediaScreentime: string; // e.g., hours per day
  ecommerceScreenTime: string;   // e.g., hours per day

  // Social Media
  linkedinVerified: boolean
  facebookProfile: boolean
  instagramProfile: boolean
  socialMediaScore: string

  // Document Verification
  panAadharMatch: boolean
  dobMatch: boolean
  addressMatch: boolean
  documentScore: string
}

export default function NewAssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dateOfBirth: "",
    panNumber: "",
    aadharNumber: "",
    phoneNumber: "",
    email: "",
    address: "",
    bankName: "",
    accountType: "",
    monthlyIncome: "",
    averageBalance: "",
    transactionFrequency: "",
    cibilScore: "",
    creditHistory: "",
    existingLoans: "",
    loanAmount: "",
    deviceType: "",
    simAge: "",
    networkProvider: "",
    appUsagePattern: "",
    homeLocation: "",
    workLocation: "",
    travelPattern: "",
    locationStability: "",
    linkedinVerified: false,
    facebookProfile: false,
    instagramProfile: false,
    socialMediaScore: "",
    panAadharMatch: false,
    dobMatch: false,
    addressMatch: false,
    documentScore: "",
    socialMediaScreentime: "",
    ecommerceScreenTime: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalSteps = 6 // Your form has 6 steps
  const progress = (currentStep/ totalSteps) * 100

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    // A simple function to convert a categorical input to a numerical score
    const getMovementScore = (pattern: string) => {
        switch (pattern) {
            case "frequent": return 0.9;
            case "occasional": return 0.6;
            case "local": return 0.3;
            case "stationary": return 0.1;
            default: return 0.3;
        }
      };

    // 1. Map frontend form data to the model's required input structure (check again!)
      // --- FINAL DYNAMIC modelInput OBJECT ---
    const modelInput = {
      bank_transaction_average: parseFloat(formData.averageBalance) || 0,
      social_media_screentime: parseFloat(formData.socialMediaScreentime) || 0,
      ecommerce_screen_time: parseFloat(formData.ecommerceScreenTime) || 0,
      cibil_score: parseInt(formData.cibilScore, 10) || 0,
      geographical_movement: getMovementScore(formData.travelPattern),
      social_media_reach: parseInt(formData.socialMediaScore, 10) * 100,
    };

    try {
      // 2. Call the backend API
      const response = await fetch("/.netlify/functions/predict", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modelInput),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction from the model.");
      }

      const result = await response.json();

      // 3. Store both form data and API result for the results page
      const resultData = {
          formData: formData,
          apiResponse: result
      };
      localStorage.setItem('assessmentResult', JSON.stringify(resultData));

      // 4. Navigate to the processing page
      router.push("/assessment/processing");

    } catch (err: any) {
      setError(err.message);
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Paste your entire 'renderStepContent' function and the main return JSX here.
   const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription>Basic personal and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number *</Label>
                  <Input
                    id="panNumber"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange("panNumber", e.target.value)}
                    placeholder="ABCDE1234F"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadharNumber">Aadhar Number *</Label>
                  <Input
                    id="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                    placeholder="1234 5678 9012"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter complete address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Banking & Financial Data</span>
              </CardTitle>
              <CardDescription>Account Aggregator banking information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Primary Bank *</Label>
                  <Select onValueChange={(value) => handleInputChange("bankName", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                      <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                      <SelectItem value="pnb">Punjab National Bank</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("accountType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="current">Current Account</SelectItem>
                      <SelectItem value="salary">Salary Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (₹) *</Label>
                  <Input
                    id="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="averageBalance">Average Balance (₹) *</Label>
                  <Input
                    id="averageBalance"
                    value={formData.averageBalance}
                    onChange={(e) => handleInputChange("averageBalance", e.target.value)}
                    placeholder="25000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionFrequency">Transaction Frequency</Label>
                <Select onValueChange={(value) => handleInputChange("transactionFrequency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High &gt;50 per month</SelectItem>
                    <SelectItem value="medium">Medium 20-50 per month</SelectItem>
                    <SelectItem value="low">Low &lt;20 per month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Credit Bureau Information</CardTitle>
              <CardDescription>CIBIL and credit history data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cibilScore">CIBIL Score</Label>
                  <Input
                    id="cibilScore"
                    value={formData.cibilScore}
                    onChange={(e) => handleInputChange("cibilScore", e.target.value)}
                    placeholder="750"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditHistory">Credit History (Years)</Label>
                  <Input
                    id="creditHistory"
                    value={formData.creditHistory}
                    onChange={(e) => handleInputChange("creditHistory", e.target.value)}
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="existingLoans">Existing Loans</Label>
                  <Select onValueChange={(value) => handleInputChange("existingLoans", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select existing loans" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No existing loans</SelectItem>
                      <SelectItem value="home">Home Loan</SelectItem>
                      <SelectItem value="personal">Personal Loan</SelectItem>
                      <SelectItem value="auto">Auto Loan</SelectItem>
                      <SelectItem value="multiple">Multiple Loans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Requested Loan Amount (₹) *</Label>
                  <Input
                    id="loanAmount"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                    placeholder="500000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Device & SIM Analytics</CardTitle>
              <CardDescription>Mobile device and SIM intelligence data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deviceType">Device Type</Label>
                  <Select onValueChange={(value) => handleInputChange("deviceType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select device type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphone">Smartphone</SelectItem>
                      <SelectItem value="feature">Feature Phone</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="simAge">SIM Age (Months)</Label>
                  <Input
                    id="simAge"
                    value={formData.simAge}
                    onChange={(e) => handleInputChange("simAge", e.target.value)}
                    placeholder="24"
                  />
                </div> 
              </div>
              <div className="space-y-2">
              <Label htmlFor="socialMediaScreentime">Avg. Social Media Screentime (hours/day)</Label>
              <Input
               id="socialMediaScreentime"
               value={formData.socialMediaScreentime}
               onChange={(e) => handleInputChange("socialMediaScreentime", e.target.value)}
               placeholder="e.g., 4.5"
               type="number"
                   />
                   </div>

              <div className="space-y-2">
              <Label htmlFor="ecommerceScreenTime">Avg. E-commerce Screentime (hours/day)</Label>
              <Input
               id="ecommerceScreenTime"
               value={formData.ecommerceScreenTime}
               onChange={(e) => handleInputChange("ecommerceScreenTime", e.target.value)}
               placeholder="e.g., 2.0"
               type="number"
               />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="networkProvider">Network Provider</Label>
                  <Select onValueChange={(value) => handleInputChange("networkProvider", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jio">Jio</SelectItem>
                      <SelectItem value="airtel">Airtel</SelectItem>
                      <SelectItem value="vi">Vi (Vodafone Idea)</SelectItem>
                      <SelectItem value="bsnl">BSNL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appUsagePattern">App Usage Pattern</Label>
                  <Select onValueChange={(value) => handleInputChange("appUsagePattern", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select usage pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="heavy">Heavy User &gt;6 hours/day</SelectItem>
                      <SelectItem value="moderate">Moderate User 3-6 hours/day</SelectItem>
                      <SelectItem value="light">Light User &lt;3 hours/day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Geolocation Data</CardTitle>
              <CardDescription>Location and movement patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="homeLocation">Home Location</Label>
                  <Input
                    id="homeLocation"
                    value={formData.homeLocation}
                    onChange={(e) => handleInputChange("homeLocation", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workLocation">Work Location</Label>
                  <Input
                    id="workLocation"
                    value={formData.workLocation}
                    onChange={(e) => handleInputChange("workLocation", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="travelPattern">Travel Pattern</Label>
                  <Select onValueChange={(value) => handleInputChange("travelPattern", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select travel pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frequent">Frequent Traveler</SelectItem>
                      <SelectItem value="occasional">Occasional Traveler</SelectItem>
                      <SelectItem value="local">Local/Regional</SelectItem>
                      <SelectItem value="stationary">Mostly Stationary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locationStability">Location Stability</Label>
                  <Select onValueChange={(value) => handleInputChange("locationStability", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High (Same location &gt;2 years)</SelectItem>
                      <SelectItem value="medium">Medium 1-2 years</SelectItem>
                      <SelectItem value="low">Low &lt;1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Social Media & Document Verification</CardTitle>
              <CardDescription>Social profiles and document validation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Social Media Profiles</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="linkedinVerified"
                        checked={formData.linkedinVerified}
                        onChange={(e) => handleInputChange("linkedinVerified", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="linkedinVerified">LinkedIn Profile Verified</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="facebookProfile"
                        checked={formData.facebookProfile}
                        onChange={(e) => handleInputChange("facebookProfile", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="facebookProfile">Facebook Profile Available</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="instagramProfile"
                        checked={formData.instagramProfile}
                        onChange={(e) => handleInputChange("instagramProfile", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="instagramProfile">Instagram Profile Available</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialMediaScore">Social Media Score (0-100)</Label>
                  <Input
                    id="socialMediaScore"
                    value={formData.socialMediaScore}
                    onChange={(e) => handleInputChange("socialMediaScore", e.target.value)}
                    placeholder="75"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Document Verification</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="panAadharMatch"
                        checked={formData.panAadharMatch}
                        onChange={(e) => handleInputChange("panAadharMatch", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="panAadharMatch">PAN & Aadhar Name Match</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="dobMatch"
                        checked={formData.dobMatch}
                        onChange={(e) => handleInputChange("dobMatch", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="dobMatch">Date of Birth Match</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="addressMatch"
                        checked={formData.addressMatch}
                        onChange={(e) => handleInputChange("addressMatch", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="addressMatch">Address Verification Match</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentScore">Document Verification Score (0-100)</Label>
                  <Input
                    id="documentScore"
                    value={formData.documentScore}
                    onChange={(e) => handleInputChange("documentScore", e.target.value)}
                    placeholder="85"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }
  return (
    // Paste your full JSX from your original `assessment/new/page.tsx` file here
    // The logic above will now power it correctly.
<div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">New Credit Assessment</h1>
        <p className="text-muted-foreground">
          Complete the multi-step assessment form to evaluate creditworthiness using alternative data sources.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mb-8">
        {["Personal Info", "Banking Data", "Credit Bureau", "Device/SIM", "Geolocation", "Social/Docs"].map(
          (step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${index + 1 <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${index + 1 <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
              >
                {index + 1}
              </div>
              <span className="text-xs text-center">{step}</span>
            </div>
          ),
        )}
      </div>

      {/* Form Content */}
      <div className="mb-8">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-6 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
        >
          Previous
        </button>

        <div className="space-x-4">
          <button
            onClick={() => console.log("Draft saved")}
            className="px-6 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md"
          >
            Save Draft
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Submit Assessment'}
            </button>
          )}
        </div>
      </div>
      {error && <p className="text-red-500 mt-4 text-center w-full">{error}</p>}
    </div>
  )
}

  
  
