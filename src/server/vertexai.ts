import { env } from "~/env";
import {
  VertexAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google-cloud/vertexai";

// Instantiate models
const vertex_ai = new VertexAI({
  project: env.GCP_PROJECT_ID,
  location: env.GCP_LOCATION,
});
export default function generateContent() {
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: "gemini-pro",
    // The following parameters are optional
    // They can also be passed to individual content generation requests
    safety_settings: [
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
    generation_config: { max_output_tokens: 256 },
  });
}
