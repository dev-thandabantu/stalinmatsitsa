export interface StreamPlatform {
  id: string
  name: string
  sub: string
  icon: string
  url: string
}

export const streams: StreamPlatform[] = [
  {
    id: 'spotify',
    name: 'Spotify',
    sub: 'Stream on Spotify',
    icon: '♫',
    url: 'https://open.spotify.com/artist/27eEvvtOTZDiAlAgwxqRRP',
  },
  {
    id: 'apple-music',
    name: 'Apple Music',
    sub: 'Stream on Apple Music',
    icon: '◆',
    url: 'https://music.apple.com/us/artist/stalin-matsitsa/1794538444',
  },
  {
    id: 'deezer',
    name: 'Deezer',
    sub: 'Stream on Deezer',
    icon: '◈',
    url: 'https://www.deezer.com/us/artist/301492631',
  },
  {
    id: 'tidal',
    name: 'TIDAL',
    sub: 'Stream on TIDAL',
    icon: '≋',
    url: 'https://tidal.com/browse/artist/54035727',
  },
]
