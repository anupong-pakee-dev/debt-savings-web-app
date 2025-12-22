## Debt & Savings Web App
#### A modern financial tracking web application built with Next.js 16.1.0, Prisma ORM, and PostgreSQL. This app helps users manage debts, savings goals, transactions, and provides clean, real-time dashboards.

## Tech Stack
| Layer      | Technology                                                   |
| ---------- | ------------------------------------------------------------ |
| Frontend   | Next.js 16.1.0 (App Router)                                 |
| Backend    | Next.js API routes                                           |
| ORM        | Prisma                                                       |
| Database   | PostgreSQL                                                   |
| Auth       | JWT                                                          |
| Styling    | Tailwind CSS                                                 |
| Deployment | Vercel                                                       |

## Features
* Add, edit, delete debts
* Add, edit, delete savings goals
* Track transactions (income & expenses)
* Dashboard with summaries and charts
* PostgreSQL database with Prisma ORM
* API routes for financial CRUD operations
* Responsive UI

## Installation & Setup
#### 1. Clone the repository
```bash
git clone https://github.com/anupong-pakee-dev/debt-savings-web-app &&
cd debt-savings-app
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Create .env file
```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/yourdb"
NEXT_PUBLIC_APP_NAME="Debt & Savings Web App"
```

#### 4. Run Prisma migrations
```bash
npx prisma migrate dev
```
###### To view Prisma Studio:
```bash
npx prisma studio
```

#### 5. Start the development server
```bash
npm run dev
```
###### Your app will be running at:
```bash
http://localhost:3000
```

## Project Structure
```bash
/
├── app/
│   ├── dashboard/
│   ├── debts/
│   ├── savings/
│   └── api/
├── prisma/
│   └── schema.prisma
├── public/
├── package.json
└── README.md
```

## Scripts
| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npm run dev`            | Start development server |
| `npm run build`          | Create production build  |
| `npm start`              | Run production server    |
| `npx prisma migrate dev` | Apply DB migrations      |
| `npx prisma generate`    | Generate Prisma client   |


## License
### MIT License © 2025