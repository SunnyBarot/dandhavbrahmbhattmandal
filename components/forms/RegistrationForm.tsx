"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, RegistrationFormData } from "@/lib/validators/registration";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { household_size: 1 },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setServerError(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Network error. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h2>
        <p className="text-gray-600">
          Your registration is pending approval. We will notify you once it has been reviewed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">{serverError}</div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          id="full_name"
          label="Full Name *"
          placeholder="John Doe"
          error={errors.full_name?.message}
          {...register("full_name")}
        />
        <Input
          id="email"
          label="Email Address *"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          id="unit_number"
          label="Unit Number *"
          placeholder="e.g., 101, A-5"
          error={errors.unit_number?.message}
          {...register("unit_number")}
        />
        <Input
          id="building_name"
          label="Building Name"
          placeholder="e.g., Building A"
          error={errors.building_name?.message}
          {...register("building_name")}
        />
        <Input
          id="move_in_date"
          label="Move-in Date"
          type="date"
          error={errors.move_in_date?.message}
          {...register("move_in_date")}
        />
        <Input
          id="household_size"
          label="Household Size"
          type="number"
          min={1}
          max={20}
          error={errors.household_size?.message}
          {...register("household_size")}
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Emergency Contact (Optional)</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            id="emergency_contact_name"
            label="Contact Name"
            placeholder="Jane Doe"
            error={errors.emergency_contact_name?.message}
            {...register("emergency_contact_name")}
          />
          <Input
            id="emergency_contact_phone"
            label="Contact Phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            error={errors.emergency_contact_phone?.message}
            {...register("emergency_contact_phone")}
          />
        </div>
      </div>

      <Button type="submit" loading={isSubmitting} size="lg" className="w-full">
        Submit Registration
      </Button>
    </form>
  );
}
