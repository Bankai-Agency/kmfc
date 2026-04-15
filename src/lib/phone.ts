/**
 * Маска казахстанского номера: +7 (XXX) XXX-XX-XX
 *
 * Преобразует произвольный ввод в отформатированную строку.
 * Принимает "87071234567", "+77071234567", "7071234567" и т.п.
 */
export function formatPhoneKz(raw: string): string {
  // Оставляем только цифры
  let digits = raw.replace(/\D/g, "");

  // "8" в начале → "7" (казахстанская практика)
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);

  // Убираем ведущую "7" — добавим "+7" вручную
  if (digits.startsWith("7")) digits = digits.slice(1);

  // Максимум 10 цифр после +7
  digits = digits.slice(0, 10);

  if (digits.length === 0) return "";

  let result = "+7";
  if (digits.length > 0) result += " (" + digits.slice(0, 3);
  if (digits.length >= 3) result += ")";
  if (digits.length >= 4) result += " " + digits.slice(3, 6);
  if (digits.length >= 7) result += "-" + digits.slice(6, 8);
  if (digits.length >= 9) result += "-" + digits.slice(8, 10);

  return result;
}

/**
 * Возвращает только цифры из отформатированного номера.
 * Для отправки в API / бэкенд.
 */
export function stripPhoneToDigits(formatted: string): string {
  return formatted.replace(/\D/g, "");
}

/**
 * Валидация казахстанского номера — должно быть 11 цифр и префикс 7.
 */
export function isValidKzPhone(formatted: string): boolean {
  const digits = stripPhoneToDigits(formatted);
  return digits.length === 11 && digits.startsWith("7");
}
