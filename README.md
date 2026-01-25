# Portfolio_og

A premium, cinematic developer portfolio website built with modern web technologies, featuring advanced animations, smooth scrolling, and a high-performance design.

DARK MODE
![Portfolio Preview](public/og-image.png)
LIGHT MODE
![Portfolio Preview](public/og-image-light.png)

## 🚀 Features

- **Cinematic Design**: Immersive visual experience with advanced animations and smooth transitions.
- **Smooth Scrolling**: Integrated **Lenis** for a butter-smooth scrolling experience.
- **Advanced Animations**: Powered by **GSAP** and **Framer Motion** for complex, high-performance interactions.
- **Responsive Layout**: Fully responsive design using **Tailwind CSS 4**.
- **Dynamic Content**:
    - **Hero Section**: Captivating introduction.
    - **About**: Personal summary and background.
    - **Journey**: Timeline of professional experience and education.
    - **Skills**: Technical proficiency showcase.
    - **Projects**: Portfolio of work with details and links.
    - **Blog**: Insights and articles with a custom modal reader.
    - **Testimonials**: Endorsements and feedback.
    - **Contact**: Functional contact form integrated with **Nodemailer**.
- **Dark Mode**: Optimized for visual comfort and aesthetics.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**:
    - [GSAP](https://gsap.com/)
    - [Framer Motion](https://www.framer.com/motion/)
- **Scrolling**: [Lenis](https://lenis.studio/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email**: [Nodemailer](https://nodemailer.com/)

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router pages and layout
├── components/           # React components
│   ├── layout/           # Navbar, Footer, etc.
│   ├── sections/         # Main sections (Hero, About, Projects, etc.)
│   ├── ui/               # Reusable UI components
│   └── smooth-scroll.tsx # Lenis integration
├── lib/                  # Utility functions and shared logic
└── ...
```

## ⚡ Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/portfolio_og.git
    cd portfolio_og
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory and add your necessary environment variables (e.g., for Nodemailer):

    ```src
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Build & Deploy

To build the application for production:

```bash
npm run build
```

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

## 📄 License

This project is licensed under the MIT License.
