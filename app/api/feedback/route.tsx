// app/api/feedback/route.ts
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Генерация ID/времени для письма
    const id = crypto.randomBytes(4).toString("hex").toUpperCase() // например "9F3A1B2C"
	const now = new Date()
	const formattedDate = now
	  .toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
	  .replace(",", "")
	  .replace(/\./g, "-")

    // Формируем subject отличающийся от регистрационных писем
    const subject = `Обратная сзвязь #${id} — ${formattedDate}`

    const html = `
      <h2>Новое сообщение с формы обратной связи — ID ${id}</h2>
      <p><strong>Дата:</strong> ${formattedDate}</p>
      <hr/>
      <p><strong>Имя:</strong> ${escapeHtml(name || "-")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || "-")}</p>
      <p><strong>Сообщение:</strong></p>
      <p>${escapeHtml(message || "-").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>Ответ отправить на: <a href="mailto:${escapeHtml(email || "")}">${escapeHtml(email || "")}</a></p>
    `

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "artgrani.online <artgrani@resend.dev>",
        to: process.env.RECIPIENT_EMAIL || "dentasher77@gmail.com",
        subject,
        html,
      }),
    })

    if (!resendRes.ok) {
      const txt = await resendRes.text()
      console.error("Resend error:", txt)
      return NextResponse.json({ success: false, error: "email send failed", details: txt }, { status: 500 })
    }

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "server error" }, { status: 500 })
  }
}

// Простая защита от XSS в теле письма
function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
