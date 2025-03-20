# Fetch Take Home

## Overview

[FurrEver Finder](https://furreverfinder.vercel.app/)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This site displays a list of dogs that's filterable and sortable by breed. You can add dogs to a favorites list to generate a match for you.

## UI Components/Libaries

- Tailwind
- shadcn/ui
- Tanstack React Query

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vkvang44/fetch-frontend.git
```

### 2. Install dependencies.

```bash
npm install --legacy-peer-deps
# some shadcn ui components aren't compabitle with react 19. Consider using --legacy-peer-deps or --force.
```

### 3. Start the server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
