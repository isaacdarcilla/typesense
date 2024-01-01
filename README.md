## 🎬 Instant Movie Search, powered by Typesense

This project is a requirement for Typesense job application. This is a demo that showcases some of [Typesense's](https://github.com/typesense/typesense) features using a 2000 database of movies.

The movie dataset is from <a href="https://glin.github.io/reactable/articles/popular-movies/tmdb_movies.json" target="_blank">glin/reactable</a>, lottie animation is from [Flying searcher](https://lottiefiles.com/animations/flying-searcher-Iy9s6A8pch) and background from [Hero Patterns](https://heropatterns.com/).

### Technologies Used

- [Typesense](https://typesense.org)
- [Next.js 14](https://nextjs.org/docs/getting-started)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Prequisites

- [pnpm](https://pnpm.io/installation) // or npm or yarn
- Typesense API

### Folder Structure

    .
    ├── app                   # App router
    ├── components            # Reusable components
    ├── config                # Configs for fonts, site and Typesense
    ├── data                  # Movie data
    │   ├── import.ts         # Import functions
    │   └── movies.jsonl      # Movie json data
    ├── public                # Static assets to be served
    ├── styles                # Styling
    ├── types                 # TS types
    ├── utils                 # Global helpers
    └── README.md

### How to Use

For  this project, I have used `pnpm` package manager for this project. Below are the installation instructions using `pnpm`.

To install locally, run the following command:

```bash
git clone https://github.com/isaacdarcilla/typesense
```

### Install Dependencies

```bash
cd typesense
pnpm install
```

After installing the dependencies, create your account and generate API keys in [Typesense](typesense.org) dashboard. Then, create a new `.env` file, copy and paste the contents from `.env.example` and set the values.

```
NEXT_PUBLIC_TYPESENSE_HOST=
NEXT_PUBLIC_TYPESENSE_PORT=443
NEXT_PUBLIC_TYPESENSE_PROTOCOL=https
NEXT_PUBLIC_TYPESENSE_ADMIN_API_KEY=
NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY=
NEXT_PUBLIC_TYPESENSE_COLLECTION_NAME=
```

### Import Data in Typesense

```bash
pnpm typesense:import
```

### Run the Development Server

```bash
pnpm dev
```

Open `http://localhost:3000` to see the app.

### Run Linter and Formatter

```bash
pnpm lint:fix
```
