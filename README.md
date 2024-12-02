# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Getting Started

### Running the App Locally

1. Clone the repository using `git clone https://github.com/ahshakib/Product-Catalog.git`
2. Navigate to the project directory using `cd Product-Catalog`
3. Install the dependencies using `npm install` or `yarn install`
4. Start the development server using `npm run dev` or `yarn dev`
5. Open your browser and navigate to `http://localhost:5173`

### Login Credentials

No login credentials are required for this app.

### Public URL Link

The app is deployed at [https://product-catalog-hz4axruuc-ahshakibs-projects.vercel.app/](https://product-catalog-hz4axruuc-ahshakibs-projects.vercel.app/)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```