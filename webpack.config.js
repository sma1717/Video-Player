const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * Automatically discover JavaScript files and create entry points
 */
function createEntryPoints() {
  const entries = {};
  
  // Define source directories to scan
  const sourceDirs = [
    { dir: 'src/js/modules/common', prefix: '' },
    { dir: 'src/js/modules', prefix: '' },
    { dir: 'src/js/components/common', prefix: '' },
    { dir: 'src/js/components/video-controls', prefix: '' },
    { dir: 'src/js/components', prefix: '' }
  ];
  
  // Scan each directory for JavaScript files
  sourceDirs.forEach(({ dir, prefix }) => {
    const fullPath = path.resolve(__dirname, dir);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath)
        .filter(file => file.endsWith('.js') && !file.includes('.test.') && !file.includes('.spec.'))
        .filter(file => fs.statSync(path.join(fullPath, file)).isFile());
      
      files.forEach(file => {
        const name = prefix + path.basename(file, '.js');
        const relativePath = path.relative(__dirname, path.join(fullPath, file)).replace(/\\/g, '/');
        entries[name] = `./${relativePath}`;
      });
    }
  });
  
  // Add styles entry point if it exists
  if (fs.existsSync(path.resolve(__dirname, 'src/js/styles-entry.js'))) {
    entries['styles'] = './src/js/styles-entry.js';
  }
  
  return entries;
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const entries = createEntryPoints();
  
  return {
    entry: entries,
    
    externalsType: 'module',
    externals: {
      '@modules/video-manager.js': './video-manager.js',
      '@modules/video-shortcut-handler.js': './video-shortcut-handler.js',
      '@modules/common/wd-event-handler.js': './wd-event-handler.js',
      '@modules/common/render-text.js': './render-text.js'
    },
    
    experiments: {
      outputModule: true,
    },
    
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
      clean: true,
      library: {
        type: 'module',
      },
      environment: {
        module: true,
      },
    },
    
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    esmodules: true
                  },
                  modules: false
                }]
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]'
          }
        }
      ]
    },
    
    plugins: [
      new CleanWebpackPlugin(),
      
      new HtmlWebpackPlugin({
        template: './webpack-template.html',
        filename: 'index.html',
        inject: false,
        templateParameters: {
          entries: Object.keys(entries),
          loadingOrder: [
            'wd-event-handler',
            'render-text',
            'video-manager',
            'video-shortcut-handler',
            'wc-svg-icon',
            'wc-button',
            'wc-range-slider',
            'wc-play-button',
            'wc-volume-control',
            'wc-fullscreen-button',
            'wc-seekbar',
            'wc-time-display',
            'wc-video',
            'wc-video-player',
            'wc-video-status'
          ]
        }
      }),
      
      ...(isProduction ? [
        new MiniCssExtractPlugin({
          filename: 'styles/[name].css'
        })
      ] : []),
      
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/images',
            to: 'images',
            noErrorOnMissing: true
          },
          {
            from: 'src/icons',
            to: 'icons',
            noErrorOnMissing: true
          }
        ]
      })
    ],
    
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      open: true,
      hot: true,
      liveReload: true
    },
    
    resolve: {
      extensions: ['.js', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@components': path.resolve(__dirname, 'src/js/components'),
        '@modules': path.resolve(__dirname, 'src/js/modules')
      }
    },
    
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: false, // Keep console logs
              pure_funcs: [], // Don't remove any functions
            },
            mangle: {
              keep_classnames: true, // Keep class names for web components
              keep_fnames: true, // Keep function names
            },
            format: {
              comments: false, // Remove comments
            },
          },
          extractComments: false, // Don't create separate license files
        })
      ],
      splitChunks: false,
      runtimeChunk: false
    },
    
    devtool: false
  };
}; 