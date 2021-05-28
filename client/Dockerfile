# Base image (Node version 14 is used here to avoid any upgrade related errors)
FROM node:14-alpine as builder
# Set the work directory as app 
WORKDIR '/app'
# Copy the package.json file to make sure all the dependencies are 
# installed for the app to run properly 
COPY package.json .
# Install all the dependencies from the packeage.json file 
# (npm@7 means npm version 7, which is newer)
RUN npm install npm@7
# Copy all the files & folders from current directory to the app directory
COPY . .
# Finally, run the command npm start to start the server 
CMD ["npm","start"]
