export default function Footer() {
  return (
    <footer className="bg-black font-sans px-4 sm:px-6 lg:px-10 py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Left text */}
        <p className="text-white text-sm sm:text-base lg:text-xl font-bold text-center sm:text-left">
          © {new Date().getFullYear()} Descendup Private Limited. All rights
          reserved.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
          <a
            href="/terms-of-service"
            className="text-white text-sm sm:text-base lg:text-xl font-bold hover:opacity-70 transition"
          >
            Terms of Service
          </a>

          <a
            href="/privacy-policy"
            className="text-white text-sm sm:text-base lg:text-xl font-bold hover:opacity-70 transition"
          >
            Privacy Policy
          </a>

          <a
            href="https://instagram.com/descendup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm sm:text-base lg:text-xl font-bold hover:opacity-70 transition"
          >
            Instagram
          </a>

          <a
            href="https://x.com/DescendUpAI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm sm:text-base lg:text-xl font-bold hover:opacity-70 transition"
          >
            X (Twitter)
          </a>

          <a
            href="https://www.linkedin.com/company/descendup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm sm:text-base lg:text-xl font-bold hover:opacity-70 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
