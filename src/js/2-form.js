const STORAGE_KEY = "feedback-form-state";

const formData = {
  email: "",
  message: ""
};

const form = document.querySelector(".feedback-form");

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || "";
      formData.message = parsedData.message || "";

      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error("Помилка при читанні даних з localStorage:", error);
    }
  }
}

form.addEventListener("input", event => {
  const target = event.target;
  if (target.name === "email" || target.name === "message") {
    formData[target.name] = target.value.trim();
    saveToLocalStorage();
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();

  if (formData.email === "" || formData.message === "") {
    alert("Fill please all fields");
    return;
  }

  console.log("Відправлені дані форми:", formData);

  localStorage.removeItem(STORAGE_KEY);
  formData.email = "";
  formData.message = "";
  form.reset();
});

populateForm();
