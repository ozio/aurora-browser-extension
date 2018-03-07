#!/usr/bin/env bash

zip --move ./build/chrome/extension.zip  ./build/chrome/*
zip --move ./build/edge/extension.zip    ./build/edge/*
zip --move ./build/firefox/extension.zip ./build/firefox/*
