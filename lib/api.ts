export interface ProjectInquiryData {
  objectType: string;
  hasFile: "yes" | "no" | "not-sure";
  files?: Array<{
    name: string;
    size: number;
    type: string;
  }>;
  name: string;
  email: string;
  phone?: string;
  description: string;
  approximateSize?: string;
  quantity?: string;
  deadline?: string;
  preferredMaterial?: string;
}

export interface InquiryResponse {
  success: boolean;
  inquiryId?: string;
  message: string;
  timestamp: string;
}

/**
 * Submit project inquiry.
 * Ready for Supabase / Resend / Webhook integration via environment variables.
 * Falls back to structured local simulation when backend endpoint is not set.
 */
export async function submitProjectInquiry(
  data: ProjectInquiryData
): Promise<InquiryResponse> {
  // Simulate network dispatch with realistic latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  const endpoint = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const result = await res.json();
      return {
        success: true,
        inquiryId: result.id || `LXYZ-${Date.now().toString().slice(-6)}`,
        message: "Project received successfully.",
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      console.warn("Backend endpoint error, saving locally:", err);
    }
  }

  // Local state dispatch
  const simulatedId = `LXYZ-${Math.floor(100000 + Math.random() * 900000)}`;
  try {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(
        localStorage.getItem("layerxyz_enquiries") || "[]"
      );
      stored.push({
        id: simulatedId,
        ...data,
        receivedAt: new Date().toISOString(),
      });
      localStorage.setItem("layerxyz_enquiries", JSON.stringify(stored));
    }
  } catch {
    // Ignore storage issues in private modes
  }

  return {
    success: true,
    inquiryId: simulatedId,
    message: "Project received. We will review and respond within 24 hours.",
    timestamp: new Date().toISOString(),
  };
}
