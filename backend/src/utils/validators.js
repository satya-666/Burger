const normalizeMobileNumber = (value) => String(value || "").trim().replace(/\s+/g, "");

const validateMobileNumber = (value) => /^\+[1-9]\d{7,14}$/.test(value);

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validateProfileImageUrl = (value) => {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch (_error) {
    return false;
  }
};

module.exports = {
  normalizeMobileNumber,
  validateMobileNumber,
  validateEmail,
  validateProfileImageUrl,
};
