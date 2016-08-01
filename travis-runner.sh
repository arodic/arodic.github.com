#!/bin/bash -e
set -o pipefail

if [ "$TRAVIS_BRANCH" = "$SRC_BRANCH" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]  && [ "$TRAVIS_NODE_VERSION" = "5.1" ]
then
  git config --global user.email "aleksandar.xyz@gmail.com"
  git config --global user.name "Travis-CI"

  build_polymer () {
    echo Bulding with polymer-cli
    polymer build
  }

  build_polymer
fi
