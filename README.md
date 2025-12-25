# BharatKart 🇮🇳

BharatKart is a premium e-commerce platform dedicated to showcasing and selling authentic Indian handicrafts, textiles, and cultural artifacts. It connects artisans directly with customers, celebrating India's rich heritage through a modern digital experience.

## 🚀 Features

*   **Diverse Collection:** Explore products from all 28 Indian states, each with its unique cultural story.
*   **Artisan Spotlight:** Meet the skilled creators behind the masterpieces.
*   **State-wise Exploration:** Immersive experience to explore crafts by region and state.
*   **Secure Authentication:** User signup/login via Email and OTP (Supabase Auth).
*   **Shopping Cart:** Persistent cart functionality synced with the database.
*   **Responsive Design:** Beautiful, mobile-first UI using Tailwind CSS and Framer Motion.
*   **Cultural Experience:** 3D environments and cultural storytelling for an immersive feel.

## 🛠️ Tech Stack

*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) with [Shadcn UI](https://ui.shadcn.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL)
*   **State Management:** React Context API & Hooks
*   **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages and API routes
├── components/           # Reusable React components
│   ├── cultural/         # Cultural-specific UI elements (3D, animations)
│   ├── layout/           # Header, Footer, etc.
│   └── ui/               # Shadcn UI base components
├── contexts/             # Global state (Auth, Cart)
├── lib/                  # Utilities, Supabase client, and helper functions
├── public/               # Static assets
├── scripts/              # Database seeding scripts
├── styles/               # Global styles
└── supabase/             # Database migrations and seeds
```

## 🌐 Live Deployment

*   **Live Project:** [https://vercel.com/indianbhai28-8638s-projects/v0-bharat-kart-e-commerce-design](https://vercel.com/indianbhai28-8638s-projects/v0-bharat-kart-e-commerce-design)
*   **v0 Project:** [https://v0.app/chat/projects/FdfUZGsNNJd](https://v0.app/chat/projects/FdfUZGsNNJd)

## ⚡ Getting Started

### Prerequisites

*   Node.js 18+ installed
*   pnpm (recommended) or npm/yarn
*   A Supabase project created

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/gintama1018/bharat-kart.git
    cd bharat-kart
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # Optional: for admin scripts
    ```

4.  **Database Setup**
    Run the SQL scripts in your Supabase SQL Editor to set up the schema and seed data:
    1.  Copy content from `supabase/migrations/001_initial_schema.sql`
    2.  (Optional) Run `supabase/seed.sql` for initial data.

    Alternatively, you can run the seeding script:
    ```bash
    node scripts/seed-states.js
    ```

5.  **Run the Development Server**
    ```bash
    pnpm dev
    # or
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🗄️ Database Schema

The project uses a relational database structure:

*   **users:** Extended user profiles linked to Supabase Auth.
*   **states:** Information about Indian states (culture, theme, colors).
*   **artisans:** Profiles of skilled craftsmen.
*   **products:** Items for sale, linked to states and artisans.
*   **cart_items:** User shopping cart data.
*   **orders & order_items:** Order management.
*   **reviews:** Product ratings and comments.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
