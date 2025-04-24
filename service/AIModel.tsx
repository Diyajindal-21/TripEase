import { GoogleGenAI } from '@google/genai';

// Initialize the API client
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

// Create travel plan generation function
export const generateTravelPlan = async (formData: any) => {
  try {
    // Extract location details with proper type safety
    const location = formData.location?.properties?.formatted || '';
    const days = formData.days;
    const traveler = formData.traveler;
    const budget = formData.budget;

    // Build the prompt
    const prompt = `Generate Travel Plan for Location: ${location}, for ${days} Days for ${traveler} with a ${budget} Budget. Give me a Hotel options list with HotelName, HotelAddress, Price, HotelImage URL, Geo Coordinates, Rating, Descriptions and suggest Itinerary with PlaceName, PlaceDetails, PlaceImage URL, geo Coordinates Ticket Pricing, Rating, Time Travel each of the location for ${days} days with each day plan with best time to visit in JSON format`;

    // Generate content directly using the models API
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { responseMimeType: 'application/json' },
    });

    // Return the result
    return response.text;
  } catch (error) {
    console.error('Error generating travel plan:', error);
    throw error;
  }
};
