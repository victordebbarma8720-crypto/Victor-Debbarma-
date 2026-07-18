# CalcMate – Smart Calculator

A fast, clean calculator built with Expo (React Native + TypeScript), covering
addition, subtraction, multiplication, division, percentage/discount math,
decimals and calculation history. See `../CalcMate-App-Description.md` for
the full app store listing copy.

## Requirements

- Node.js 18+
- The [Expo Go](https://expo.dev/go) app on your phone (easiest way to test
  on a real device), or Android Studio / Xcode for a simulator

## Setup

```bash
cd calcmate
npm install
```

If dependency versions drift from your installed Expo SDK, run:

```bash
npx expo install --fix
```

## Run

```bash
npm start        # opens the Expo dev tools; scan the QR code with Expo Go
npm run android   # requires Android Studio / emulator
npm run ios       # requires Xcode / simulator (macOS only)
npm run web       # runs in a browser
```

## Type checking

```bash
npm run typecheck
```

## Project structure

```
calcmate/
  App.tsx                    # app entry, wires state + screens together
  src/
    types.ts                 # shared types (state, actions, history entries)
    logic/calculator.ts      # pure calculator engine (reducer, no UI deps)
    components/
      Display.tsx            # current value / expression / history button
      CalcButton.tsx          # reusable keypad button
      Keypad.tsx              # digit/operator grid
      HistoryModal.tsx        # calculation history bottom sheet
    theme/colors.ts           # color palette
```

## Notes

- App icons and splash screen images are not included yet. Before
  publishing, add real assets under `assets/` per the "App Icon
  Recommendation" section of `../CalcMate-App-Description.md`, then
  reference them from `app.json` (`expo.icon`, `expo.splash.image`,
  `expo.android.adaptiveIcon.foregroundImage`).
- Percentage math follows standard calculator behavior: with a pending
  operator (e.g. `500 - 20%`), `%` is computed relative to the previous
  value, which is what makes discount/tax calculations come out correctly.
- History keeps the most recent 50 calculations in memory (not yet
  persisted to disk — add `AsyncStorage` if you want it to survive app
  restarts).
