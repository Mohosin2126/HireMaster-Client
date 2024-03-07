import YouTube from "react-youtube";


const CourseVideo = () => {
  const opts = {
    height: '400',
    width: '500',
    playerVars: {
      autoplay: 1,
    },
  };

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <div>
      <YouTube videoId="TBpUimlbkJfAa91G" opts={opts} onReady={_onReady} />
    </div>
  );
};

export default CourseVideo;