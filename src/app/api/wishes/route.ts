import { addWish, getWishes, type Wish } from "@/lib/wishes";
import { sectionShown } from "@/lib/invitation";
import { randomUUID } from "node:crypto";

const nameLimit = 60;
const messageLimit = 400;
const attendanceValues: Record<string, true> = { hadir: true, ragu: true, tidak: true };

function clean(value: unknown, limit: number): string {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, limit)
    : "";
}

export async function GET() {
  if (!sectionShown('wishes')) return Response.json({ wishes: [] });
  const wishes = await getWishes();
  return Response.json({
    wishes: wishes.map(({ id, name, message, attendance, createdAt }) => ({
      id,
      name,
      message,
      attendance,
      createdAt,
    })),
  });
}

export async function POST(request: Request) {
  if (!sectionShown('wishes')) {
    return Response.json({ error: "Form doa sedang ditutup." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Format kiriman tidak dikenali." }, { status: 400 });
  }

  const raw = typeof body === "object" && body !== null ? body : {};
  const name = clean("name" in raw ? raw.name : "", nameLimit);
  const message = clean("message" in raw ? raw.message : "", messageLimit);
  const attendanceRaw = "attendance" in raw ? raw.attendance : "hadir";
  const attendance = typeof attendanceRaw === "string" && attendanceValues[attendanceRaw] === true
    ? (attendanceRaw as Wish["attendance"])
    : "hadir";

  // Honeypot: real guests never fill this hidden field; bots usually do.
  const trap = "website" in raw ? raw.website : "";
  if (typeof trap === "string" && trap.length > 0) {
    return Response.json({ wish: { id: randomUUID(), name, message, attendance, createdAt: new Date().toISOString() } }, { status: 201 });
  }

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Tulis namamu, minimal 2 huruf.";
  if (message.length < 3) errors.message = "Tulis doa atau harapanmu untuk si kecil.";
  if (Object.keys(errors).length) {
    return Response.json({ error: "Ada isian yang belum lengkap.", errors }, { status: 422 });
  }

  const wish: Wish = {
    id: randomUUID(),
    name,
    message,
    attendance,
    createdAt: new Date().toISOString(),
  };

  try {
    await addWish(wish);
  } catch {
    return Response.json(
      { error: "Doa belum tersimpan karena buku doa sudah penuh. Coba lagi nanti." },
      { status: 503 },
    );
  }

  return Response.json({ wish }, { status: 201 });
}
