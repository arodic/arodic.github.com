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

  deploy_github () {
    git config --global user.email "nobody@nobody.org"
    git config --global user.name "Travis CI"

    rm -rf ../bundled
    cp -r build/bundled ../
    cd ../bundled

    git init
    git add .
    git commit -m "Deploy to Github Pages"
    git push --force --quiet "https://${GITHUB_TOKEN}@$github.com/${GITHUB_REPO}.git" dev:master > /dev/null 2>&1
  }

  build_polymer
  deploy_github
fi
