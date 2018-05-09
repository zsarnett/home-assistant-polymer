const gulp = require('gulp');
const PolymerProject = require('polymer-build').PolymerProject;
const mergeStream = require('merge-stream');

gulp.task('polymer3', () => {
  const project = new PolymerProject({
    entrypoint: './modulizer_out/src/entrypoint.html',
    shell: './modulizer_out/src/home-assistant.js',
    fragments: []
  });

  return mergeStream(project.sources(), project.dependencies())
    .pipe(project.bundler())
    .pipe(gulp.dest('polymer3/'));
  //   .pipe(project.bundler({
  //     strategy,
  //     strip: true,
  //     sourcemaps: false,
  //     stripComments: true,
  //     inlineScripts: true,
  //     inlineCss: true,
  //     implicitStrip: true,
  //   }))
  //   .pipe(rename(renamePanel))
  //   .pipe(filter(['**', '!src/entrypoint.html']))
  //   .pipe(gulp.dest(es6 ? 'build' : 'build-es5'));


});
