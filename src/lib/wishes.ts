import postgres from "postgres";

export type Wish = {
  id: string;
  name: string;
  message: string;
  attendance: "hadir" | "ragu" | "tidak";
  createdAt: string;
};

type WishRow = {
  id: string;
  name: string;
  message: string;
  attendance: Wish["attendance"];
  created_at: string;
};

// Neon's pooler ends idle connections on its own; a global keeps hot reload and
// route reloads from opening a new pool for every request.
const globalForDb = globalThis as unknown as { sql?: postgres.Sql };

function connect(): postgres.Sql {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return postgres(url, { max: 5, idle_timeout: 20, connect_timeout: 10 });
}

export function db(): postgres.Sql {
  const sql = globalForDb.sql ?? connect();
  globalForDb.sql = sql;
  return sql;
}

// Created on first use so a fresh database needs no migration step. The result
// is recorded per sql instance: the shared pool runs this once, and a dropped
// instance starts over. Inside a transaction so concurrent first callers cannot
// see a half-built schema.
const ready = new WeakMap<postgres.Sql, Promise<void>>();

function ensureSchema(sql: postgres.Sql): Promise<void> {
  let pending = ready.get(sql);
  if (!pending) {
    pending = sql
      .begin(async (tx) => {
        await tx`
          create table if not exists wishes (
            id uuid primary key,
            name text not null,
            message text not null,
            attendance text not null default 'hadir',
            created_at timestamptz not null default now()
          )
        `;
        await tx`create index if not exists wishes_created_at_idx on wishes (created_at desc)`;
      })
      .then(() => undefined);
    ready.set(sql, pending);
  }
  return pending;
}

export async function getWishes(): Promise<Wish[]> {
  const sql = db();
  await ensureSchema(sql);
  const rows = await sql<WishRow[]>`
    select id, name, message, attendance, created_at from wishes
    order by created_at desc
  `;
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    message: row.message,
    attendance: row.attendance,
    createdAt: row.created_at,
  }));
}

// `createdAt` comes from the stamp taken inside the insert so the guest sees
// their own wish at the top even when the device clock is off.
export async function addWish(wish: Omit<Wish, "createdAt">): Promise<Wish> {
  const sql = db();
  await ensureSchema(sql);
  const [row] = await sql<WishRow[]>`
    insert into wishes (id, name, message, attendance)
    values (${wish.id}, ${wish.name}, ${wish.message}, ${wish.attendance})
    returning id, name, message, attendance, created_at
  `;
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    attendance: row.attendance,
    createdAt: row.created_at,
  };
}
