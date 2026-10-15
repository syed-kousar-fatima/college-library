
export function validateEmail(email) {
  const normalizedEmail = String(email || "").trim();

  if (!normalizedEmail) {
    return "Email address is required.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailPattern.test(normalizedEmail)) {
    return "Please enter a valid email address.";
  }

  return "";
}

export function validatePassword(password) {
  const value = String(password || "");

  if (!value) {
    return "Password is required.";
  }

  if (value.length < 8) {
    return "Password must contain at least 8 characters.";
  }

  return "";
}

export function validateStudentId(studentId) {
  const value = String(studentId || "").trim();

  if (!value) {
    return "Student ID is required.";
  }

  if (value.length < 4) {
    return "Please enter a valid student ID.";
  }

  return "";
}

export function validateName(name) {
  const value = String(name || "").trim();

  if (!value) {
    return "Name is required.";
  }

  if (value.length < 2) {
    return "Name must contain at least 2 characters.";
  }

  if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(value)) {
    return "Please enter a valid name.";
  }

  return "";
}

export function validatePhone(phone) {
  const value = String(phone || "").trim();

  if (!value) {
    return "Phone number is required.";
  }

  const digits = value.replace(/\D/g, "");

  if (digits.length < 10 || digits.length > 15) {
    return "Please enter a valid phone number.";
  }

  return "";
}

export function validateMessage(message) {
  const value = String(message || "").trim();

  if (!value) {
    return "Message is required.";
  }

  if (value.length < 10) {
    return "Message must contain at least 10 characters.";
  }

  if (value.length > 1000) {
    return "Message cannot exceed 1000 characters.";
  }

  return "";
}

export function validateLoginForm(values = {}) {
  const errors = {};

  const emailError = validateEmail(values.email);
  const passwordError = validatePassword(values.password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
}

export function validateContactForm(values = {}) {
  const errors = {};

  const nameError = validateName(values.name);
  const emailError = validateEmail(values.email);
  const messageError = validateMessage(values.message);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (messageError) errors.message = messageError;

  if (values.phone && String(values.phone).trim()) {
    const phoneError = validatePhone(values.phone);

    if (phoneError) errors.phone = phoneError;
  }

  return errors;
}

export function isValidForm(errors) {
  return Object.keys(errors).length === 0;
}
