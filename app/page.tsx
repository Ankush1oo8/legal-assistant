"use client"

import type React from "react"

import { useState } from "react"
import { Send, FileText, ExternalLink, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useTheme } from "next-themes"

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
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null)
  const { theme, setTheme } = useTheme()

  const simulatedResponse = {
    answer:
      "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased's annual income should be added as future prospects.",
    citations: [
      {
        text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
        source: "Dani_Devi_v_Pritam_Singh.pdf",
        link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz",
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
    setSelectedCitation(citation)
  }

  const openPDFInNewTab = (link: string) => {
    window.open(link, "_blank")
    setSelectedCitation(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                Lexi Legal Assistant
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Ask legal questions and get answers with citations from legal documents
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Welcome to Lexi Legal Assistant
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ask any legal question and get detailed answers with citations from legal documents.
              </p>
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">Try this example:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of
                    death, is the claimant entitled to an addition towards future prospects in computing compensation
                    under Section 166 of the Motor Vehicles Act, 1988?"
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-3xl ${message.type === "user" ? "ml-12" : "mr-12"}`}>
                <div
                  className={`rounded-lg p-4 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>

                  {message.citations && message.citations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Citations:</h4>
                      {message.citations.map((citation, index) => (
                        <Card
                          key={index}
                          className="mb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <CardContent className="p-3" onClick={() => handleCitationClick(citation)}>
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-2">
                                  "{citation.text}"
                                </p>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {citation.source}
                                  </Badge>
                                  {citation.paragraph && (
                                    <Badge variant="outline" className="text-xs">
                                      {citation.paragraph}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-3xl mr-12">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Analyzing legal documents...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a legal question..."
              className="flex-1 min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button type="submit" disabled={!input.trim() || isLoading} className="px-6">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>

      {/* Citation Modal */}
      <Dialog open={!!selectedCitation} onOpenChange={() => setSelectedCitation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Citation Details
            </DialogTitle>
          </DialogHeader>
          {selectedCitation && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Citation Text:</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic bg-gray-50 dark:bg-gray-800 p-3 rounded">
                  "{selectedCitation.text}"
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <h4 className="font-medium mb-1">Source:</h4>
                  <Badge variant="secondary">{selectedCitation.source}</Badge>
                </div>
                {selectedCitation.paragraph && (
                  <div>
                    <h4 className="font-medium mb-1">Location:</h4>
                    <Badge variant="outline">{selectedCitation.paragraph}</Badge>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={() => openPDFInNewTab(selectedCitation.link)} className="flex-1">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open PDF in New Tab
                </Button>
                <Button variant="outline" onClick={() => setSelectedCitation(null)}>
                  Close
                </Button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                The PDF will open in a new tab. Look for {selectedCitation.paragraph} in the document.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
