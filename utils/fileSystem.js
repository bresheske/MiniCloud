const glob = require('glob');
const fs = require('fs');

module.exports = {
    listFiles: async(globPattern) => {
        return new Promise((res) => {
            glob(globPattern, (err, matches) => {
                res(matches);
            });
        });
    },
    putFile: async(name, data) => {
        return new Promise((res) => {
            fs.writeFile(name, data, () => res());
        });
    }
};