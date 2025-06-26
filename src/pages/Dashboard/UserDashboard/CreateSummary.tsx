import { useState } from "react";
import { useGenerateSummaryMutation } from "../../../redux/features/user/userApi";

const CreateSummary = ({ onSuccess }: { onSuccess: () => void }) => {
  const [originalText, setOriginalText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generateSummary, { isLoading }] = useGenerateSummaryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await generateSummary({ originalText, prompt }).unwrap();
      setOriginalText("");
      setPrompt("");
      onSuccess(); // Refetch summaries
    } catch (err) {
      console.error("Failed to generate summary", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label className="block font-medium mb-1">Prompt (optional)</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="e.g., Summarize this text in simple language"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

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

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Summary"}
      </button>
    </form>
  );
};

export default CreateSummary;
