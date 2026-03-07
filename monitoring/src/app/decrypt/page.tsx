'use client'

import { useState } from 'react'
import { Shield, Lock, Key, ArrowRight, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-2xl border border-gray-100 bg-white shadow-sm", className)} {...props}>
      {children}
    </div>
  )
}

function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("font-semibold leading-none tracking-tight text-lg", className)} {...props}>
      {children}
    </h3>
  )
}

function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  )
}

export default function DecryptPage() {
  const [encrypted, setEncrypted] = useState('')
  const [decrypted, setDecrypted] = useState('')
  const [method, setMethod] = useState('xor')
  const [copied, setCopied] = useState(false)

  // Simple Base64 decode
  const base64Decode = (str: string): string => {
    try {
      return atob(str.trim())
    } catch {
      return 'Error: Invalid Base64'
    }
  }

  // XOR Decrypt for OSS
  const xorDecrypt = (input: string): string => {
    try {
      // Decode Base64 first
      const decoded = atob(input.trim())
      
      // XOR key for OSS
      const key = '\x07\x01}Db\x03=Hr'
      let result = ''
      
      for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        if (charCode >= 32 && charCode < 127) {
          result += String.fromCharCode(charCode)
        } else {
          break
        }
      }
      return result || 'Error: Decryption failed'
    } catch {
      return 'Error: Invalid input'
    }
  }

  const handleDecrypt = () => {
    if (!encrypted.trim()) {
      setDecrypted('')
      return
    }

    if (method === 'xor') {
      setDecrypted(xorDecrypt(encrypted))
    } else if (method === 'base64') {
      setDecrypted(base64Decode(encrypted))
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(decrypted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50/50 gradient-mesh p-6 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Password Decryptor</h1>
          <p className="text-gray-500 mt-1">Decrypt your encrypted passwords easily</p>
        </div>

        {/* Decrypt Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Decrypt Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Method Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Decryption Method</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMethod('xor')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    method === 'xor' 
                      ? "bg-gray-900 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  XOR (OSS)
                </button>
                <button
                  onClick={() => setMethod('base64')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    method === 'base64' 
                      ? "bg-gray-900 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  Base64
                </button>
              </div>
            </div>

            {/* Encrypted Input */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Encrypted Text
              </label>
              <textarea
                value={encrypted}
                onChange={(e) => setEncrypted(e.target.value)}
                placeholder="Paste encrypted text here..."
                className="w-full h-24 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 resize-none font-mono text-sm"
              />
            </div>

            {/* Decrypt Button */}
            <button
              onClick={handleDecrypt}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
            >
              <Key className="h-4 w-4" />
              Decrypt
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Result */}
            {decrypted && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Decrypted Result
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 font-mono text-sm">
                    {decrypted}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {copied ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Secure & Private</p>
                <p className="text-sm text-blue-700 mt-1">
                  All decryption happens locally in your browser. Nothing is sent to any server.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">Encrypted (OSS):</p>
              <p className="font-mono text-sm">V2AON1MxDnxTBAIzUnNUdAdjUmYDMwZnAXA=</p>
              <p className="text-xs text-gray-500 mt-2 mb-1">Decrypted:</p>
              <p className="font-mono text-sm font-medium text-emerald-600">Pass1234!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
