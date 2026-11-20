import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import path from "node:path";

export type Wish = {
  id: string;
  name: string;
  message: string;
  attendance: "hadir" | "ragu" | "tidak";
  createdAt: string;
};

const MAX_WISHES = 500;
const file = path.join(process.cwd(), "data", "wishes.json");

let queue: Promise<unknown> = Promise.resolve();

async function load(): Promise<Wish[]> {
  try {
    const raw = await readFile(file, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return isWishList(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function isWishList(value: unknown): value is Wish[] {
  return (
    Array.isArray(value) &&
    value.every(
      (w) =>
        !!w &&
        typeof w === "object" &&
        "id" in w &&
        typeof w.id === "string" &&
        "name" in w &&
        typeof w.name === "string" &&
        "message" in w &&
        typeof w.message === "string",
    )
  );
}

export async function getWishes(): Promise<Wish[]> {
  const wishes = await load();
  return wishes.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addWish(wish: Wish): Promise<Wish[]> {
  const run = queue.then(async () => {
    const wishes = await load();
    if (wishes.length >= MAX_WISHES) {
      throw new Error("full");
    }
    wishes.push(wish);
    await mkdir(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    await writeFile(tmp, JSON.stringify(wishes, null, 2), "utf8");
    await rename(tmp, file);
    return wishes;
  });
  queue = run.catch(() => undefined);
  await run;
  return getWishes();
}
