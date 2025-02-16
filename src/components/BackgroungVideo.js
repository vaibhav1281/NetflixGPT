import { useSelector } from "react-redux"
import useMoviesTrailer from "../hooks/useMoviesTrailer"


const BackgroungVideo = ({movieID}) => {

  // Get the video source URL for movie trailers.
  const trailerVideo = useSelector(store => store.movies?.movieTrailer)

  useMoviesTrailer(movieID);

  return (
    <div>
      {/* <iframe
        className="w-full aspect-video bg-contain"
        src={"https://www.youtube.com/embed/"+trailerVideo?.key + "?autoplay=1&mute=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen>
      </iframe> */}
      <iframe 
        className="w-full aspect-video bg-contain" 
        src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?si=9xhAha9FmhwDZqmA?&autoplay=1&mute=1&amp;controls=0"} 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    </div>
  )
}

export default BackgroungVideo