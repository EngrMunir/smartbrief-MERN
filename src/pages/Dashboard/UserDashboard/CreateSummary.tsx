import { useState } from "react";
import { useGenerateSummaryMutation, useGenerateSummaryFromFileMutation } from "../../../redux/features/user/userApi";

const CreateSummary = ({ onSuccess }: { onSuccess: () => void }) => {
  const [mode, setMode] = useState<"text" | "file">("text");
  const [originalText, setOriginalText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [generateSummary, { isLoading: loadingText }] = useGenerateSummaryMutation();
  const [generateSummaryFromFile, { isLoading: loadingFile }] = useGenerateSummaryFromFileMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "text") {
        await generateSummary({ originalText, prompt }).unwrap();
      } else if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("prompt", prompt);
        await generateSummaryFromFile(formData).unwrap();
      }
      setOriginalText("");
      setPrompt("");
      setFile(null);
      onSuccess(); // Refetch summaries
    } catch (err) {
      console.error("Failed to generate summary", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      {/* Mode Toggle */}
      <div className="flex space-x-4">
        <label className="cursor-pointer">
          <input
            type="radio"
            name="mode"
            value="text"
            checked={mode === "text"}
            onChange={() => setMode("text")}
            className="mr-2"
          />
          Write Text
        </label>
        <label className="cursor-pointer">
          <input
            type="radio"
            name="mode"
            value="file"
            checked={mode === "file"}
            onChange={() => setMode("file")}
            className="mr-2"
          />
          Upload File
        </label>
      </div>

      {/* Prompt Field (Always Visible) */}
      <div>
        <label className="block font-medium mb-1">Prompt (optional)</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="e.g., Summarize this in simple language"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      {/* Conditionally Render Based on Mode */}
      {mode === "text" ? (
        <div>
          <label className="block font-medium mb-1">Original Text</label>
          <textarea
            className="w-full border px-3 py-2 rounded min-h-[120px]"
            placeholder="Paste or write the text you want summarized..."
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            required
          />
        </div>
      ) : (
        <div>
          <label className="block font-medium mb-1">Upload File (.txt or .docx)</label>
          <input
            type="file"
            accept=".txt,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        disabled={loadingText || loadingFile}
      >
        {loadingText || loadingFile ? "Generating..." : "Generate Summary"}
      </button>
    </form>
  );
};

export default CreateSummary;
