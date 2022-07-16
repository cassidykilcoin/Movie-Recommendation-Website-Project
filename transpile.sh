#!/bin/bash

# To be able to run this file on a Mac follow these steps:
# From the terminal, while on the same folder as this file, enter the following command:
#  chmod u+x transpile.sh
# That will make it so you can execute the file

# Regardless of OS, run these steps:
# Enter the following command:
#  ./transpile.sh jsxdir jsdir
# where jsxdir is the directory where your jsx file is located
# and jsdir is the directory where you want your js file to be located

# Run Babel code to transpile JSX from directory given by $1 into JS files in directory given by $2
npx babel $1 --out-dir $2 --watch --presets react-app/prod
npx babel jsx --out-dir js --watch --presets react-app/prod