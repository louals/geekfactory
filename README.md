# The Bismuth Smith

> **Alchemy of Elements**  
> An elite ecommerce experience specializing in iridescent Bismuth jewelry and crystals.

![Project](/assets/logo.png)

### Overview

The Bismuth Smith is a modern, high-performance ecommerce application built with **Next.js 15** and **React 19**. It features a unique "Mystical Modernity" aesthetic, prioritizing dark mode, glassmorphism, and fluid animations to showcase the scientific beauty of Bismuth crystals.

The project allows users to browse products, manage a cart, create wishlists, and inquire about wholesale opportunities, all wrapped in a premium, responsive user interface.

### Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Library:** [Shadcn/ui](https://ui.shadcn.com/) (based on Radix UI)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTTP Client:** Axios (with interceptors)
- **Linting/Formatting:** ESLint, Prettier

### Features

### Shopping Experience

- **Dynamic Homepage**: Features specific sections for Hero, Categories, Educational content, and featured products.
- **Product Catalog**: Full product listing with filtering (availability, price, category), sorting, and pagination.
- **Interactive Cart**: Slide-out cart drawer managed by global state, persisting user selections.
- **Wishlist**: Dedicated page for users to save their favorite items.

### User Account

- **Authentication**: Login and Registration screens.
- **Profile Management**: specialized dropdown menu for quick access to Orders, Address, and Wishlist.
- **Wholesale Portal**: Dedicated inquiry form for B2B partners.

### Design System

- **Mystical Modernity**: A custom design language featuring:
  - Deep black backgrounds (`bg-black`)
  - Bismuth-inspired accent colors (Cyan, Magenta, Purple)
  - Glassmorphism effects
  - Smooth scroll and hover animations
- **Responsive**: Fully optimized for mobile, tablet, and desktop.

### Developer Experience

- **CI/CD**: GitHub Actions workflow configured for automated linting, formatting, and build checks.
- **Type Safety**: Strict TypeScript configuration.
- **Clean Code**: Prettier and ESLint configured for consistent code style.

### Project Structure

```bash
├── app/                  # Next.js App Router routes
│   ├── (shop)/           # Public facing pages (Home, Shop, About, etc.)
│   ├── admin/            # Admin dashboard routes
│   └── globals.css       # Global styles & Tailwind configuration
├── components/           # React components
│   ├── home/             # Homepage specific sections (Hero, MysteryBox, etc.)
│   ├── ui/               # Reusable primitives (Buttons, Inputs, Sheet, etc.)
│   ├── Navbar.tsx        # Main navigation
│   ├── CartDrawer.tsx    # Shopping cart slide-out
│   └── ProductCard.tsx   # Reusable product display card
├── lib/                  # Utilities and Logic
│   ├── api.ts            # Axios instance with interceptors
│   ├── store.ts          # Zustand state store
│   └── utils.ts          # Helper functions (cn, etc.)
├── public/               # Static assets
└── .github/              # CI/CD workflows
```

## ⚡ Getting Started

1.  **Clone the repository**

    ```bash
    git clone git@github.com:louals/jewelery-website.git
    cd jewelery-website
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  **Open the app**
    Open [http://localhost:3000](http://localhost:3000)

### Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run format`: Formats all code using Prettier.
- `npm run format:check`: Checks if code is properly formatted (used in CI).
