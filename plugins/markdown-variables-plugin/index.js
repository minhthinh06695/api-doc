// plugins/markdown-variables-plugin/index.js
module.exports = function (context, options) {
    const variables = options.variables || {};
    
    return {
      name: 'markdown-variables-plugin',
      configureWebpack() {
        const rules = [];
        
        // Tạo rule cho mỗi biến
        Object.entries(variables).forEach(([key, value]) => {
          rules.push({
            test: /\.md$/,
            use: [
              {
                loader: 'string-replace-loader',
                options: {
                  search: new RegExp(`\\{\\{${key}\\}\\}`, 'g'),
                  replace: value,
                },
              },
            ],
          });
        });
        
        return {
          module: {
            rules,
          },
        };
      },
    };
  };