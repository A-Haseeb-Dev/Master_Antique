# Master Antique RAG Server
# Set your OpenRouter API key below and uncomment:
# $env:OPENROUTER_API_KEY = "sk-or-v1-your-key-here"

# Or set it once in the current session:
#   $env:OPENROUTER_API_KEY="sk-or-v1-..."
#   .\start.ps1

if (-not $env:OPENROUTER_API_KEY) {
  Write-Host "ERROR: OPENROUTER_API_KEY is not set." -ForegroundColor Red
  Write-Host ""
  Write-Host "Option 1: Edit this script and uncomment the line below with your key"
  Write-Host "Option 2: Run these commands in the terminal:"
  Write-Host '  $env:OPENROUTER_API_KEY = ""'
  Write-Host '  node index.js'
  exit 1
}

node index.js
