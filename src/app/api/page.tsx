// import { env } from "~/env";
// import {
//   VertexAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google-cloud/vertexai";
// import type { NextApiRequest, NextApiResponse } from "next";

// // Instantiate models
// const vertex_ai = new VertexAI({
//   project: env.GCP_PROJECT_ID,
//   location: env.GCP_LOCATION,
// });
// const generativeModel = vertex_ai.preview.getGenerativeModel({
//   model: "gemini-pro",
//   // The following parameters are optional
//   // They can also be passed to individual content generation requests
//   safety_settings: [
//     {
//       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//   ],
//   generation_config: { max_output_tokens: 256 },
// });

// export default async function streamGenerateContent(
//   res: NextApiResponse,
//   _req: NextApiRequest,
// ) {
//   const request = {
//     contents: [{ role: "user", parts: [{ text: "How are you doing today?" }] }],
//   };
//   const streamingResp = await generativeModel.generateContentStream(request);
//   let response = "";
//   for await (const item of streamingResp.stream) {
//     response += JSON.stringify(item);
//   }
//   response += JSON.stringify(await streamingResp.response);
//   res.status(200).json({ message: response });
// }
