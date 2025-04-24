export const SelectTravelsList=[
    {
        id:1,
        title:'Just Me',
        desc:'A solo travels in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travels in tandem',
        icon:'🥂',
        people:'2'
    },
    {
        id:3,
        title:'A Family',
        desc:'A family travels together',
        icon:'🏠',
        people:'3 to 5'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekers',
        icon:'👨‍👩‍👧‍👦',
        people:'5 to 10'
    }
]
export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💸'
    },
    {
        id:2,
        title:'Medium',
        desc:'Keep cost on average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:"Don't worry about cost", 
        icon:'💎'
    }
]
export const AI_PROMPT = `Generate a travel plan in JSON format with the following details:
BASIC INFO:
- Location: {location}
- Duration: {totalDays} days
- Travelers: {traveler}
- Budget: {budget}

HOTEL OPTIONS (provide 3-5 options):
- HotelName
- HotelAddress
- Rating (1-5)
- Price range
- HotelImageURL 
- Description (50-100 words)
- GeoCoordinates (latitude, longitude)

DAILY ITINERARY:
For each of the {totalDays} days, include:
- Places to visit (3-4 per day) with:
  * PlaceName
  * PlaceDetails (brief description)
  * PlaceImageURL
  * GeoCoordinates
  * TicketPricing
  * Time between which i can visit that PlaceName like in format "12:00 AM to 01:00 PM"

Structure the response as a valid JSON object with TravelPlan as the root element.`