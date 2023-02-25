## ZON `weather widget`

A tiny weather widget for Zeit Online

![logo](http://bannermann6.com/projects/zon/weather-widget/zon_widget.png)

Tasks included:

- HTML minify (on build)
- CSS autoprefixer
- Sass minify
- JS minify
- Image minify
- Nunjucks (i've used template injunctions)
- Live reload
- Babel

## How to run
1. Install Gulp globally.

    npm install gulp-cli -g

2. Install necessary packages

    npm install

3. Run Gulp.

    yarn dev
    or
    npm run dev
    
    (enjoy the weather)

The live reload task should then initiate the project on http://localhost:3000. 
If that port is already taken it will default to another number such as localhost:3001.

## Building assets

To build assets without starting a local server with live reload, use the build command:

    gulp build
