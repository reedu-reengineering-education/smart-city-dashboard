/**
 * Smart City Münster Dashboard
 * Copyright (C) 2022 Reedu GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
