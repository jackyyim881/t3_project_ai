// import type { NextApiRequest, NextApiResponse } from "next";
// import { env } from "~/env";
// import {
//   VertexAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google-cloud/vertexai";

// const vertex_ai = new VertexAI({
//   project: env.GCP_PROJECT_ID,
//   location: env.GCP_LOCATION,
// });
// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//   // get prompt field from the request body
//   const reqBody = req.body;
//   const { userPrompt } = reqBody;
//   const genAI = vertex_ai.preview;
//   const model = genAI.getGenerativeModel({
//     model: "gemini-pro",
//     safety_settings: [
//       {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//     ],
//     generation_config: { max_output_tokens: 256 },
//   });

//   try {
//     const result = await model.generateContent(userPrompt);
//     const response = result.response;
//     const text = response.candidates[0]?.content.parts[0]?.text;
//     return res.status(200).json({
//       text,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       text: "Unable to process the prompt. Please try again.",
//     });
//   }
// }
