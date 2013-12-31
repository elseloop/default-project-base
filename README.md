Default Project Base Setup
=====

Sets up preferred file sturcture, Gruntfile, & Compass.

##### Get up and going:

1. Clone or download repo into project folder
2. run `npm install` from the command line (installs grunt and assorted dependencies defined in `package.json` file)
3. run `grunt dev` from the command line to:  
  a. start a server at port :8000  
  b. run `grunt watch` which, in turn, will:  
    1. prefix any necessary CSS3 declarations you were too lazy to handle yourself  
    2. process, concatenate, and minify .scss & .js files  
    3. compress any images in the `img` directory  
    4. let LiveReload know what's up (I use [the browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-))  

##### Dependencies:

1. [Node.js/npm](http://nodejs.org/)  
2. [Grunt](http://gruntjs.com/)  
3. [Compass](http://compass-style.org/)  
4. [Sass Globbing](https://github.com/chriseppstein/sass-globbing) (allows for *much* neater Sass imports)  
5. [LiveReload](http://livereload.com/) (Optional, but only if you hate yourself)  
6. [Fittext gem](https://github.com/bookcasey/fittext) (Optional)  

##### Notes
1. You'll need to change the Gruntfile `concat`, `uglify`, & `watch` objects if you're writing coffeescript. Basically just change the `*.js` values to `*.coffee`  
2. If you don't want the Compass support you'll need to edit the Gruntfile before you get going. I think that's just plain crazypants, but whatever, man, free country and all that. Here you go:  
  a. on line 13, remove the `compass: true` item (or change it to false, which is the default)  
  b. remove the `@import "compass"` line from the `style.scss` (line 1)  
3. The Fittext compass extension is optional, but easily required.   
  a. In the config.rb file, ucommented line 2 (`require 'fittext'`).  
  b. Then uncomment line 2 in the main `style.scss` file.  
  c. Just make sure you're including Compass before Fittext to avoid blowing up your day.  