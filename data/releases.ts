export interface Release {
  id: string
  title: string
  artists: string
  artistHighlights: string[]
  year: number
  spotifyUrl: string
  appleMusicUrl?: string
  youtubeUrl?: string
  isFeature: boolean
  coverUrl?: string
}

export const releases: Release[] = [
  {
    id: 'ngeke-ngimyeke',
    title: 'Ngeke Ngimyeke',
    artists: 'Mduduzi Ncube · Big Zulu · Fanatic SA · Stalin Matsitsa · Caeser · Ayanda Art',
    artistHighlights: ['Big Zulu', 'Stalin Matsitsa'],
    year: 2025,
    spotifyUrl: 'https://open.spotify.com/search/Ngeke%20Ngimyeke%20Mduduzi%20Ncube',
    youtubeUrl: 'https://www.youtube.com/watch?v=2u_IoTKR15w',
    isFeature: true,
    coverUrl: '/assets/covers/ngeke-ngimyeke.jpg',
  },
  {
    id: 'nhliziyo-ngise',
    title: 'Nhliziyo Ngise',
    artists: 'Mduduzi Ncube · Fanatic SA · Stalin Matsitsa · Caeser · Ayanda Art',
    artistHighlights: ['Stalin Matsitsa'],
    year: 2025,
    spotifyUrl: 'https://open.spotify.com/search/Nhliziyo%20Ngise%20Mduduzi%20Ncube',
    isFeature: true,
    coverUrl: '/assets/covers/nhliziyo-ngise.jpg',
  },
  {
    id: 'ding-dong-v2',
    title: 'Ding Dong V2',
    artists: 'Sdala B · Stalin Matsitsa · Thwasa · Neechor',
    artistHighlights: ['Sdala B', 'Stalin Matsitsa'],
    year: 2024,
    spotifyUrl: 'https://open.spotify.com/search/Ding%20Dong%20V2%20Sdala%20B',
    isFeature: true,
    coverUrl: '/assets/covers/ding-dong-v2.jpg',
  },
]
