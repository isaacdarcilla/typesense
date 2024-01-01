## 🎬 Instant Movie Search, powered by Typesense

This project is a requirement for Typesense job application. This is a demo that showcases some of [Typesense's](https://github.com/typesense/typesense) features using a 2000 database of movies.

### Technologies Used

- [Typesense](https://typesense.org)
- [Next.js 14](https://nextjs.org/docs/getting-started)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

The movie dataset is from <a href="https://glin.github.io/reactable/articles/popular-movies/tmdb_movies.json" target="_blank">glin/reactable</a>.

### How to Use

I have used `pnpm` package manager for this project. Below are the installation instructions
using `pnpm`.

To install locally, run the following command:

```bash
git clone https://github.com/isaacdarcill/typesense
```

### Install Dependencies

```bash
cd typesense
pnpm install
```

After installing the dependencies, create your account and generate API keys in [Typesense](typesense.org)
Create a new `.env` file, copy and paste the contents from `.env.example`.

```
NEXT_PUBLIC_TYPESENSE_HOST=
NEXT_PUBLIC_TYPESENSE_PORT=
NEXT_PUBLIC_TYPESENSE_PROTOCOL=
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