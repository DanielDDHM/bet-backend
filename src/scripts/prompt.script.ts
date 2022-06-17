import 'dotenv/config';

export default function () {
  console.log(`DB IN USE:`, process.env.DATABASE_URL);
  console.log(`ACTUAL ENV IS`, process.env.NODE_ENV);
  console.log('WELCOME', String(process.env.USER).toUpperCase() || process.env.NAME || 'USER')
  console.log(`FOR ACCESS DOCS, ENTER ON http://localhost:${process.env.PORT || 3000}/api-docs`)
}
