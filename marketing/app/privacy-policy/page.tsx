import PrivacyContent from "@/components/legal/PrivacyContent";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: 10 March 2026</p>

      <PrivacyContent />
    </div>
  );
}
