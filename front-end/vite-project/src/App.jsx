import React from "react";
import { useState } from "react";
import "./App.css";

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [title, setTitle] = useState("YouTube to MP3 Converter");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setDownloadLink("");
    try {
      const res = await fetch("http://localhost:4040/youtube/mp3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();
      console.log(data, "this is data");
      if (data.error) {
        setError(data.error);
      } else if (data.finalUrl && data.finalUrl.link) {
        setDownloadLink(data.finalUrl.link);
        setTitle(data.finalUrl.title);
        setProgress(data.finalUrl.progress);
        setUrl("");
        console.log("Download URL set:", data.finalUrl.link);
      } else {
        setError("No download URL received from server");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {!isLoading ? title : "YouTube to MP3 Converter"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-red-500 focus:border-red-500 transition-all"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !url}
          >
            {isLoading ? `Processing...` : "Convert to MP3"}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        {downloadLink && (
          <div className="mt-6 text-center">
            <a
              href={downloadLink}
              download
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-20 px-6 rounded-lg transition-colors"
            >
              Download Mp3
            </a>
            <p className="mt-2 text-sm text-gray-500">
              Click the button above to download your audio
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
