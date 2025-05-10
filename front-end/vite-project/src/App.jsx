import { use, useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4040/youtube/mp3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      console.log(res);
      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.error}`);
      } else {
        const data = await res.json();
        setError(data.errror);
        console.log("this is rul :", data.finalUrl.downloadUrl);
      }
    } catch (error) {
      console.error("Error:", error);
      // alert(`Failed to process request: ${error.message}`);
    }
  };

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL" // Improved placeholder
            style={{
              width: "100%",
              maxWidth: "28rem", // ~448px, similar to max-w-md
              padding: "0.75rem",
              marginBottom: "10px",
              border: "1px solid #d1d5db", // Gray-300
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // Shadow-sm
              fontSize: "1rem",
              color: "#111827", // Gray-900
              outline: "none",
              transition: "all 0.2s ease",
              ":focus": {
                borderColor: "#ef4444", // Red-500 (YouTube-themed)
                boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.5)", // Red-500 ring
              },
              "::placeholder": {
                color: "#9ca3af", // Gray-400
              },
            }}
          />
          <button type="submit">Send</button>
        </form>
        <h3
          style={{
            color: "#ef4444", // Red-600 (YouTube-themed)
            fontSize: "1rem",
            fontWeight: "500",
            marginTop: "0.5rem",
            textAlign: "center",
            display: error ? "block" : "none", // Show only if error exists
          }}
        >
          {error && "Error..."}
        </h3>
      </div>
    </>
  );
}

export default App;
