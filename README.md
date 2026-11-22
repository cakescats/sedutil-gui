# CakesCats Drives

A Windows program for self-encrypting drives (TCG Opal): see their state,
unlock and lock them, open locking ranges, change the Admin1 password and
write the PBA image. It is a window over `sedutil-cli` from
[cakescats/sedutil-pba](https://github.com/cakescats/sedutil-pba), run with
`-j -S` ([format](https://github.com/cakescats/sedutil-pba/blob/4f5f43fa2568ee6a8b52197d3a575c86ec44bbe2/docs/json.md)):
the result comes back as JSON, and passwords go through a pipe instead of
the command line, so they never show up in the process list.

Status: first test version. It asks for administrator rights at start.
Nothing in it erases data yet: setting a drive up (`--initialSetup`),
reverts and PSID revert stay on the command line for now.

## Download

Builds of `main` are in the artifacts of the
[build workflow](../../actions/workflows/build.yml) (`cakes-drives-windows-msi`).
A tag `v*` makes a draft release with the MSI.

The MSI is not signed yet, so SmartScreen warns: More info → Run anyway.

## Layout

- `ui/`: the page (plain HTML, CSS and JS, no build step).
- `src-tauri/`: the Tauri side. `src/main.rs` runs `sedutil-cli` and lets
  through only the commands in `ALLOWED`.
- `SEDUTIL_REF`: the sedutil-pba commit CI builds `sedutil-cli.exe` from.
- `dev/`: a stand-in backend for trying the page in a browser. Run
  `python3 dev/make-preview.py` and open `dev/preview.html` (Admin1
  password `test`, range 1 password `r1`).
- `icon-source.png`: the logo, scaled up; CI makes the icons from it.

## Build

CI (`.github/workflows/build.yml`) builds everything. By hand on Windows,
with Rust, Node and Visual Studio installed:

```
git clone https://github.com/cakescats/sedutil-pba
git -C sedutil-pba checkout <commit from SEDUTIL_REF>
msbuild sedutil-pba\windows\CLI\CLI.sln /p:Configuration=Release /p:Platform=x64
copy <the built sedutil-cli.exe> src-tauri\binaries\sedutil-cli-x86_64-pc-windows-msvc.exe
npx @tauri-apps/cli@2 icon icon-source.png -o src-tauri/icons
npx @tauri-apps/cli@2 build
```

The MSI is in `src-tauri/target/release/bundle/msi/`. `SEDUTIL_CLI` points
the program at another `sedutil-cli` for development.

## License

GPL-3.0-or-later, like sedutil. sedutil is Copyright Bright Plaza Inc.;
the logo is © CakesCats.
