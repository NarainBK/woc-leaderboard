# Winter of Code Leaderboard

This repository contains the code-base to the LIVE leaderboard for ACM@Amrita
Winter of Code (season 1). 

### Tech Stack
- The application is written in **Next.js** on top of **TypeScript**. The 
framework was chosen as it happened to be the most comfortable one at the disposal
of the developers at that time of writing.
- We use a **PostgreSQL** database hosted on **NeonDB** for quick setup and 
serverless hosting. The database automatically scaled down to an *IDLE* or *sleep*
state with 5 minutes of inactivity. This allows us to save up on our bills. 
- Interestingly, you can run a 0.25vCPU Neon Serverless Postgres instance for 
every month, absolutely free of cost. (191 hours)
- In order to interact with the database, we have written our schema in **Prisma**
which is an ORM that integrates easily with SQL and manages connection pooling 
by itself. It also allows us to write type-safe queries without the fear of 
common vulnerabilites like SQL-injection.

> [!NOTE]
> This repository does not have any `POST/` endpoint and only serves the 
leaderboard and the individual profile. Data mutations in the database take 
place through separate functions which are deployed on **Cloudflare Workers**. 
That repository has been kept private for security reasons.

### Setup steps
1. Fork and clone your fork of the repository
2. Use `pnpm` to install all the `node_modules`
3. Provision a PostgreSQL database, either from Docker or Neon.
4. Setup the `.env` file by copying the `.env.example` and populating the required
credentials.
5. Run the project with `pnpm dev`

> [!TIP]
> Do setup the `NODE_ENVIRONMENT` variable to `Development` so that the database 
seeding can take place from `prisma/seed.ts`. You can add further records into 
the seeds for testing purposes but do not commit it upstream.

### Contribution Guidelines
- Write descriptive git commit messages.
- Write descriptions in pull requests for quicker merging.

### Authors
- [Kiran Rajeev KV](https://github.com/KiranRajeev-KV)
- [Vijay SB](https://github.com/vijaysb0613)
- [Ritesh Koushik](https://github.com/IAmRiteshKoushik/)

> For any queries, please reach out to us at our socials or through email.
