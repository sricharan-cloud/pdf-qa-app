"use client";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const askQuestion = async () => {
    setLoading(true);

    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setFileUploaded(true);
    setAnswer(""); // clear old answer
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📄 PDF Q&A Assistant</h1>

        {/* Upload Section */}
        {!fileUploaded ? (
          <input
            type="file"
            style={styles.fileInput}
            onChange={handleUpload}
          />
        ) : (
          <div style={styles.uploadedBox}>
            <p>✅ File uploaded</p>
            <button
              style={styles.smallButton}
              onClick={() => setFileUploaded(false)}
            >
              Upload another file
            </button>
          </div>
        )}

        {/* Question Input */}
        <input
          type="text"
          placeholder="Ask something about your document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={styles.input}
        />

        {/* Ask Button */}
        <button onClick={askQuestion} style={styles.button}>
          {loading ? "Thinking..." : "Ask"}
        </button>

        {/* Answer */}
        {answer && (
          <div style={styles.answerBox}>
            <strong>Answer:</strong>
            <p style={{ whiteSpace: "pre-line" }}>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "#fff",
    fontFamily: "Arial",
  },
  card: {
    width: "600px",
    padding: "30px",
    borderRadius: "12px",
    background: "#1e293b",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  title: {
    textAlign: "center" as const,
  },
  fileInput: {
    padding: "10px",
    background: "#334155",
    borderRadius: "6px",
    border: "none",
    color: "#fff",
  },
  uploadedBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#334155",
    padding: "10px",
    borderRadius: "6px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold" as const,
    cursor: "pointer",
  },
  smallButton: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#64748b",
    color: "white",
    cursor: "pointer",
  },
  answerBox: {
    marginTop: "10px",
    padding: "15px",
    borderRadius: "6px",
    background: "#334155",
    maxHeight: "200px",
    overflowY: "auto" as const,
  },
};