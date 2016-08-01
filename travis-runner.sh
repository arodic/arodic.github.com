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

  # deploy_to_gh () {
  #   echo Deploying to GitHub
  #   rm -rf ../out || exit 0;
  #   cp -r build/bundled ../out
  #   git fetch ${DEST_BRANCH}
  #   git checkout ${DEST_BRANCH}
  #   rm -rf *
  #   cp -r ../out/* .
  #   git add .
  #   git commit -m "Travis-CI: Deployed to Github"
  #   git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master > /dev/null 2>&1
  # }

  build_polymer
  # deploy_to_gh
fi
