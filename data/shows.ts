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
  // Add show dates here when Stalin has confirmed bookings.
  // Example:
  // {
  //   id: 'mkhondo-2026',
  //   venue: 'Mkhondo Arts Festival',
  //   city: 'Mpumalanga',
  //   country: 'ZA',
  //   date: '2026-08-14',
  //   ticketUrl: 'https://ticketpros.co.za/...',
  // },
]
