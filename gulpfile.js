const gulp = require("gulp");
const webpack = require("webpack");

const tasks = require("./tasks/gulptasks.js");
const { argv } = require("yargs");
const browserSync = require("browser-sync").create();

process.env.NODE_ENV = argv.production || "development";

const webpackConfig =
    process.env.NODE_ENV === "production" ? "./webpack.config.prod.js" : "./webpack.config.js";

// run webpack to compile the script into a bundle
function compile(done) {
    return new Promise((resolve, reject) => {
        webpack(require(webpackConfig), (err, stats) => {
            if (err) {
                return reject(err);
            }

            if (stats.hasErrors()) {
                return reject(new Error(stats));
            }
            resolve();
        });
    });
}

function serve(done) {
    browserSync.init(
        {
            server: "./build",
            port: 8080,
            host: "0.0.0.0"
        },
        done
    );
}

function watch(done) {
    return gulp.watch(
        "**/*", // watch everything...
        {
            ignored: [
                // ...except for things generated by the build process.
                "build/**/*"
            ]
        },
        // when something changes, rebuild + reload
        gulp.series(compile, reload)
    );
}

function reload(done) {
    browserSync.reload;
    done();
}
// gulp.watch("./css/Style.css").on("change", reload);
gulp.task("copy:html", tasks.copyHtml);
gulp.task("copy:css", tasks.copyCss);
gulp.task("copy:assets", tasks.copyAssets);
gulp.task(
    "server",
    gulp.series(tasks.clean, tasks.copyAssets, tasks.copyHtml, tasks.copyCss, compile, serve, watch)
);

// default includes all
gulp.task(
    "default",
    gulp.series(tasks.clean, tasks.copyAssets, tasks.copyHtml, tasks.copyCss, compile)
);
