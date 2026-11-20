import { icsFile, invitation } from "@/lib/invitation";

export function GET() {
  return new Response(icsFile(invitation), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="aqiqah-khitanan.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
