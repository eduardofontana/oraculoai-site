import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SOC_API_URL = "https://2.25.175.161/api";

const SCANNER_PATTERNS = [
  /(sqlmap|nuclei|nikto|masscan|zgrab|acunetix|nessus|openvas|wpscan|netsparker)/i,
  /(python-requests|go-http-client|java\/[\d.]+|ruby|perl|libwww)/i,
];

const SUSPICIOUS_PATHS = [
  /\.env/i, /\.git/i, /\.svn/i, /wp-admin/i, /wp-login/i,
  /admin/i, /administrator/i, /config/i, /backup/i,
  /\.sql/i, /\.bak/i, /\.old/i, /\.swp/i, /\.config/i,
  /phpmyadmin/i, /phpPgAdmin/i, /console/i,
];

const SQLI_PATTERNS = [
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
  /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
  /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
];

const XSS_PATTERNS = [
  /((\%3C)|<)((\%2F)|\/)*[a-z0-9\%]+((\%3E)|>)/i,
  /((\%3C)|<)[^\n]+((\%3E)|>)/i,
  /on\w+\s*=\s*(['"]).*\1/i,
  /<script/i, /javascript:/i, /onerror/i, /onload/i,
];

function classifyRequest(request: NextRequest): { threatType: string; score: number } | null {
  const url = request.nextUrl.pathname + request.nextUrl.search;
  const ua = request.headers.get("user-agent") || "";
  const method = request.method;

  if (SCANNER_PATTERNS.some((p) => p.test(ua))) {
    return { threatType: "scanner_detected", score: 60 };
  }

  if (SUSPICIOUS_PATHS.some((p) => p.test(url))) {
    const severity = /\.env|\.git\/config|admin/.test(url) ? 80 : 40;
    return { threatType: severity >= 80 ? "env_scan" : "admin_scan", score: severity };
  }

  if (SQLI_PATTERNS.some((p) => p.test(url))) {
    return { threatType: "sqli_attempt", score: 90 };
  }

  if (XSS_PATTERNS.some((p) => p.test(url))) {
    return { threatType: "xss_attempt", score: 85 };
  }

  if (method !== "GET" && method !== "POST" && method !== "OPTIONS") {
    return { threatType: "suspicious_request", score: 30 };
  }

  return null;
}

async function sendEventToSOC(event: any) {
  try {
    await fetch(`${SOC_API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.SOC_API_KEY || "",
      },
      body: JSON.stringify(event),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // SOC offline, don't block the request
  }
}

export function middleware(request: NextRequest) {
  const classification = classifyRequest(request);

  if (classification) {
    const event = {
      ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") ||
          "0.0.0.0",
      path: request.nextUrl.pathname + request.nextUrl.search,
      method: request.method,
      userAgent: request.headers.get("user-agent") || "",
      referer: request.headers.get("referer") || "",
      threatType: classification.threatType,
      score: classification.score,
      rawHeaders: Object.fromEntries(request.headers.entries()),
      source: "vercel",
    };

    sendEventToSOC(event);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
