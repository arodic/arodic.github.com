#!/bin/bash -e
set -o pipefail

if [ "$TRAVIS_BRANCH" = "dev" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]  && [ "$TRAVIS_NODE_VERSION" = "5.1" ]
then
  git config --global user.email "aleksandar.xyz@gmail.com"
  git config --global user.name "auto deployer"

  build_polymer () {
    echo Bulding with polymer-cli
    polymer build
  }

  build_polymer

elif [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]  && [ "$TRAVIS_NODE_VERSION" != "5.1" ]
then
  echo "Do Nothing, only deploy with Node 5.1"
