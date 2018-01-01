import React, { Component } from 'react';

import {
    AppRegistry,
} from 'react-native';

import {
    ViroSceneNavigator,
    ViroARSceneNavigator,
} from 'react-viro';

var createReactClass = require('create-react-class');

import ApiKey from './js/creds/ViroCreds';


var vrScenes = {
    '360 Photo Tour': require('./js/360PhotoTour/MainScene'),
    'Hello World': require('./js/HelloWorld/HelloWorldScene'),
    'Human Body': require('./js/HumanBody/MainScene'),
    'ProductShowcase': require('./js/ProductShowcase/ProductShowcase'),
    'Viro Media Player': require('./js/ViroMediaPlayer/ViroTheatre'),
    'Particle Emitters': require('./js/ParticleEmitters/ViroParticleTemplates'),
    'Physics Sample': require('./js/PhysicsSample/BasicPhysicsSample'),
}

var arScenes = {
    'AR Sample': require('./js/ARSample/HelloWorldSceneAR.js'),
}

var showARScene = false;

var ViroCodeSamplesSceneNavigator = createReactClass({
    render: function() {

        if (showARScene) {
            return (
                <ViroARSceneNavigator
                    initialScene={{
                        scene: arScenes['AR Sample'],
                    }}
                    apiKey={ApiKey} />
            );
        } else {
            return (
                <ViroSceneNavigator
                    initialScene={{
                        scene: vrScenes['Viro Media Player'],
                    }}
                    apiKey={ApiKey} />
            );

        }
    }
});

module.exports = ViroCodeSamplesSceneNavigator;
