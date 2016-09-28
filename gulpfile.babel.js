import del          from 'del';
import gulp         from 'gulp';
import jasmine      from 'gulp-jasmine';
import shell        from 'gulp-shell';
import sourcemaps   from 'gulp-sourcemaps';
import jspm         from 'gulp-jspm';
import rename       from 'gulp-rename';
import open         from 'gulp-open';
import jsdoc        from 'gulp-jsdoc3';
import run          from 'run-sequence';

const paths = {

    js:     [ './src/**/*.js' ],
    spec:   [ './src/**/*.spec.js' ],
    dist:   './dist',
    src:    './src',
    doc:    './doc',
    app:    './app'
};

gulp.task( 'default', cb => {

    run( 'clean', 'babel', 'minify', 'bundle', 'docs', 'test', cb );
});

gulp.task( 'build', cb => {

    run( 'clean', 'babel', 'minify', 'bundle' );
});

gulp.task( 'docs', cb => {

    run( 'clean-doc', 'build-doc', cb );
});

gulp.task( 'minify', minify );
gulp.task( 'bundle', bundle );
gulp.task( 'build-doc', buildDoc );

gulp.task( 'clean', cb => {

    run( 'clean-app', 'clean-dist', cb );
});

gulp.task( 'clean-dist', cb => {

    return del( [ paths.dist ] );
});

gulp.task( 'clean-app', cb => {

    return del( [ paths.app ] );
});

gulp.task( 'clean-doc', cb => {

    return del( [ paths.doc ] );
});

gulp.task( 'babel', shell.task([

    'babel src --out-dir app'
]));

gulp.task( 'test', () => {

    gulp.src( paths.spec )
        .pipe( jasmine( { verbose: true } ) )
    ;
});

function buildDoc( cb ) {

    let config = { opts: { destination: paths.doc } };

    gulp.src( [ 'README.md', './src/**/*.js' ], { read: false } )
        .pipe( jsdoc( config, cb ) )
    ;
}

function minify( cb ) {

    gulp.src('./app/parse.js')
        .pipe( sourcemaps.init() )
        .pipe( jspm({

            selfExecutingBundle:    true,
            minify:                 true
        }) )
        .pipe( rename( 'parse.min.js' ) )
        .pipe( sourcemaps.write('./') )
        .pipe( gulp.dest( './dist' ) )
        .on( 'end', cb )
        .on( 'error', err => { console.error( err ); this.emit( 'end' ); } )
    ;
}

function bundle( cb ) {

    gulp.src('./app/parse.js')
        .pipe( sourcemaps.init() )
        .pipe( jspm({

            selfExecutingBundle:    true,
            minify:                 false,
            inject:                 true
        }) )
        .pipe( rename( 'parse.js' ) )
        .pipe( sourcemaps.write('./') )
        .pipe( gulp.dest( './dist' ) )
        .on( 'end', cb )
        .on( 'error', err => { console.error( err ); this.emit( 'end' ); } )
    ;
}