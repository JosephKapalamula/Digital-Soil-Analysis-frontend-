"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { soilService } from "@/services/api";
import {
  Beaker,
  Microscope,
  TestTube,
  Database,
  Upload,
  Download,
  Settings,
  LogOut,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Thermometer,
  Droplets,
  Leaf,
  Plus,
  Search,
  Filter,
  BarChart3,
  FileText,
  Calendar,
  Edit,
  Trash2,
  Save,
  X,
  FileUp,
  FileDown,
  RefreshCw,
  Map,
  Wheat,
  Loader,
} from "lucide-react";

// Define proper type for soil samples
interface SoilSample {
  id: string;
  location: string;
  date: string;
  status: "pending" | "processing" | "completed";
  ph: number | null;
  nitrogen: number | null;
  phosphorus: number | null;
  potassium: number | null;
  gpsLat?: number | null;
  gpsLng?: number | null;
}

export default function FieldLabDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNewSampleForm, setShowNewSampleForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedSample, setSelectedSample] = useState<SoilSample | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessState, setShowSuccessState] = useState(false);
  const [newSample, setNewSample] = useState({
    location: "",
    gpsLat: "",
    gpsLng: "",
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    recommended_crop: "",
  });
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const decodeJWT = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub.split("@")[0];
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token) {
      router.push("/lab");
      return;
    }
    const email = decodeJWT(token);
    setUserName(username || email || "User");
  }, []);
  const [samples, setSamples] = useState<SoilSample[]>([
    {
      id: "SMP-001",
      location: "Lilongwe District",
      date: "2024-03-01",
      status: "completed",
      ph: 6.8,
      nitrogen: 45,
      phosphorus: 22,
      potassium: 38,
    },
    {
      id: "SMP-002",
      location: "Blantyre District",
      date: "2024-03-02",
      status: "processing",
      ph: 7.2,
      nitrogen: null,
      phosphorus: null,
      potassium: null,
    },
    {
      id: "SMP-003",
      location: "Mzuzu District",
      date: "2024-03-03",
      status: "pending",
      ph: null,
      nitrogen: null,
      phosphorus: null,
      potassium: null,
    },
  ]);

  const recentSamples = samples;

  // CRUD Operations
  const handleEditSample = (sample: SoilSample) => {
    setSelectedSample(sample);
    setShowEditModal(true);
  };

  const handleDeleteSample = (sample: SoilSample) => {
    setSelectedSample(sample);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedSample) {
      setSamples(samples.filter((s) => s.id !== selectedSample.id));
      setShowDeleteModal(false);
      setSelectedSample(null);
    }
  };

  const handleUploadData = () => {
    setShowUploadModal(true);
  };

  const handleDownloadData = () => {
    const dataStr = JSON.stringify(samples, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "soil_samples.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleUpdateSample = (updatedSample: SoilSample) => {
    setSamples(
      samples.map((s) => (s.id === updatedSample.id ? updatedSample : s)),
    );
    setShowEditModal(false);
    setSelectedSample(null);
  };

  const handleCreateSample = async () => {
    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");

    // Validate required fields
    if (
      !newSample.location ||
      !newSample.gpsLat ||
      !newSample.gpsLng ||
      !newSample.ph ||
      !newSample.nitrogen ||
      !newSample.phosphorus ||
      !newSample.potassium ||
      !newSample.recommended_crop
    ) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    // Validate GPS coordinates
    const lat = parseFloat(newSample.gpsLat);
    const lng = parseFloat(newSample.gpsLng);
    if (isNaN(lat) || isNaN(lng)) {
      setErrorMessage("Please enter valid GPS coordinates");
      return;
    }

    // Validate pH range
    const ph = parseFloat(newSample.ph);
    if (isNaN(ph) || ph < 0 || ph > 14) {
      setErrorMessage("pH must be between 0 and 14");
      return;
    }

    // Start loading
    setIsSubmitting(true);

    try {
      const groundTruthData = {
        location: newSample.location,
        latitude: lat,
        longitude: lng,
        ph: ph,
        nitrogen: parseFloat(newSample.nitrogen),
        phosphorus: parseFloat(newSample.phosphorus),
        potassium: parseFloat(newSample.potassium),
        confidence: 1.0, // Default confidence
        recommended_crop: newSample.recommended_crop,
      };

      await soilService.collectGroundTruth(groundTruthData);

      // Show success message and success state
      setSuccessMessage("Soil data collected successfully!");
      setShowSuccessState(true);

      // Clear success message after 10 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 10000);

      // Reset form
      setNewSample({
        location: "",
        gpsLat: "",
        gpsLng: "",
        ph: "",
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        recommended_crop: "",
      });

      // Delay modal closing to let user see the success state
      setTimeout(() => {
        setShowSuccessState(false);
        setShowNewSampleForm(false);
      }, 2000); // Close modal after 2 seconds
    } catch (error: any) {
      console.error("Error collecting ground truth data:", error);
      // Show user-friendly error message
      setErrorMessage(error.message || "Failed to collect soil data");

      // Clear error message after 8 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 8000);
    } finally {
      // Stop loading
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "processing":
        return "text-yellow-600 bg-yellow-50";
      case "pending":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} />;
      case "processing":
        return <Clock size={16} />;
      case "pending":
        return <AlertCircle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="min-h-screen ml-1  bg-linear-to-br from-green-50 to-blue-50 mt-1">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {" "}
            {/* Increased height slightly for better spacing */}
            {/* Left: Logo and Title */}
            <div className="flex items-center space-x-3 w-1/4">
              {" "}
              {/* Fixed width to help centering */}
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
                <Microscope className="text-white" size={24} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 leading-none">
                  Field Lab
                </h1>
                <p className="text-xs text-gray-500">Soil Analysis Dashboard</p>
              </div>
            </div>
            {/* Center: Welcome Message */}
            <div className="flex-1 text-center">
              <div className="inline-block px-6 py-2 rounded-xl shadow-inner">
                <p className="text-lg font-medium text-gray-700">
                  Welcome,{" "}
                  <span className="text-green-600 font-bold">{userName}</span>
                </p>
              </div>
            </div>
            {/* Right: Logout Button */}
            <div className="flex justify-end w-1/4">
              {" "}
              {/* Fixed width to help centering */}
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/lab");
                }}
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Success Message */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <CheckCircle size={16} className="mr-2" />
              <span className="text-sm font-medium">{successMessage}</span>
            </div>
          </div>
        </div>
      )}

      {/* Global Error Message */}
      {errorMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <AlertCircle size={16} className="mr-2" />
              <span className="text-sm font-medium">{errorMessage}</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Samples</p>
                <p className="text-2xl font-bold text-gray-900">247</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TestTube className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">189</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-yellow-600">34</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg pH Level</p>
                <p className="text-2xl font-bold text-gray-900">6.8</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex space-x-8 px-6 pt-6">
            {["overview", "samples", "analytics", "reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Samples */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Samples
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                      <Search size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                      <Filter size={18} />
                    </button>
                    <button
                      onClick={() => setShowNewSampleForm(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Collect Soil Data</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentSamples.map((sample) => (
                    <div
                      key={sample.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-gray-900">
                            {sample.id}
                          </span>
                          <div
                            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sample.status)}`}
                          >
                            {getStatusIcon(sample.status)}
                            <span className="capitalize">{sample.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {sample.date}
                          </span>
                          <button
                            onClick={() => handleEditSample(sample)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteSample(sample)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                        <MapPin size={14} />
                        <span>{sample.location}</span>
                      </div>
                      {sample.status === "completed" && (
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <TestTube size={14} className="text-blue-500" />
                            <div>
                              <p className="text-gray-500">pH</p>
                              <p className="font-semibold">{sample.ph}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Leaf size={14} className="text-green-500" />
                            <div>
                              <p className="text-gray-500">N</p>
                              <p className="font-semibold">
                                {sample.nitrogen} mg/kg
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Droplets size={14} className="text-yellow-500" />
                            <div>
                              <p className="text-gray-500">P</p>
                              <p className="font-semibold">
                                {sample.phosphorus} mg/kg
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Thermometer size={14} className="text-red-500" />
                            <div>
                              <p className="text-gray-500">K</p>
                              <p className="font-semibold">
                                {sample.potassium} mg/kg
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleUploadData}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FileUp size={18} className="text-blue-600" />
                  <span className="text-gray-700">Upload Data</span>
                </button>
                <button
                  onClick={handleDownloadData}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FileDown size={18} className="text-green-600" />
                  <span className="text-gray-700">Download Data</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <RefreshCw size={18} className="text-purple-600" />
                  <span className="text-gray-700">Sync Database</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Database size={18} className="text-orange-600" />
                  <span className="text-gray-700">Backup Data</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                System Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Lab Equipment</span>
                  <span className="flex items-center space-x-1 text-sm text-green-600">
                    <CheckCircle size={14} />
                    <span>Online</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="flex items-center space-x-1 text-sm text-green-600">
                    <CheckCircle size={14} />
                    <span>Connected</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <span className="flex items-center space-x-1 text-sm text-green-600">
                    <CheckCircle size={14} />
                    <span>Operational</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Sample Modal */}
      {showNewSampleForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Collect Soil Data
              </h3>
              <button
                onClick={() => setShowNewSampleForm(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle size={16} className="mr-2" />
                  <span className="text-sm font-medium">{successMessage}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle size={16} className="mr-2" />
                  <span className="text-sm font-medium">{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Success State Display */}
            {showSuccessState && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-6 rounded-lg text-center">
                <CheckCircle
                  size={48}
                  className="mx-auto mb-3 text-green-600"
                />
                <h4 className="text-lg font-semibold text-green-900 mb-2">
                  Soil Data Collected Successfully!
                </h4>
                <p className="text-sm text-green-700">
                  Your soil sample data has been successfully submitted to the
                  system.
                </p>
              </div>
            )}

            {/* Form - Hide during success state */}
            {!showSuccessState && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin size={16} className="inline mr-2 text-blue-600" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={newSample.location}
                    onChange={(e) => {
                      setNewSample({ ...newSample, location: e.target.value });
                      setErrorMessage(""); // Clear error when user types
                    }}
                    placeholder="e.g., Lilongwe District, Field A"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:border-b-4 outline-none transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Map size={16} className="inline mr-2 text-blue-600" />
                      GPS Latitude
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      value={newSample.gpsLat}
                      onChange={(e) =>
                        setNewSample({ ...newSample, gpsLat: e.target.value })
                      }
                      placeholder="-13.2543"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md  focus:border-b-4 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Map size={16} className="inline mr-2 text-blue-600" />
                      GPS Longitude
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      value={newSample.gpsLng}
                      onChange={(e) =>
                        setNewSample({ ...newSample, gpsLng: e.target.value })
                      }
                      placeholder="34.3015"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:border-b-4 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <TestTube
                      size={16}
                      className="inline mr-2 text-purple-600"
                    />
                    pH Level
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={newSample.ph}
                    onChange={(e) =>
                      setNewSample({ ...newSample, ph: e.target.value })
                    }
                    placeholder="6.5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:border-b-4 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Leaf size={16} className="inline mr-2 text-green-600" />
                      Nitrogen (mg/kg)
                    </label>
                    <input
                      type="number"
                      value={newSample.nitrogen}
                      onChange={(e) =>
                        setNewSample({ ...newSample, nitrogen: e.target.value })
                      }
                      placeholder="45"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:border-b-4 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Droplets
                        size={16}
                        className="inline mr-2 text-cyan-600"
                      />
                      Phosphorus (mg/kg)
                    </label>
                    <input
                      type="number"
                      value={newSample.phosphorus}
                      onChange={(e) =>
                        setNewSample({
                          ...newSample,
                          phosphorus: e.target.value,
                        })
                      }
                      placeholder="22"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:border-b-4 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Thermometer
                        size={16}
                        className="inline mr-2 text-orange-600"
                      />
                      Potassium (mg/kg)
                    </label>
                    <input
                      type="number"
                      value={newSample.potassium}
                      onChange={(e) =>
                        setNewSample({
                          ...newSample,
                          potassium: e.target.value,
                        })
                      }
                      placeholder="38"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:border-b-4 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Wheat size={16} className="inline mr-2 text-yellow-600" />
                    Recommended Crop
                  </label>
                  <select
                    value={newSample.recommended_crop}
                    onChange={(e) =>
                      setNewSample({
                        ...newSample,
                        recommended_crop: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:border-b-4 outline-none transition-all"
                    required
                  >
                    <option value="">Select a crop</option>
                    <option value="Maize">Maize</option>
                    <option value="Tobacco">Tobacco</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Groundnuts">Groundnuts</option>
                    <option value="Beans">Beans</option>
                    <option value="Soybeans">Soybeans</option>
                    <option value="Rice">Rice</option>
                    <option value="Sorghum">Sorghum</option>
                    <option value="Millet">Millet</option>
                    <option value="Sweet Potatoes">Sweet Potatoes</option>
                    <option value="Cassava">Cassava</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setShowNewSampleForm(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateSample}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        <span>Collecting...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Add Soil Data</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Sample
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sample ID
                </label>
                <input
                  type="text"
                  value={selectedSample.id}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={selectedSample.location}
                  onChange={(e) =>
                    setSelectedSample({
                      ...selectedSample,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={selectedSample.status}
                  onChange={(e) =>
                    setSelectedSample({
                      ...selectedSample,
                      status: e.target.value as
                        | "pending"
                        | "processing"
                        | "completed",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              {selectedSample.status === "completed" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        pH Level
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={selectedSample.ph || ""}
                        onChange={(e) =>
                          setSelectedSample({
                            ...selectedSample,
                            ph: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nitrogen (mg/kg)
                      </label>
                      <input
                        type="number"
                        value={selectedSample.nitrogen || ""}
                        onChange={(e) =>
                          setSelectedSample({
                            ...selectedSample,
                            nitrogen: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phosphorus (mg/kg)
                      </label>
                      <input
                        type="number"
                        value={selectedSample.phosphorus || ""}
                        onChange={(e) =>
                          setSelectedSample({
                            ...selectedSample,
                            phosphorus: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Potassium (mg/kg)
                      </label>
                      <input
                        type="number"
                        value={selectedSample.potassium || ""}
                        onChange={(e) =>
                          setSelectedSample({
                            ...selectedSample,
                            potassium: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateSample(selectedSample)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Sample
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete sample {selectedSample.id}? This
                action cannot be undone.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Upload Data
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileUp className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-2">
                  Drag and drop your files here
                </p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Browse Files
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  Supported formats: JSON, CSV, Excel
                </p>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle upload logic here
                    setShowUploadModal(false);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
