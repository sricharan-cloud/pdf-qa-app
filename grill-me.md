# Grill-Me Evidence

## Initial Idea
Build a PDF Q&A app using an LLM.

## Feedback from Grill-Me
- Sending entire document may not scale
- Need to define architecture clearly
- Should handle unsupported file types
- UI should be simple but usable

## What I changed
- Simplified ingestion to support text-based files
- Clearly defined architecture: ingestion → ETL → storage → LLM → UI
- Added upload validation and structured flow
- Improved UI for usability
