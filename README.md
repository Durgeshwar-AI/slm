# SLM

A small Expo + Expo Router app scaffolded with create-expo-app. Includes a file-based `app/` router, Tailwind/nativewind support, and example UI components.

## Quick start

Prerequisites: Node.js and npm (or Yarn).

1. Install dependencies

```bash
npm install
```

2. Start the Metro bundler and open the dev tools

```bash
npx expo start
```

In the Expo CLI you can press:

- `a` to open Android emulator
- `i` to open iOS simulator
- `w` to open the web version

To run on a physical device, scan the QR code with Expo Go or use a development build for full native APIs.

## Useful scripts

- `npm run start` — runs `expo start` (same as `npx expo start`).
- `npm run reset-project` — moves starter example and creates a fresh `app/` (see `scripts/reset-project.js`).

## Project layout (top-level)

- `app/` — file-based routes and screens
- `assets/` — images and static assets
- `store/` — Redux slices / state management

## Notes

- This project uses Expo Router and `react-native` components; if you upgrade package versions, follow Expo and React Navigation upgrade guides.
- If you see runtime JSX or component errors, check the files under `app/(tabs)/` where navigation is defined.

## How the app works

On startup the Expo CLI loads the Expo Router entry which mounts the file-based router found in the `app/` directory. The router applies the global layout (`app/_layout.tsx`) and the tab layout (`app/(tabs)/_layout.tsx`) and renders screen components placed under `app/(tabs)/` and other route folders.

Render flow (high level):

- Expo CLI -> Metro Bundler -> Expo Router entry
- Router reads `app/` file routes -> mounts layouts
- Layouts render navigators and screen components
- Screens compose UI using shared components and read/write app state from the Redux store

## How users can interact

- Navigate between screens using the bottom tab bar (defined in the `app/(tabs)/` layout).
- Tap list items or buttons in screens to view details or trigger actions implemented by the screen components.
- Use standard gestures (scroll, pull-to-refresh, taps) the same way as typical React Native apps.
- During development, open the app via the Expo CLI: scan the QR code with Expo Go, or press `a`/`i`/`w` to open Android/iOS/web.

## How the app functions (technical)

- Routing: file-based routing powered by Expo Router — add files under `app/` to create new routes.
- State: Redux is configured in `store/store.ts` with slices such as `store/leadsSlice.ts` to hold application data (e.g., leads). Screens subscribe to the store and dispatch actions to update state.
- UI: Reusable components live in `components/` and `components/ui/`; screens compose these building blocks. Theme helpers live in `constants/` and `hooks/` (`use-theme-color.ts`, `use-color-scheme.ts`).
- Styling: Tailwind/nativewind is configured via `tailwind.config.js` and `global.css` for utility-first styles.
- Assets: Static images and other assets are in `assets/` and referenced from components/screens.
- Scripts: Useful scripts are defined in `package.json`; `scripts/reset-project.js` resets starter files if needed.

