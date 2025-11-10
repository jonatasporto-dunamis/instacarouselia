
import {genkit, GenkitPlugin} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {config} from 'dotenv';

config({path: '.env'});

const plugins: GenkitPlugin[] = [];

if (process.env.GEMINI_API_KEY) {
  plugins.push(googleAI({apiKey: process.env.GEMINI_API_KEY}));
  console.log('Using Gemini model.');
}


export const ai = genkit({
  plugins,
  // This will be undefined if no key is provided, Genkit will throw an error.
  // This is the desired behavior to alert the user.
  // We recommend using a logger in production.
  // logSinks: [new GoogleCloudLogger()],
  // OpenTelemetry is instrumented automatically in App Hosting.
});
