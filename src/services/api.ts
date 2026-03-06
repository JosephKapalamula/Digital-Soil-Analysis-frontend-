import { SoilAnalysis, SoilAnalysisResponse } from "@/types/soil";
// process.env.NEXT_PUBLIC_API_URL||
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const soilService = {
  // Updated to use POST and send JSON body
  async analyzeSoil(
    latitude: number,
    longitude: number,
  ): Promise<SoilAnalysisResponse> {
    const response = await fetch(`${API_URL}/api/v1/analyze-soil`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const cleanMessage = errorData.detail.replace(/^\d+:\s*/, '');
      throw new Error(cleanMessage || "Failed to analyze soil");
    }

    return response.json();
  },

  async createUser(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    const response = await fetch(`${API_URL}/api/v1/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData, role: "user" }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const cleanMessage = errorData.detail.replace(/^\d+:\s*/, '');
      throw new Error(cleanMessage || "Failed to create user");
    }
    return response.json();
  },

  async login(loginData: { email: string; password: string }) {
    const response = await fetch(`${API_URL}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const cleanMessage = errorData.detail.replace(/^\d+:\s*/, '');
      throw new Error(cleanMessage || "Failed to login");
    }
    return response.json();
  },
  async collectGroundTruth(data: {
    location: string;
    latitude: number;
    longitude: number;
    ph: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    confidence: number;
    recommended_crop: string;
  }) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/v1/collect-ground-truth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const cleanMessage = errorData.detail.replace(/^\d+:\s*/, '');
      throw new Error(cleanMessage || "Failed to collect ground truth data");
    }
    return response.json();
  },

  async updateGroundTruth(data: {
    latitude: number;
    longitude: number;
    actual_ph: number;
    actual_nitrogen: number;
    actual_phosphorus: number;
    actual_potassium: number;
    actual_recommended_crop: string;
    confidence: number;
  }) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/v1/update-ground-truth`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const cleanMessage = errorData.detail.replace(/^\d+:\s*/, '');
      throw new Error(cleanMessage || "Failed to update ground truth data");
    }
    return response.json();
  },
};
