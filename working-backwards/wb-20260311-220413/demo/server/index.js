// DEMO SERVER — All data is mock/placeholder. This is not a production backend.

const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

const venues = {
  'new-york': [
    {
      id: 'ny-1',
      name: 'The Cartwright Room',
      type: 'Speakeasy',
      neighborhood: 'Tribeca',
      description: 'A pre-Prohibition bar hidden behind a working dry cleaner. No menu — the bartenders read you and build accordingly. Tables of six maximum.',
      atmosphere: 'Intimate, candlelit, conversation-first',
      availableTonight: ['9:00 PM', '10:30 PM'],
      availableTomorrow: ['8:00 PM', '9:30 PM', '11:00 PM'],
      maxParty: 6
    },
    {
      id: 'ny-2',
      name: 'Nightshade',
      type: 'Cocktail Lounge',
      neighborhood: 'Lower East Side',
      description: 'Third floor of an unmarked warehouse. Known for a rotating seasonal menu and a bar team that has placed at every major competition for the past four years.',
      atmosphere: 'Elevated, buzzy, high ceilings',
      availableTonight: ['8:30 PM', '10:00 PM'],
      availableTomorrow: ['7:30 PM', '9:00 PM', '10:30 PM'],
      maxParty: 8
    },
    {
      id: 'ny-3',
      name: 'The Pemberton',
      type: 'Members Bar',
      neighborhood: 'Flatiron',
      description: 'Accessible only through the service entrance of a 1920s office building. Serves twelve tables. No DJ, no standing room — designed entirely for the table.',
      atmosphere: 'Quiet, wood-paneled, unhurried',
      availableTonight: ['7:00 PM', '9:30 PM'],
      availableTomorrow: ['8:00 PM', '10:00 PM'],
      maxParty: 4
    },
    {
      id: 'ny-4',
      name: 'Foxglove',
      type: 'Spirits Bar',
      neighborhood: 'West Village',
      description: 'A serious whisky and mezcal bar with no signage and a reservations-only policy. The kind of place regulars have never told their co-workers about.',
      atmosphere: 'Dark, deliberate, deeply quiet',
      availableTonight: ['8:00 PM', '10:00 PM'],
      availableTomorrow: ['7:00 PM', '9:00 PM'],
      maxParty: 5
    }
  ],
  'chicago': [
    {
      id: 'chi-1',
      name: 'Vault 21',
      type: 'Speakeasy',
      neighborhood: 'River North',
      description: 'Inside the basement of a former bank. The original vault door is still operable. Known nationally for its negroni variations and a wine program that punches well above the room size.',
      atmosphere: 'Historic, dramatic, close-set tables',
      availableTonight: ['8:00 PM', '9:30 PM'],
      availableTomorrow: ['7:30 PM', '9:00 PM', '10:30 PM'],
      maxParty: 6
    },
    {
      id: 'chi-2',
      name: 'The Aldgate',
      type: 'Cocktail Lounge',
      neighborhood: 'West Loop',
      description: 'Staffed entirely by bartenders who have worked a three-Michelin-star kitchen at some point. The food program is small and changes weekly. Reservations are the only way in.',
      atmosphere: 'Polished, food-forward, low music',
      availableTonight: ['7:30 PM', '9:00 PM'],
      availableTomorrow: ['8:00 PM', '9:30 PM'],
      maxParty: 8
    },
    {
      id: 'chi-3',
      name: 'Meridian',
      type: 'Members Bar',
      neighborhood: 'Lincoln Park',
      description: 'No name on the exterior. The back room of a bookshop that closes at 6 PM. Sixteen seats, forty-year-old spirits, and a bartender named Cal who has been there since the beginning.',
      atmosphere: 'Studious, unhurried, personal',
      availableTonight: ['9:00 PM', '10:00 PM'],
      availableTomorrow: ['8:30 PM', '9:30 PM'],
      maxParty: 4
    },
    {
      id: 'chi-4',
      name: 'Sulphur & Salt',
      type: 'Natural Wine Bar',
      neighborhood: 'Wicker Park',
      description: 'The most serious natural wine program in the Midwest in a space that seats twenty-two and takes no walk-ins. The list is updated every Wednesday.',
      atmosphere: 'Sparse, focused, producer-driven',
      availableTonight: ['7:00 PM', '8:30 PM'],
      availableTomorrow: ['7:00 PM', '8:00 PM', '9:30 PM'],
      maxParty: 6
    }
  ],
  'miami': [
    {
      id: 'mia-1',
      name: 'Calle Oscura',
      type: 'Speakeasy',
      neighborhood: 'Wynwood',
      description: 'Below a Colombian coffee bar with no evening hours. The entrance is through the roasting room. Latin spirits-focused, with a bar team recruited from Bogota and Buenos Aires.',
      atmosphere: 'Warm, rhythm-forward, tropical materials',
      availableTonight: ['9:00 PM', '11:00 PM'],
      availableTomorrow: ['8:30 PM', '10:00 PM', '11:30 PM'],
      maxParty: 8
    },
    {
      id: 'mia-2',
      name: 'The Coral Room',
      type: 'Cocktail Lounge',
      neighborhood: 'Brickell',
      description: 'Eighteenth floor of a residential tower with no commercial signage. Views of Biscayne Bay, a champagne program, and a guest list that has never been made public.',
      atmosphere: 'Open-air, elevated, warm breeze',
      availableTonight: ['8:00 PM', '10:00 PM'],
      availableTomorrow: ['7:30 PM', '9:00 PM'],
      maxParty: 6
    },
    {
      id: 'mia-3',
      name: 'Sal y Sombra',
      type: 'Mezcal Bar',
      neighborhood: 'Little Havana',
      description: 'The most credentialed mezcal and sotol program in Florida, in a courtyard accessible only by knowing the address. The list runs to ninety labels.',
      atmosphere: 'Courtyard, lantern-lit, open sky',
      availableTonight: ['9:30 PM', '11:00 PM'],
      availableTomorrow: ['8:00 PM', '9:30 PM'],
      maxParty: 5
    },
    {
      id: 'mia-4',
      name: 'The Sable House',
      type: 'Spirits Bar',
      neighborhood: 'Design District',
      description: 'Converted 1940s residential, no exterior lighting. The rum program here is the reason bartenders fly in from New York to drink on their days off.',
      atmosphere: 'Residential, tactile, Caribbean-influenced',
      availableTonight: ['8:30 PM', '10:30 PM'],
      availableTomorrow: ['8:00 PM', '9:30 PM', '11:00 PM'],
      maxParty: 6
    }
  ],
  'los-angeles': [
    {
      id: 'la-1',
      name: 'The Verdigris',
      type: 'Speakeasy',
      neighborhood: 'Silver Lake',
      description: 'Behind a working ceramics studio. No phone number, no website, known entirely by word of mouth until now. Fourteen seats and an ice program that gets written about in trade publications.',
      atmosphere: 'Artisan, minimal, ceramics throughout',
      availableTonight: ['8:00 PM', '10:00 PM'],
      availableTomorrow: ['7:30 PM', '9:30 PM'],
      maxParty: 4
    },
    {
      id: 'la-2',
      name: 'North Light',
      type: 'Cocktail Lounge',
      neighborhood: 'West Hollywood',
      description: 'Above a bookshop that closed in 2019 and never replaced its sign. Weekly lineup of guest bartenders from global programs. The reservation list moves slowly — except through here.',
      atmosphere: 'Gallery-like, changing, intellectually curious',
      availableTonight: ['9:00 PM', '10:30 PM'],
      availableTomorrow: ['8:00 PM', '9:00 PM', '10:30 PM'],
      maxParty: 8
    },
    {
      id: 'la-3',
      name: 'Carob & Copper',
      type: 'Natural Wine Bar',
      neighborhood: 'Echo Park',
      description: 'A natural wine and amaro bar with a tight list and a kitchen that runs until midnight. The kind of room that locals have been quietly protective of since it opened three years ago.',
      atmosphere: 'Neighborly, warm, deeply local',
      availableTonight: ['7:30 PM', '9:00 PM'],
      availableTomorrow: ['7:00 PM', '8:30 PM', '10:00 PM'],
      maxParty: 6
    },
    {
      id: 'la-4',
      name: 'The Below',
      type: 'Spirits Bar',
      neighborhood: 'Downtown LA',
      description: 'Basement level of a 1930s office block with a Japanese whisky program that has no peer west of Tokyo. The room holds thirty-two and has not been reviewed by any publication.',
      atmosphere: 'Underground, obsessive, reverential quiet',
      availableTonight: ['8:00 PM', '9:30 PM'],
      availableTomorrow: ['8:00 PM', '9:30 PM', '11:00 PM'],
      maxParty: 6
    }
  ],
  'austin': [
    {
      id: 'aus-1',
      name: 'The Longhorn Vault',
      type: 'Speakeasy',
      neighborhood: 'East Austin',
      description: 'Through the back of a working record store on East 6th. Texas whiskey and mezcal, a room that fits sixteen, and a bar program taken seriously by everyone outside Austin who has stumbled across it.',
      atmosphere: 'Texan, unhurried, record sleeves on every surface',
      availableTonight: ['8:30 PM', '10:00 PM'],
      availableTomorrow: ['7:30 PM', '9:00 PM', '10:30 PM'],
      maxParty: 5
    },
    {
      id: 'aus-2',
      name: 'Saltgrass',
      type: 'Cocktail Lounge',
      neighborhood: 'South Congress',
      description: 'No name at the door. A cocktail bar inside a former printing house with the original Heidelberg press still in the corner. One of the most awarded programs in the South.',
      atmosphere: 'Industrial-warm, inventive, unhurried',
      availableTonight: ['7:30 PM', '9:00 PM'],
      availableTomorrow: ['8:00 PM', '9:30 PM'],
      maxParty: 8
    },
    {
      id: 'aus-3',
      name: 'Prickly',
      type: 'Mezcal Bar',
      neighborhood: 'Travis Heights',
      description: 'A rooftop mezcal and sotol bar accessible through a private courtyard. Forty labels, nightly pours, and a view of the downtown skyline that regulars consider a closely-held local secret.',
      atmosphere: 'Rooftop, open air, agave-obsessed',
      availableTonight: ['9:00 PM', '10:30 PM'],
      availableTomorrow: ['8:30 PM', '10:00 PM'],
      maxParty: 6
    }
  ]
}

app.get('/api/cities', (req, res) => {
  const cities = [
    { id: 'new-york', name: 'New York', state: 'NY' },
    { id: 'chicago', name: 'Chicago', state: 'IL' },
    { id: 'miami', name: 'Miami', state: 'FL' },
    { id: 'los-angeles', name: 'Los Angeles', state: 'CA' },
    { id: 'austin', name: 'Austin', state: 'TX' }
  ]
  res.json(cities)
})

app.get('/api/venues', (req, res) => {
  const { city } = req.query
  if (!city || !venues[city]) {
    return res.status(404).json({ error: 'City not found' })
  }
  res.json(venues[city])
})

app.post('/api/bookings', (req, res) => {
  const { venueId, venueName, city, date, time, partySize, cardholderName } = req.body

  const bookingRef = 'HF-' + Math.random().toString(36).substring(2, 8).toUpperCase()

  res.json({
    success: true,
    booking: {
      ref: bookingRef,
      venueId,
      venueName,
      city,
      date,
      time,
      partySize,
      cardholderName,
      confirmedAt: new Date().toISOString(),
      qrData: `HIGHFLYER:${bookingRef}:${venueId}:${date}:${time}`
    }
  })
})

app.listen(PORT, () => {
  console.log(`High Flyer demo server running on http://localhost:${PORT}`)
})
