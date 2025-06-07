# loan management

### setup 

clone respository

install dependencies
```bash
npm install
```

copy .env file with your prisma postgreSQL db url
```bash
cp .env.example .env
```

run to generate initial prisma migration
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

the seeded data contains the login username: jdoe, password: password