# Development Guide

## Requirements

- Node.js with npm
- Android device/emulator or iOS device for supported development
- Expo Go for the current development workflow

## Install

```bash
npm install
```

## Start

```bash
npm start
```

Then scan the Expo QR code with Expo Go.

## Useful commands

```bash
npm run android
npm run ios
npm run web
npx expo-doctor
npx expo install --check
```

## Working rules

- Keep commits focused and descriptive.
- Run Expo Doctor after dependency changes.
- Do not use `npm audit fix --force` casually; it can introduce breaking dependency changes.
- Keep secrets out of source control.
- Test on a real Android device regularly, not only in the browser.
