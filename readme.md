# Kaffediem på Svelte 🧨

Dette er kaffe-diem sitt system for å selge kaffe. Bygget med kjærlighet av elever fra [Amalie Skram](https://www.amalieskram.vgs.no).

Dette prosjektet har blitt utviklet på kodekafe. [Bli med på Discord!](https://discord.gg/HC6UMSfrJN)

- [Kontribuering](./docs/contribution.md)
- [Forklaring av sider](./docs/routes.md)
- [Arkitektur](./docs/architecture.md)

## Kjøre lokalt

Det er nyttig å enten ha Linux eller WSL.

Bemerk at node versjon 20 brukes. Det kan installeres med NVM:

```bash
nvm use 20
```

### Teste på lokal maskin (dependencies allerede installert, hvis ikke: `npm ci`)

1. .env

```
PUBLIC_PB_HOST=https://kodekafe-pocketbase.fly.dev
PB_ADMIN_EMAIL=
PB_ADMIN_PASSWORD=
```

```bash
export $(xargs <.env)
```

2. Bygg og kjør appen

```bash
make
```

Man kan også kjøre Pocketbase lokalt via docker, dette er lurt om man skal endre på schema.

```bash
make db
```

### Hvis dependencies ikke er installert (for eksempel på rpi):

1. Kopier `package.json` og `package-lock.json` til `build/`

```bash
cp {package.json,package-lock.json} build/
cd build
```

2. Installer dependencies

```bash
npm ci --omit dev
```

3. Kjør serveren:

```bash
node .
```
