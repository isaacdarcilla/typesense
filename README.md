# Typesense Movie Search

This project is a requirement for Typesense job application.

## Technologies Used

- [Typesense](https://typesense.org)
- [Next.js 14](https://nextjs.org/docs/getting-started)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

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

### Run Linter and Formatter

```bash
pnpm lint:fix
```