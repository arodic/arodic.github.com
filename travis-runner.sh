#!/bin/bash -e
set -o pipefail
# set -o errexit

if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]  && [ "$TRAVIS_NODE_VERSION" = "5.1" ]
then
  git config --global user.email "aleksandar.xyz@gmail.com"
  git config --global user.name "Travis-CI"

  build_polymer () {
    echo Bulding with polymer-cli
    polymer build --sources  images/**/*
  }

  deploy_firebase () {
    echo Deploying to Firebase
    firebase deploy --token "$FIREBASE_TOKEN" -m "Auto Deployed by Travis CI"
  }

  build_polymer
  deploy_firebase
fi
