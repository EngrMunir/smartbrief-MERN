import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 px-4 md:px-8 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Summarize Smarter. Save Time.
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Upload or paste any content and get an instant summary using AI. Start free with 5 credits!
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="text-blue-600 border border-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Why SmartBrief?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">🔐 Role-Based Access</h3>
              <p className="text-gray-600">Admin, editor, reviewer, and user — each with custom permissions.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">🧠 AI Summarization</h3>
              <p className="text-gray-600">Powered by OpenAI or Gemini — precise and fast results.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">📂 Upload Files</h3>
              <p className="text-gray-600">Support for `.txt` and `.docx` files for flexible input.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">♻️ Regenerate Anytime</h3>
              <p className="text-gray-600">Edit your prompt and regenerate summaries without hassle.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">💳 Free Credit System</h3>
              <p className="text-gray-600">Start with 5 free credits. Admins can recharge users anytime.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">⚡ Caching & Speed</h3>
              <p className="text-gray-600">Redis or in-memory caching avoids duplicate requests.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">1. Create Account</h4>
              <p className="text-gray-600">Sign up and get 5 free credits instantly.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">2. Paste or Upload</h4>
              <p className="text-gray-600">Submit text or files and add your prompt if needed.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">3. Get Summary</h4>
              <p className="text-gray-600">Receive a clean, concise summary in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-12 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to summarize your content faster?</h2>
        <Link
          to="/register"
          className="bg-white text-blue-600 px-6 py-3 rounded shadow hover:bg-gray-100 transition font-semibold"
        >
          Get Started Now
        </Link>
      </section>
    </>
  );
};

export default Home;
