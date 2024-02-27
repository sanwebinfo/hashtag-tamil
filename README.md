# Hashtag

![build-test](https://github.com/sanwebinfo/hashtag-tamil/workflows/build-test/badge.svg)  

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
npm install -g hashtag-tamil
````

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

## LICENSE

MIT
