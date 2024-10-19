import React from 'react';
import styled from 'styled-components';

const VideoBackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;

  video {
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }
`;

const VideoBackground = ({ videoSrc }) => {
  return (
    <VideoBackgroundContainer>
      <video autoPlay loop muted>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </VideoBackgroundContainer>
  );
};

export default VideoBackground;