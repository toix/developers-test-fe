[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/toix/developers-test-fe) 

# README #

It is test-task on position Frontend-developer in Neuffer Fenster + T�ren GmbH company

### Main task ###

You need to create adaptive page according requirements defined below:

* Main page - show list of all fotos
* Click on each foto will open modal window with big foto and list of comments
* User can add new comment

List of API-endpoints you can find below.
Design of the pages you can find here: https://www.figma.com/file/3VP0QDK3kjdfbkj8TRrtsx/Test-task

### List of endpoints ###

* GET `https://boiling-refuge-66454.herokuapp.com/images` - return list of all fotos
* GET `https://boiling-refuge-66454.herokuapp.com/images/:imageId` - return URL to the big foto and list of the comments
* POST `https://boiling-refuge-66454.herokuapp.com/images/:imageId/comments` - endpoint to save comment (answer 204 - everything is okay, NB! comment will not be saved)

### Additional requirements ###

* it should work locally at my machine after `npm i && npm run start`
* feel free to use frameworks or use pure JS
* when it is possible - please don't use external components, for example for modal windows

### Do you have any questions? ###

Just write me email: a.grechukhin@neuffer.de

### How to provide your solution? ###

* Please make new repo in github/bitbucket/.. and send me (a.grechukhin@neuffer.de) link to evaluate it