import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration",
  description: "Register members to the community.",
};

export default async function RegisterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Registration</h1>
      <p className="text-gray-600 mb-8">Register as a new member of the community.</p>
      <p className="text-red-600 mb-8">Coming Soon.....</p>
    </div>
  );
}
