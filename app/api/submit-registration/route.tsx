import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

	// 1) Метаданные согласия
    const id = crypto.randomBytes(4).toString("hex").toUpperCase() // например "9F3A1B2C"
	const now = new Date()
    const formattedDate = now
      .toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
      .replace(",", "")
      .replace(/\./g, "-")
    // const timestamp = new Date().toISOString()


    // 2) Получаем IP и user-agent (зависит от хостинга; используем заголовки)
    const ip =
      (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

	// 3) Политика — файл в /public
    const policyRelative = "https://www.rusart.online/privacy.pdf" // путь, который доступен в браузере
    const policyFsPath = path.join(process.cwd(), "public", "privacy.pdf")

	// Если файл не существует — обработать gracefully
    let policyHash = "missing"
    try {
      const buf = fs.readFileSync(policyFsPath)
      policyHash = crypto.createHash("sha256").update(buf).digest("hex")
    } catch (err) {
      console.warn("Policy file not found:", policyFsPath)
    }


	// 4) Сформируем запись согласия, которую сохраним
    const consentRecord = {
      id,
      formattedDate,
      ip,
      userAgent,
      policyUrl: policyRelative,
      policyHash,
      formSummary: {
        cityName: formData.cityName,
        groupName: formData.groupName,
        contactPhone: formData.contactPhone,
        email: formData.email,
        exactParticipantsCount: formData.exactParticipantsCount,
      },
      privacyAgree: !!formData.privacyAgree,
    }

	// 5) Подпись записи (HMAC) — хранить secret в env
    const signSecret = process.env.CONSENT_SIGN_SECRET || "fallback-secret"
    const hmac = crypto
      .createHmac("sha256", signSecret)
      .update(JSON.stringify(consentRecord))
      .digest("hex")
	
	// // 6) Сохраняем запись локально (тут пример — append в файл JSONL). Лучше — БД!
    // const logLine = JSON.stringify({ consentRecord, signature: hmac }) + "\n"
    // const logPath = path.join(process.cwd(), "consent-log.jsonl")
    // fs.appendFileSync(logPath, logLine)

    // Заголовок письма
    const subject = `Новая заявка на регистрацию #${id} — ${formattedDate}`
	const html = `
      <h2>Новая заявка на регистрацию — ID ${id}</h2>
      <p><strong>Дата:</strong> ${formattedDate}</p>
      <p><strong>ID:</strong> ${id}</p>
      <hr/>
      <h3>Данные заявки</h3>
      <h2>Новая заявка на регистрацию</h2>
      <p><strong>Город:</strong> ${formData.cityName}</p>
      <p><strong>Организация:</strong> ${formData.organizationName}</p>
      <p><strong>Название коллектива:</strong> ${formData.groupName}</p>
      <p><strong>Направление:</strong> ${formData.direction}</p>
      <p><strong>Номинация:</strong> ${formData.nomination}</p>
      <p><strong>Уровень:</strong> ${formData.creativeLevel}</p>
      <p><strong>Возрастная категория:</strong> ${formData.ageCategory}</p>
      <p><strong>Количество участников:</strong> ${formData.participantsCount}</p>
      <p><strong>Руководитель:</strong> ${formData.leaderFullName}</p>
      <p><strong>Концертмейстер:</strong> ${formData.concertmasterFullName}</p>
      <p><strong>Телефон:</strong> ${formData.contactPhone}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Контактное лицо:</strong> ${formData.contactPersonFullName}</p>
      <p><strong>Точное количество участников:</strong> ${formData.exactParticipantsCount}</p>
      <p><strong>Название номера:</strong> ${formData.competitionNumberName}</p>
      <p><strong>Хронометраж:</strong> ${formData.competitionNumberDuration}</p>
	  <p><strong>AccountTG:</strong> ${formData.AccountTG}</p>
	  <p><strong>AccountMaks:</strong> ${formData.AccountMax}</p>

      <hr/>
      <h3>Подтверждение согласия</h3>
      <p><strong>Согласие с политикой:</strong> ${consentRecord.privacyAgree ? "Да" : "Нет"}</p>
      <p><strong>IP:</strong> ${ip}</p>
      <p><strong>User-Agent:</strong> ${userAgent}</p>
      <p><strong>Policy URL:</strong> <a href="${policyRelative}">privacy.pdf</a></p>
      <p><strong>Policy SHA256:</strong> ${policyHash}</p>
      <p><strong>Record signature (HMAC):</strong> <code>${hmac}</code></p>
    `

    // Send email
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "artgrani.online <dentasher77@gmail.com>",
        to: process.env.RECIPIENT_EMAIL || "rusart25@list.ru",
        subject,
        html,
      }),
    })

    if (!emailResponse.ok) {
      console.error("Email sending failed:", await emailResponse.text())
    }

    // Add to Google Sheets
    const sheetsResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}/values/Sheet1:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GOOGLE_SHEETS_API_KEY}`,
        },
        body: JSON.stringify({
          values: [
            [
              new Date().toISOString(),
              formData.cityName,
              formData.organizationName,
              formData.groupName,
              formData.direction,
              formData.nomination,
              formData.creativeLevel,
              formData.ageCategory,
              formData.participantsCount,
              formData.leaderFullName,
              formData.concertmasterFullName,
              formData.contactPhone,
              formData.email,
              formData.contactPersonFullName,
              formData.exactParticipantsCount,
              formData.competitionNumberName,
              formData.competitionNumberDuration,
			  formData.AccountTG,
			  formData.AccountMax
            ],
          ],
        }),
      },
    )

    if (!sheetsResponse.ok) {
      console.error("Google Sheets update failed:", await sheetsResponse.text())
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing registration:", error)
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 })
  }
}
