// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// export default async function (req, res) {
//     console.log("test prompt: ", generatePrompt("This is a good product. I recommend it."));
//     if (!configuration.apiKey) {
//       res.status(500).json({
//         error: {
//           message: "OpenAI API key not configured, please follow instructions in README.md",
//         }
//       });
//       return;
//     }
  
//     const reviews = req.body.reviews || '';
//     console.log("reviews in openai.js: ", reviews);
//     if (reviews.length === 0) {
//       res.status(400).json({
//         error: {
//           message: "Reviews invalid.",
//         }
//       });
//       return;
//     }
  
//     try {
//       const completion = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: generatePrompt(reviews),
//         temperature: 0.6,
//       });
//       console.log("completion.data.choices[0].text:", completion.data.choices[0].text);
//       res.status(200).json({ result: completion.data.choices[0].text });
//     } catch(error) {
//       // Consider adjusting the error handling logic for your use case
//       if (error.response) {
//         console.log("is it here");
//         console.error(error.response.status, error.response.data);
//         res.status(error.response.status).json(error.response.data);
//       } else {
//         console.error(`Error with OpenAI API request: ${error.message}`);
//         res.status(500).json({
//           error: {
//             message: 'An error occurred during your request.',
//           }
//         });
//       }
//     }
// }

// export function generatePrompt(reviewTexts) {
//     return `Summarize these reviews into 350 characters: ${reviewTexts}`;
// }

// // const response = await openai.createCompletion({
// //   model: "text-davinci-003",
// //   prompt: "Say this is a test",
// //   temperature: 0,
// //   max_tokens: 7,
// // });