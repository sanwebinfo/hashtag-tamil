# Hashtag

![build-test](https://github.com/sanwebinfo/hashtag-tamil/workflows/build-test/badge.svg) ![npm](https://github.com/sanwebinfo/hashtag-tamil/workflows/npm/badge.svg)  

Hashtag Suggestions and Generator for Tamil post related Context.

A Simple tool to Generate hashtags and Get Hashtag suggestions Based on your Context related to Tamil kavithai and Tamil Related posts.  

## Built using

- Typescript
- Sqlite3 for store hashtags `(/db/hashtags.db)`
- Python to Manage hashtag Database
- SQLite Viewer - <https://github.com/inloop/sqlite-viewer>
- pnpm package manager
- Automatically Copied to Clipboard using `process.platform` to detect OS **(linux: Xclip, MacOS: pbcopy, Windows: clip, and Android: Termux Clipboard)**

## Usage

- Download or Clone the Repo

```sh
git clone https://github.com/sanwebinfo/hashtag-tamil.git

## Open Project Folder
cd hashtag-tamil

## Install packages
pnpm install --no-optional 

## if you want use sqlite3
pnpm install

## build CLI
pnpm build
```

- Link and Test the CLI Locally

```sh
npm link or pnpm link --global
```

- unlink CLI

```sh
npm rm --global hashtag-tamil or pnpm uninstall --global hashtag-tamil
```

- Access CLI Globally

```sh
hashtag "create tamil kavithai"
```

- Access via **`NPX`**

```sh
npx hashtag-tamil "create tamil kavithai"
```

- install via **`NPM`**

```sh

## without sqlite3
npm install -g hashtag-tamil --omit=optional

## with sqlite3
npm install -g hashtag-tamil

## Remove Package
npm uninstall -g hashtag-tamil

````

- install and Manage via **`pnpm`**

```sh

## without sqlite3
pnpm install -g hashtag-tamil --no-optional

## with sqlite3
pnpm install -g hashtag-tamil

## update package
pnpm update -g hashtag-tamil

## Remove Package
pnpm uninstall -g hashtag-tamil

```

## Hashtag Database 🗃

- `(/db)` Folder contains the JSON file with full list of hashtag related to the Context
- add New hashtags to `hashtags.json` file
- Update database file

```sh

## Create db for first time
python db.py

## Clean up and arrange
python duplicate.py

## Update database after adding new tags in JSON file
python update.by
```

- **`sqlite3`** was optional if you want use just install the sqlite3 module without optional command else it uses a `json` file as fallback database (it was used by default for better compatibility)

## MISC (Development)

- Clear **`NPX`** Cache

```sh
npx clear-npx-cache
```

- Git and NPM

```sh

## Create New Package
npm version [major|minor|patch]

## Publish to Github and it automatically push to npm
git push origin {your branch} --follow-tags

## List tags
git tag

## Push tag
git push --tags or git push origin vx.x.x

```

- **Termux sqlite3 installation**

```sh
pkg install binutils make
pkg install clang libsqlite pkg-config
pkg install sqlite
npm install sqlite3 --build-from-source --sqlite=/data/data/com.termux/files/usr/bin/sqlite3
```

## LICENSE

MIT
