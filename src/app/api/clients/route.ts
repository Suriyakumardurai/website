import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const SECRET_PASSPHRASE = "SuriyaJee@2024";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.passphrase !== SECRET_PASSPHRASE) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const snapshot = await adminDb
      .collection("contactSubmissions")
      .orderBy("createdAt", "desc")
      .get();

    const clients = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
    }));

    return NextResponse.json({ ok: true, clients });
  } catch (error) {
    console.error("Clients API error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
