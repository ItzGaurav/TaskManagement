/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/',
 
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'app': 'app',// 'dist',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
            'ng2-auto-complete': 'npm:ng2-auto-complete/dist/ng2-auto-complete.umd.js',
            'lodash': 'npm:lodash/lodash.js',
            'angular2-datatable': 'npm:angular2-datatable',
            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            'sweetalert2': 'npm:sweetalert2/dist/sweetalert2.all.js',
            //'ngx-bootstrap': 'npm:ngx-bootstrap',
            //'moment': 'node_modules/moment/moment.js',
            //'jquery': 'node_modules/jquery',
            //'underscore': 'node_modules/underscore/underscore.js',
            //'ngx-bootstrap': 'node_modules/ngx-bootstrapbundles/ngx-bootstrap.umd.js',
            //'ngx-bootstrap': 'https://unpkg.com/ngx-bootstrap/bundles/ngx-bootstrap.umd.min.js',
           // '@ng-bootstrap/ng-bootstrap': 'node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
            //'@toverux/ngx-sweetalert2': 'npm:@toverux/ngx-sweetalert2/dist',
            //'angular2-jwt': 'npm:angular2-jwt',
            //'angular-jwt': 'node_modules/@auth0/angular-jwt',
            //'angular2-auth': 'npm:angular2-auth/dist',
            //'angular-jwt': 'npm:@auth0/angular-jwt',
            //'angular2-jwt': 'npm:@auth0/angular2-jwt',
            //"angular2-jwt": "node_modules/@auth0/angular-jwt",
            // other libraries
            'rxjs': 'npm:rxjs',
            'tslib': 'npm:tslib/tslib.js',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            //'underscore': 'npm:underscore@1.8.3',
            //'jquery': 'npm:jquery@3.3.1'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                defaultExtension: 'js',
                meta: {
                    './*.js': {
                        loader: 'systemjs-angular-loader.js'
                    }
                }
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'lodash': {
                defaultExtension: 'js'
            },

            'angular2-datatable': {
                main: './index.js',
                defaultExtension: 'js'
            },
            //'ngx-bootstrap': {
            //    format: 'cjs',
            //    main: 'bundles/ngx-bootstrap.umd.js',
            //    defaultExtension: 'js'
            //},
            'moment': {
                main: 'moment.js',
                defaultExtension: 'js'
            },
           
            //'angular-jwt': {
            //    "defaultExtension": "js"
            //}

        }
    });

    if (!global.noBootstrap) { bootstrap(); }

    // Bootstrap the `AppModule`(skip the `app/main.ts` that normally does this)
    function bootstrap() {

        // Stub out `app/main.ts` so System.import('app') doesn't fail if called in the index.html
        System.set(System.normalizeSync('app/main.ts'), System.newModule({}));

        // bootstrap and launch the app (equivalent to standard main.ts)
        Promise.all([
          System.import('@angular/platform-browser-dynamic'),
          System.import('app/app.module')
        ])
        .then(function (imports) {
            var platform = imports[0];
            var app = imports[1];
            platform.platformBrowserDynamic().bootstrapModule(app.AppModule);
        })
        .catch(function (err) { console.error(err); });
    }

})(this);
