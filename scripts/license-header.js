const fs = require('fs');
const path = require('path');

const header = fs.readFileSync(
  path.join(__dirname, '..', 'template-agpl3-header.txt')
);

const hasHeader = (path) => {
  return fs.readFileSync(path).includes(header);
};

// https://stackoverflow.com/a/66083078
function* walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name));
    } else {
      if (
        ['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(file.name)) &&
        !hasHeader(path.join(dir, file.name))
      )
        yield path.join(dir, file.name);
    }
  }
}

for (const filePath of walkSync(path.join(__dirname, '..', 'src'))) {
  try {
    console.log(filePath);
    const data = fs.readFileSync(filePath);
    const fd = fs.openSync(filePath, 'w+');
    fs.writeSync(fd, header, 0, header.length, 0);
    fs.writeSync(fd, data, 0, data.length, header.length);
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  } catch (e) {
    console.error(e);
  }
}
