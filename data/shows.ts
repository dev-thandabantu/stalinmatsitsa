export interface Show {
  id: string
  venue: string
  city: string
  country: string
  date: string
  ticketUrl?: string
  isSoldOut?: boolean
}

export const shows: Show[] = [
  {
    id: 'nkomazi-homecoming-2026',
    venue: 'Nkomazi Cultural Grounds',
    city: 'Nkomazi',
    country: 'ZA',
    date: '2026-07-18',
    ticketUrl: 'https://www.ticketpros.co.za',
  },
  {
    id: 'soweto-amapiano-2026',
    venue: 'Orlando Stadium',
    city: 'Soweto',
    country: 'ZA',
    date: '2026-08-01',
    isSoldOut: true,
  },
  {
    id: 'mbombela-night-2026',
    venue: 'The Venue at Fig Tree',
    city: 'Mbombela',
    country: 'ZA',
    date: '2026-08-22',
    ticketUrl: 'https://www.computicket.com',
  },
  {
    id: 'durban-july-after-2026',
    venue: 'Landmark Events Centre',
    city: 'Durban',
    country: 'ZA',
    date: '2026-09-06',
    ticketUrl: 'https://www.computicket.com',
  },
]
