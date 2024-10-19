Fork repositoryet.

VSCode plugins å installere: "ESLint", "Prettier ESLint", "Prettier - code fromatter".

Gjør 1 av disse 2:

1. Ctrl + Shift + P -> settings -> “open workspace settings” (OBS: ikke json) -> Søk på “format” og huk av for “Editor: format on save”,
   og "Editor: default formatter" og velg "prettier".

2. Finn .vscode mappe utenfor sifi-mappen -> legg til det under i settings.json fil:

```javascript
{
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true
}
```

Installer nødvendige dependencies

```shell
npm install
```

Kompiler og vis nettsiden på localhost:

```shell
npm run dev
```

Ønsker man å lage en subpages - eksempelvis en Om-oss subpage:

- lag en mappe under /src/app. Navnet på denne mappen blir navnet på subpagen. Så en about blir sifi.no/about.
- lag en page.tsx fil i den nylig opprettede mappen. Dette blir innholdet. Ønsker du å bruke hoved layout.tsx så gjør du ingenting. Ønsker du derimot å bruke en egen layout for subpagen din, så må du lage en layout.tsx i den nylig opprettede mappen.

#### Sende inn endringene sine:

- Inne på github repoet, vil stå "1 contribute ahead of main" -> trykk på "contribute" -> new pull request.
- deretter skriv inn informasjon om endringene osv.

#### Ferdiglagde komponenter

https://ui.shadcn.com/docs/components
