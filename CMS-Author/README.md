# raiweb-browserify-gulp-angular
## Gulp Tasks:
### lint ###
Gulp task "lint" uses es-lint for linting the javascript code files.
It will include all js and json files from following folders:
* app/** /*.{js, json}

.eslintrc.json file can be used to override default es-lint configs and rules

### browserify ###
Gulp task "browserify" uses 'index.js' as entry point and concatinates all dependencies and sub dependencies of index.js and generates "target/index.js" Note: I does not add angular templateCache dependency "templates.js". To add this, Run gulp task "buildjs" which runs a sequence of gulp Tasks:

**ngTemplateCache -> browserify -> cleanNgTemplateCache**


