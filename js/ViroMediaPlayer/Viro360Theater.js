'use strict';

import React, { Component } from 'react';

import {
    ViroScene,
    Viro360Video,
    ViroButton,
    ViroImage,
    ViroNode,
    ViroAnimations,
} from 'react-viro';

var createReactClass = require('create-react-class');

var buttonSize = 0.25;
var VIDEO_REF = 'videoref';

var videos = [
    require('./res/gp.mp4'),
    {uri:'https://s3-us-west-2.amazonaws.com/viro/MediaDemo360_1.mp4'}

];

var Viro360Theater = createReactClass({
    getInitialState() {
        return {
            videoControlsAnimation: "fadeIn",
            videoPaused: false,
            loopVideo: true,
            videoIndex: 0,
            runAnimation: false,
        }
    },

    render() {
        return (
            <ViroScene
                onClick={this._onVideoTapped}
                recticleEnabled={this.state.videoControlsAnimation=='fadeIn'}
            >
                <Viro360Video
                    ref={VIDEO_REF}
                    source={videos[this.state.videoIndex]}
                    volume={1.0}
                    loop={this.state.loopVideo}
                    paused={this.state.videoPaused}
                />

                {this._renderVideoControl()}


            </ViroScene>
        );
    },

    _onVideoTapped() {
        var videoControlsAnimationState = this.state.videoControlsAnimation;
        if (videoControlsAnimationState=="fadeIn") {
            videoControlsAnimationState="fadeOut";
        } else {
            videoControlsAnimationState="fadeIn";
        }

        this.setState({
            videoControlsAnimation: videoControlsAnimationState,
            runAnimation: true,
        });
    },

    _renderVideoControl() {
        return(
            <ViroNode
                position={[0,-0.8,0]}
                opacity={1.0}
                animation={{name : this.state.videoControlsAnimation, run : this.state.runAnimation, loop : false}} >

                <ViroImage
                    scale={[1.4, 1.2, 1]}
                    position={[0, -0.27, -2.1]}
                    source={require('./res/player_controls_container.png')}
                />

                <ViroButton
                    position={[-buttonSize-0.1, 0, -2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require('./res/previous.png')}
                    hoverSource={require('./res/previous_hover.png')}
                    clickSource={require('./res/previous_hover.png')}
                    onClick={this._playPreviousVideo}

                />

                {this._renderPlayControl()}

                <ViroButton
                    position={[buttonSize+0.1, 0, -2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require('./res/skip.png')}
                    hoverSource={require('./res/skip_hover.png')}
                    clickSource={require('./res/skip_hover.png')}
                    onClick={this._playNextVideo}

                />

                <ViroButton
                    position={[-0.3, -0.4, -2]}
                    scale={[1, 1, 1]}
                    width={0.5}
                    height={0.5}
                    source={require('./res/icon_2D.png')}
                    hoverSource={require('./res/icon_2D_hover.png')}
                    clickSource={require('./res/icon_2D_hover.png')}
                    onClick={this._launchTheaterScene}

                />

                <ViroButton
                    position={[0.3, -0.4, -2]}
                    scale={[1, 1, 1]}
                    width={0.5}
                    height={0.5}
                    source={require('./res/icon_360_hover.png')}
                    hoverSource={require('./res/icon_360_hover.png')}
                    clickSource={require('./res/icon_360_hover.png')}
                />

            </ViroNode>
        );
    },

    _renderPlayControl() {
        if (this.state.videoPaused) {
            return (
                <ViroButton
                    position={[0, 0, -2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require('./res/play.png')}
                    hoverSource={require('./res/play_hover.png')}
                    clickSource={require('./res/play_hover.png')}
                    transoformBehaviors={['billboard']}
                    onClick={this._togglePauseVideo}

                />

            );
        } else {
            return (
                <ViroButton
                    position={[0, 0, -2]}
                    scale={[1, 1, 1]}
                    width={buttonSize}
                    height={buttonSize}
                    source={require('./res/pause.png')}
                    hoverSource={require('./res/pause_hover.png')}
                    clickSource={require('./res/pause_hover.png')}
                    transformBehaviors={['billboard']}
                    onClick={this._togglePauseVideo}
                />
            );
        }
    },

    _launchTheaterScene() {
        this.props.sceneNavigator.jump("ViroTheater", {scene:require('./ViroTheater')});
    },

    _togglePauseVideo() {
        this.setState({
            videoPaused: !this.state.videoPaused,
        })
    },

    _playPreviousVideo() {
        var currentVideo = this.state.videoIndex;
        if (currentVideo - 1 > -1){
            this.setState({
                videoIndex: (currentVideo - 1),
                videoPaused: false
            });
        }
    },

    _playNextVideo() {
        var currentVideo = this.state.videoIndex;
        if (currentVideo + 1 < videos.length) {
            this.setState({
                videoIndex: (currentVideo + 1),
                videoPaused: false
            });
        }
    },

});

ViroAnimations.registerAnimations({
    fadeOut:{properties:{opacity: 0.0}, duration: 500},
    fadeIn:{properties:{opacity: 1.0}, duration: 500},
});

module.exports = Viro360Theater;
