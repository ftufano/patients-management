const fs = require('fs');
const data = JSON.parse(fs.readFileSync(0, 'utf8'));

const transformed = data
    .filter(c => c.idd && c.idd.root)
    .map(c => {
        const root = c.idd.root;
        const suffix = (c.idd.suffixes && c.idd.suffixes.length > 0) ? c.idd.suffixes[0] : '';
        const code = root + suffix;
        return {
            flag: c.flag,
            code: code,
            name: c.name.common,
            cca2: c.cca2
        };
    })
    .filter(c => c.code.length > 0)
    .sort((a, b) => {
        if (a.name === 'Venezuela') return -1;
        if (b.name === 'Venezuela') return 1;
        return a.name.localeCompare(b.name);
    })
    .map(c => {
        let mask = '___ ___ ____';
        if (c.code === '+58') {
            mask = '0___-_______';
        } else if (c.code === '+1') {
            mask = '(___) ___-____';
        }
        return {
            flag: c.flag,
            code: c.code,
            name: c.name,
            mask: mask
        };
    });

console.log(JSON.stringify(transformed, null, 2));
console.log('Count:', transformed.length);
