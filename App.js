'use strict';

import React, { Component } from 'react';

import {
    AppRegistry,
} from 'react-native';

import {
    ViroSceneNavigator,
} from 'react-viro';

var createReactClass = require('create-react-class');

import ApiKey from './js/creds/ViroCreds';


var vrScenes = {
    'Viro Media Player': require('./js/ViroMediaPlayer/ViroTheater'),
};



var showARScene = false;

var ViroCodeSamplesSceneNavigator = createReactClass({
    render() {
        return (
            <ViroSceneNavigator
                initialScene={{
                    scene: vrScenes['Viro Media Player'],
                }}
                apiKey={ApiKey} />

        )
    }

});

module.exports = ViroCodeSamplesSceneNavigator;
