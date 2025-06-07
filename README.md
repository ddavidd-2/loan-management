# loan management

### setup 

clone respository

install dependencies
```bash
npm install
```

copy .env file with your postgreSQL db url
```bash
cp .env.example .env
```

run
```bash
opnssl rand -base64 32
```

to generate AUTH_SECRET key


generate initial migration
```bash
npx prisma generate
npx prisma migrate dev --name init
```

and seed the db with example data
```bash
npx prisma db seed
```

### to run 

```bash
npm run dev
```