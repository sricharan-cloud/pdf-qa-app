# document Question Answering App

This application allows users to upload a PDF document and ask questions about its content. The system extracts text from the document and uses an AI model to generate answers based only on the uploaded document.

---

## How It Works

1. User uploads a PDF file  
2. The system extracts text from the PDF  
3. The extracted text is stored in a JSON file (`data.json`)  
4. The user enters a question  
5. The system sends the document text + question to the OpenAI API  
6. The model generates an answer  
7. The answer is displayed in the UI  

---

## Architecture

This application follows a **prompt-first (long-context)** architecture.

The full document text is directly included in the prompt sent to the AI model instead of retrieving specific sections.

### Why this approach?

- Simple to implement  
- Works well for small PDFs  
- No need for vector database or embeddings  

### Tradeoffs

- Large documents may exceed context limits  
- Higher cost due to large prompts  
- Slower performance for large inputs  
- Not scalable for multiple or large documents  

---

## Alternative Approach (Not Implemented)

A **Retrieval-Augmented Generation (RAG)** system could be used.

This would:
- Split documents into chunks  
- Store them in a vector database  
- Retrieve only relevant parts for each question  

### Why not used?

- Adds complexity (chunking, embeddings, storage)  
- Not needed for small PDFs  

### When to use it?

- For large PDFs  
- For multiple documents  
- For scalable systems  

---

## Data Flow

Input:
- PDF file uploaded by user  

Processing:
- PDF → text extraction  
- Text stored in `data.json`  

Model Input:
- Document text + user question  

Output:
- AI-generated answer displayed to user  

---

## Evaluation

The system was evaluated using:

### Representative Cases (5)
- Questions about document content → correct answers  

### Failure Cases (2)
- Large documents → incomplete answers  
- Questions not in document → model previously guessed  

### Baseline
Without document context:
- Model gives generic answers  

With document context:
- Model gives accurate answers  

---

## Upstream Component Evaluation

Component: PDF text extraction  

Observation:
- Some formatting is lost  

Impact:
- Can reduce answer accuracy  

---

## Improvement

### Problem
The model sometimes guessed answers when the information was not in the document.

### Solution
Updated the prompt to:

- Restrict answers to document only  
- Return "Not found in document" when missing  
- Reduce randomness (temperature = 0)  

### Result
- Reduced hallucination  
- Improved reliability  

---

## Limitations

- Does not support large PDFs efficiently  
- No multi-document support  
- No retrieval system  

---

## Running the Project

```bash
npm install
npm run dev
