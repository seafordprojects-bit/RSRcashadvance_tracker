import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: 'base' must match your GitHub repo name so links work on
// GitHub Pages. If your repo is github.com/seafordprojects-bit/sfship-tracker
// then the site is served at /sfship-tracker/ and base must be '/sfship-tracker/'.
// Change this line if you name the repo something else.
export default defineConfig({
  plugins: [react()],
  base: '/RSRcashadvance_tracker/',
})
