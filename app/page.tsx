"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, FileText, ExternalLink, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Citation {
  text: string
  source: string
  link: string
  paragraph?: string
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  citations?: Citation[]
  timestamp: Date
}

export default function LegalAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)

  // Simulated API response
  const simulatedResponse = {
    answer:
      "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased's annual income should be added as future prospects.",
    citations: [
      {
        text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
        source: "Dani_Devi_v_Pritam_Singh.pdf",
        link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vzof",
        paragraph: "Para 7",
      },
    ],
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: simulatedResponse.answer,
        citations: simulatedResponse.citations,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleCitationClick = (citation: Citation) => {
    // For SharePoint PDFs, we'll open in a new tab since iframe embedding may be restricted
    // and append a fragment identifier to simulate scrolling to paragraph 7
    const pdfUrl = `${citation.link}#page=1&search=future%20prospects`
    window.open(pdfUrl, "_blank", "width=1200,height=800,scrollbars=yes,resizable=yes")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Lexi Legal Assistant</h1>
          <p className="text-sm text-gray-600 mt-1">Ask legal questions and get answers with citations</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Lexi Legal Assistant</h3>
              <p className="text-gray-600 mb-6">
                Ask any legal question and get detailed answers with citations from legal documents.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-2xl mx-auto">
                <p className="text-sm font-medium text-blue-900 mb-2">Try this example:</p>
                <p className="text-sm text-blue-800">
                  "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of
                  death, is the claimant entitled to an addition towards future prospects in computing compensation
                  under Section 166 of the Motor Vehicles Act, 1988? If so, how much?"
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-3xl ${message.type === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"} rounded-lg p-4 shadow-sm`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {message.type === "user" ? "U" : "L"}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${message.type === "user" ? "text-white" : "text-gray-900"} leading-relaxed`}
                    >
                      {message.content}
                    </p>

                    {message.citations && message.citations.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <h4 className="text-sm font-medium text-gray-700">Citations:</h4>
                        {message.citations.map((citation, index) => (
                          <Card key={index} className="bg-gray-50 border-l-4 border-l-blue-500">
                            <CardContent className="p-3">
                              <p className="text-sm text-gray-700 mb-2 italic">"{citation.text}"</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-xs text-gray-600">
                                  <FileText className="h-3 w-3" />
                                  <span>{citation.source}</span>
                                  {citation.paragraph && (
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                      {citation.paragraph}
                                    </span>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCitationClick(citation)}
                                  className="text-xs"
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  View Source
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    <p className={`text-xs mt-2 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-3xl bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-medium">
                    L
                  </div>
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                    <span className="text-sm text-gray-500">Analyzing your question...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <div className="flex-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a legal question..."
                className="min-h-[60px] resize-none"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
            </div>
            <Button type="submit" disabled={!input.trim() || isLoading} className="px-6">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift + Enter for new line</p>
        </div>
      </div>

      {/* PDF Viewer Dialog */}
      <Dialog open={!!selectedPdf} onOpenChange={() => setSelectedPdf(null)}>
        <DialogContent className="max-w-6xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Dani Devi v. Pritam Singh - Legal Document</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden bg-gray-100 rounded-lg">
            <div className="p-4 bg-blue-50 border-b">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This document will open in a new tab. Look for Paragraph 7 which contains the
                cited text about future prospects for self-employed individuals aged 54-55 years.
              </p>
            </div>
            <div className="p-8 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Opening Legal Document</h3>
              <p className="text-gray-600 mb-4">
                The PDF document is opening in a new tab for better viewing experience.
              </p>
              <Button onClick={() => window.open(selectedPdf!, "_blank")} className="mb-2">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Document in New Tab
              </Button>
              <div className="text-xs text-gray-500 mt-4 max-w-md mx-auto">
                <p>
                  <strong>Citation Location:</strong> Paragraph 7
                </p>
                <p>
                  <strong>Key Text:</strong> "10% of annual income should have been awarded on account of future
                  prospects"
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
