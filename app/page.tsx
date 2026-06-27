import ProgressBar from '@/components/shared/ProgressBar'
import AudioPlayer from '@/components/shared/AudioPlayer'
import TopBar from '@/components/hub/TopBar'
import Hero from '@/components/hub/Hero'
import TheArtist from '@/components/hub/TheArtist'
import CollabStack from '@/components/hub/CollabStack'
import ShowDates from '@/components/hub/ShowDates'
import WatchSection from '@/components/hub/WatchSection'
import StreamSection from '@/components/hub/StreamSection'
import BookSection from '@/components/hub/BookSection'
import ConnectFooter from '@/components/hub/ConnectFooter'

export default function Home() {
  return (
    <>
      <ProgressBar />
      <TopBar />
      <main>
        <Hero />
        <TheArtist />
        <CollabStack />
        <ShowDates />
        <WatchSection />
        <StreamSection />
        <BookSection />
      </main>
      <ConnectFooter />
      <AudioPlayer />
    </>
  )
}
