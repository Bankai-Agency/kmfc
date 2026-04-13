import { NextRequest, NextResponse } from "next/server";

/* ---------- rate limiter (in-memory, resets on deploy) ---------- */
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window per IP

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Periodically prune stale entries so the Map doesn't grow unbounded
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((entry, ip) => {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  });
}, RATE_LIMIT_WINDOW_MS * 5);

/* ---------- collateral labels ---------- */
const COLLATERAL_LABELS: Record<string, string> = {
  nedvizhimost: "Недвижимость",
  "zemelnyj-uchastok": "Земельный участок",
  avto: "Автомобиль",
  spectehnika: "Спецтехника",
};

/* ---------- helpers ---------- */
function formatAmount(amount: number): string {
  return new Intl.NumberFormat("ru-KZ", { style: "currency", currency: "KZT", maximumFractionDigits: 0 }).format(amount);
}

function buildTelegramMessage(data: {
  name: string;
  phone: string;
  collateral_type?: string;
  amount?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  source?: string;
}): string {
  const lines: string[] = [
    "\u{1F4E9} <b>Новая заявка с сайта KMFC</b>",
    "",
    `\u{1F464} <b>Имя:</b> ${escapeHtml(data.name)}`,
    `\u{1F4F1} <b>Телефон:</b> ${escapeHtml(data.phone)}`,
  ];

  if (data.collateral_type && COLLATERAL_LABELS[data.collateral_type]) {
    lines.push(`\u{1F3E0} <b>Залог:</b> ${COLLATERAL_LABELS[data.collateral_type]}`);
  }

  if (data.amount) {
    lines.push(`\u{1F4B0} <b>Сумма:</b> ${formatAmount(data.amount)}`);
  }

  if (data.source) {
    lines.push(`\u{1F310} <b>Страница:</b> ${escapeHtml(data.source)}`);
  }

  // UTM block
  const utmParts: string[] = [];
  if (data.utm_source) utmParts.push(`source=${data.utm_source}`);
  if (data.utm_medium) utmParts.push(`medium=${data.utm_medium}`);
  if (data.utm_campaign) utmParts.push(`campaign=${data.utm_campaign}`);
  if (data.utm_content) utmParts.push(`content=${data.utm_content}`);
  if (data.utm_term) utmParts.push(`term=${data.utm_term}`);

  if (utmParts.length > 0) {
    lines.push("");
    lines.push(`\u{1F4CA} <b>UTM:</b> ${escapeHtml(utmParts.join(" | "))}`);
  }

  lines.push("");
  lines.push(`\u{1F552} ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}`);

  return lines.join("\n");
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ---------- POST handler ---------- */
export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Слишком много запросов. Попробуйте через минуту." }, { status: 429 });
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный формат данных." }, { status: 400 });
  }

  // Validate required fields
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  if (!name || !phone) {
    return NextResponse.json({ error: "Имя и телефон обязательны." }, { status: 400 });
  }

  if (name.length > 100 || phone.length > 30) {
    return NextResponse.json({ error: "Превышена максимальная длина полей." }, { status: 400 });
  }

  // Build message
  const message = buildTelegramMessage({
    name,
    phone,
    collateral_type: typeof body.collateral_type === "string" ? body.collateral_type : undefined,
    amount: typeof body.amount === "number" ? body.amount : undefined,
    utm_source: typeof body.utm_source === "string" ? body.utm_source : undefined,
    utm_medium: typeof body.utm_medium === "string" ? body.utm_medium : undefined,
    utm_campaign: typeof body.utm_campaign === "string" ? body.utm_campaign : undefined,
    utm_content: typeof body.utm_content === "string" ? body.utm_content : undefined,
    utm_term: typeof body.utm_term === "string" ? body.utm_term : undefined,
    source: typeof body.source === "string" ? body.source : undefined,
  });

  // Send to Telegram
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("[KMFC Lead] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set. Lead captured but not forwarded:", { name, phone });
    return NextResponse.json({ success: true });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("[KMFC Lead] Telegram API error:", res.status, errorBody);
      // Still return success to the user - we don't want a Telegram glitch to block conversions
      return NextResponse.json({ success: true });
    }
  } catch (err) {
    console.error("[KMFC Lead] Failed to send to Telegram:", err);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}
