#!/usr/bin/env sh
set -eo pipefail

# Make and clean the target directory
mkdir -p ./dist
rm -rf ./dist/*

# Symlink assets and unminimizable files
ln -rs ./assets ./dist/
ln -rs ./src/windows ./dist/
ln -rs ./src/*.html ./dist/

# Link assets to where subprojects expect them.
ln -rsf ./dist/windows/dragonfly/public/assets/uppsala.glb ./dist/assets/

# Minify and bundle JS and CSS files
npx --yes esbuild --minify --bundle --platform=browser --outdir=./dist ./src/main.js ./src/*.css
