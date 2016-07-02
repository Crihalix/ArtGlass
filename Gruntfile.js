module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'js/libs/*.js', // Все JS в папке libs
                    'js/main.js'  // Конкретный файл
                ],
                dest: 'dist/js/production.js'
            }
        },

        uglify: {
            build: {
                src: 'dist/js/production.js',
                dest: 'dist/js/production.min.js'
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 3
                },
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: ['**/*.png'],
                        dest: 'dist/img/',
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: ['**/*.jpg'],
                        dest: 'dist/img/',
                        ext: '.jpg'
                    }
                ]
            }
        },

        less: {
            options: {
                spawn: true
            },
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 3
                },
                files: {
                    "dist/css/all.css": "less/all.less" // destination file and source file
                }
            }
        },

        autoprefixer: {

            options: {
                browsers: ['Chrome > 25', 'Safari > 6', 'iOS 7', 'Firefox >= 15', 'ie >= 9']
            },
            dist: {
                //diff: false,
                //expand: true,
                //flatten: true,
               src:  'dist/css/*.css'
            }
        },

        watch: {
            options: {
                livereload: true
            },

            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },

            less: {
                files: ['less/**/*.less'],
                tasks: ['less', 'autoprefixer'],
                options: {
                    spawn: false
                }
            },

            imagemin: {
                files: ['**/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                    event: ['added', 'changed']
                }
            }
        }
    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', [ 'concat', 'uglify', 'less', 'imagemin', 'autoprefixer', 'watch']);

};