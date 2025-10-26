import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Send email
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Festival Registration <onboarding@resend.dev>",
        to: process.env.RECIPIENT_EMAIL || "dentasher77@gmail.com",
        subject: "Новая заявка на фестиваль",
        html: `
            <h2>Новая заявка на регистрацию</h2>
            <p><strong>Город:</strong> ${formData.cityName}</p>
            <p><strong>Организация:</strong> ${formData.organizationName}</p>
            <p><strong>Название группы:</strong> ${formData.groupName}</p>
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
          `,
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
