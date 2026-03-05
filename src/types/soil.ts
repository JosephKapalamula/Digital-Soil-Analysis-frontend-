export interface SoilNutrients {
  Nitrogen: number;
  Phosphorus: number;
  Potassium: number;
}

export type DataSource = "ground_truth" | "prediction_cache" | "new_prediction";

export interface SoilAnalysisResponse {
  status: string;
  location: { lat: number; lon: number };
  data: SoilAnalysis;
}

export interface SoilAnalysis {
  confidence: number;
  crop: string;
  nutrients: SoilNutrients;
  pH: number;
  raw_features?: Record<string, number>;
  elevation: number;
  slope: number;
  source: DataSource;
}
