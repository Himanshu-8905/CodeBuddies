import toast from "react-hot-toast";

export function filterUniqueUsers(data) {
  const seenUsers = new Set();
  const filteredData = [];

  for (const item of data) {
    if (!seenUsers.has(item.userId)) {
      seenUsers.add(item.userId);
      filteredData.push(item);
    }
  }

  return filteredData;
}

export async function writeClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(
      "Successfully copied room URL. Now, you can invite peers to this room."
    );
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to copy. You can copy from the address bar also.");
  }
}

export const debounce = (func, waitFor) => {
  let timeout = null;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, waitFor);
  };
};

export function getLocalStorage(key) {
  try {
    const serializedCode = localStorage.getItem(key);
    if (serializedCode) {
      return JSON.parse(serializedCode);
    }
  } catch (error) {
    console.error("Error retrieving code from local storage:", error);
  }
  return null;
}

export function setLocalStorage(key, code) {
  try {
    localStorage.setItem(key, JSON.stringify(code));
  } catch (error) {
    console.error("Error storing code to local storage:", error);
  }
}

export function deleteLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error deleting code from local storage:", error);
  }
}

export function validateName(name) {
  const regex = /^[A-Za-z ]{2,30}$/;
  const trimmedName = name.trim();

  if (trimmedName.length <= 2 || trimmedName.length > 30) {
    return { verified: false, err: "Name must contain min 2 and max 30 chars" };
  }

  if (!regex.test(trimmedName)) {
    return {
      verified: false,
      err: "Name must contain only alphabetical characters.",
    };
  }

  return { verified: true, err: "" };
}

