#!/bin/bash -e
# set -o pipefail
set -o errexit

if [ "$TRAVIS_BRANCH" = "dev" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]  && [ "$TRAVIS_NODE_VERSION" = "5.1" ]
then
  git config --global user.email "aleksandar.xyz@gmail.com"
  git config --global user.name "Travis-CI"

  build_polymer () {
    echo Bulding with polymer-cli
    polymer build
  }

  # deploy_github () {
  #   echo Deploying to GitHub
  #   git config --global user.email "nobody@nobody.org"
  #   git config --global user.name "Travis CI"
  #
  #   cd ..
  #   git clone "https://${GITHUB_TOKEN}@${GH_REF}" deploy
  #   cd deploy
  #   ls
  #   # rm -rf ../bundled
  #   # cp -r build/bundled ../
  #   # cd ../bundled
  #   #
  #   # git init
  #   # git add .
  #   # git commit -m "Deploy to Github Pages"
  #   # git push -f -q "https://${GITHUB_TOKEN}@${GH_REF}" dev:master > /dev/null 2>&1
  # }

  build_polymer
  # deploy_github
fi
