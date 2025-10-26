"use client"

import type React from "react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import styles from "./registration-form.module.css"

interface FormData {
  cityName: string
  organizationName: string
  groupName: string
  direction: string
  nomination: string
  creativeLevel: string
  ageCategory: string
  participantsCount: string
  leaderFullName: string
  concertmasterFullName: string
  contactPhone: string
  email: string
  contactPersonFullName: string
  exactParticipantsCount: string
  competitionNumberName: string
  competitionNumberDuration: string
}

const initialFormData: FormData = {
  cityName: "",
  organizationName: "",
  groupName: "",
  direction: "",
  nomination: "",
  creativeLevel: "",
  ageCategory: "",
  participantsCount: "",
  leaderFullName: "",
  concertmasterFullName: "",
  contactPhone: "",
  email: "",
  contactPersonFullName: "",
  exactParticipantsCount: "",
  competitionNumberName: "",
  competitionNumberDuration: "",
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleClear = () => {
    setFormData(initialFormData)
    toast({
      title: "Форма очищена",
      description: "Все поля формы были очищены",
    })
  }

  const validateForm = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "cityName",
      "groupName",
      "direction",
      "ageCategory",
      "participantsCount",
      "leaderFullName",
      "contactPhone",
      "email",
      "contactPersonFullName",
      "exactParticipantsCount",
      "competitionNumberName",
      "competitionNumberDuration",
    ]

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast({
          title: "Ошибка валидации",
          description: "Пожалуйста, заполните все обязательные поля",
          variant: "destructive",
        })
        return false
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, введите корректный email",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Ошибка при отправке формы")
      }

      toast({
        title: "Успешно!",
        description: "Ваша заявка успешно отправлена",
      })

      handleClear()
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при отправке формы. Попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Регистрация на</h1>
		  <h1 className={styles.title}>фестиваль</h1>
          <p className={styles.subtitle}>Заполните форму, чтобы принять участие в АРТ Грани</p>
        </div>
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit} className={styles.form}>
			{/* City Name */}
			<div className={styles.fieldGroup}>
				<label htmlFor="cityName" className={styles.label}>
				Название города, населенного пункта, региона представляемого коллектива (солиста) *
				</label>
				<input
				id="cityName"
				type="text"
				placeholder="Название вашего города"
				value={formData.cityName}
				onChange={(e) => handleInputChange("cityName", e.target.value)}
				className={styles.input}
				required
				/>
			</div>

			{/* Organization Name */}
			<div className={styles.fieldGroup}>
				<label htmlFor="organizationName" className={styles.label}>
				Полное наименование организации, представляющей творческий коллектив (солиста)
				</label>
				<input
				id="organizationName"
				type="text"
				placeholder="Название организации"
				value={formData.organizationName}
				onChange={(e) => handleInputChange("organizationName", e.target.value)}
				className={styles.input}
				/>
			</div>

			{/* Group Name */}
			<div className={styles.fieldGroup}>
				<label htmlFor="groupName" className={styles.label}>
				Полное название коллектива (студия, ансамбля, Ф.И.О. солиста (ов)) *
				</label>
				<input
				id="groupName"
				type="text"
				placeholder="Название вашей группы"
				value={formData.groupName}
				onChange={(e) => handleInputChange("groupName", e.target.value)}
				className={styles.input}
				required
				/>
			</div>

			{/* Direction */}
			<div className={styles.fieldGroup}>
				<label htmlFor="direction" className={styles.label}>
				Направление *
				</label>
				<select
				id="direction"
				value={formData.direction}
				onChange={(e) => handleInputChange("direction", e.target.value)}
				className={styles.select}
				required
				>
				<option value="">Выберите направление</option>
				<option value="vocal">Вокал</option>
				<option value="choreography">Хореография</option>
				<option value="instrumental">Инструментальное исполнительство</option>
				<option value="theater">Театральное искусство</option>
				<option value="original">Оригинальный жанр</option>
				</select>
			</div>

			{/* Nomination */}
			<div className={styles.fieldGroup}>
				<label htmlFor="nomination" className={styles.label}>
				Номинация
				</label>
				<select
				id="nomination"
				value={formData.nomination}
				onChange={(e) => handleInputChange("nomination", e.target.value)}
				className={styles.select}
				>
				<option value="">Выберите номинацию</option>
				<option value="solo">Соло</option>
				<option value="duet">Дуэт</option>
				<option value="ensemble">Ансамбль</option>
				<option value="group">Группа</option>
				</select>
			</div>

			{/* Creative Level */}
			<div className={styles.fieldGroup}>
				<label htmlFor="creativeLevel" className={styles.label}>
				Уровень творческого номера
				</label>
				<select
				id="creativeLevel"
				value={formData.creativeLevel}
				onChange={(e) => handleInputChange("creativeLevel", e.target.value)}
				className={styles.select}
				>
				<option value="">Выберите уровень</option>
				<option value="beginner">Начинающий</option>
				<option value="intermediate">Средний</option>
				<option value="advanced">Продвинутый</option>
				<option value="professional">Профессиональный</option>
				</select>
			</div>

			{/* Age Category */}
			<div className={styles.fieldGroup}>
				<label htmlFor="ageCategory" className={styles.label}>
				Возрастная категория участников *
				</label>
				<select
				id="ageCategory"
				value={formData.ageCategory}
				onChange={(e) => handleInputChange("ageCategory", e.target.value)}
				className={styles.select}
				required
				>
				<option value="">Выберите возраст</option>
				<option value="5-7">5-7 лет</option>
				<option value="8-10">8-10 лет</option>
				<option value="11-13">11-13 лет</option>
				<option value="14-17">14-17 лет</option>
				<option value="18+">18+ лет</option>
				</select>
			</div>

			{/* Participants Count */}
			<div className={styles.fieldGroup}>
				<label htmlFor="participantsCount" className={styles.label}>
				Количество участников в номере *
				</label>
				<input
				id="participantsCount"
				type="number"
				min="1"
				placeholder="1"
				value={formData.participantsCount}
				onChange={(e) => handleInputChange("participantsCount", e.target.value)}
				className={styles.input}
				required
				/>
			</div>

			{/* Leader Full Name */}
			<div className={styles.fieldGroup}>
				<label htmlFor="leaderFullName" className={styles.label}>
				Ф.И.О. и звания руководителя (ей) творческого коллектива *
				</label>
				<input
				id="leaderFullName"
				type="text"
				placeholder="Ф.И.О. и звания руководителя"
				value={formData.leaderFullName}
				onChange={(e) => handleInputChange("leaderFullName", e.target.value)}
				className={styles.input}
				required
				/>
			</div>

			{/* Concertmaster Full Name */}
			<div className={styles.fieldGroup}>
				<label htmlFor="concertmasterFullName" className={styles.label}>
				Ф.И.О. концертмейстера, ассистента, репетитора и т.д.
				</label>
				<input
				id="concertmasterFullName"
				type="text"
				placeholder="Ф.И.О. концертмейстера"
				value={formData.concertmasterFullName}
				onChange={(e) => handleInputChange("concertmasterFullName", e.target.value)}
				className={styles.input}
				/>
			</div>

			{/* Contact Phone */}
			<div className={styles.fieldGroup}>
				<label htmlFor="contactPhone" className={styles.label}>
				Контактный телефон *
				</label>
				<input
				id="contactPhone"
				type="tel"
				placeholder="+7(999) 999-99-99"
				value={formData.contactPhone}
				onChange={(e) => handleInputChange("contactPhone", e.target.value)}
				className={styles.input}
				required
				/>
			</div>

			{/* Email */}
			<div className={styles.fieldGroup}>
				<label htmlFor="email" className={styles.label}>
				e - mail *
				</label>
				<input
				id="email"
				type="email"
				placeholder="Ваша почта"
				value={formData.email}
				onChange={(e) => handleInputChange("email", e.target.value)}
				className={styles.input}
				required
				/>
			</div>

			{/* Contact Person Full Name */}
			<div className={styles.fieldGroup}>
				<label htmlFor="contactPersonFullName" className={styles.label}>
				Ф.И.О. контактного лица *
				</label>
				<input
				id="contactPersonFullName"
				type="text"
				placeholder="Ф.И.О."
				value={formData.contactPersonFullName}
				onChange={(e) => handleInputChange("contactPersonFullName", e.target.value)}
				className={styles.input}
				required
				/>
			</div>

			{/* Exact Participants Count */}
			<div className={styles.fieldGroup}>
				<label htmlFor="exactParticipantsCount" className={styles.label}>
				Точное количество участников коллектива (1 медаль – 1 ребенок) *
				</label>
				<input
				id="exactParticipantsCount"
				type="number"
				min="1"
				placeholder="1"
				value={formData.exactParticipantsCount}
				onChange={(e) => handleInputChange("exactParticipantsCount", e.target.value)}
				className={styles.input}
				required
				/>
			</div>

			{/* Competition Number Name */}
			<div className={styles.fieldGroup}>
				<label htmlFor="competitionNumberName" className={styles.label}>
				Полное название конкурсного номера *
				</label>
				<input
				id="competitionNumberName"
				type="text"
				placeholder="Название номера"
				value={formData.competitionNumberName}
				onChange={(e) => handleInputChange("competitionNumberName", e.target.value)}
				className={styles.input}
				required
				/>
			</div>

			{/* Competition Number Duration */}
			<div className={styles.fieldGroup}>
				<label htmlFor="competitionNumberDuration" className={styles.label}>
				Хронометраж конкурсного номера *
				</label>
				<input
				id="competitionNumberDuration"
				type="text"
				placeholder="Длительность номера"
				value={formData.competitionNumberDuration}
				onChange={(e) => handleInputChange("competitionNumberDuration", e.target.value)}
				className={styles.input}
				required
				/>
			</div>

			{/* Note */}
			<div className={styles.note}>
				Ф.И. участников для именного диплома (отправляется в электронном формате на почту)
			</div>

			{/* Buttons */}
			<div className={styles.buttonGroup}>
				<button type="submit" disabled={isSubmitting} className={styles.submitButton}>
				{isSubmitting ? "Отправка..." : "Отправить заявку"}
				</button>
				<button type="button" onClick={handleClear} className={styles.clearButton}>
				Очистить
				</button>
			</div>

			<p className={styles.requiredNote}>* Обязательные поля</p>
			</form>
		</div>
      </div>
      <Toaster />
    </>
  )
}
