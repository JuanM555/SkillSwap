async function registerUser(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const userType = document.getElementById("user_type").value;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@unibarranquilla\.edu\.co$/;

  if (!emailRegex.test(email)) {
    showModal("Error de Validación", "Por favor, ingresa un correo institucional válido.");
    return;
  }

  const loadingModal = new bootstrap.Modal(document.getElementById("loadingModal"));
  loadingModal.show();

  const data = {
    username,
    email,
    password,
    user_type: userType,
  };

  try {
    const response = await fetch("https://proyecto-bs4m.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Aseguramos que el modal de carga se oculte antes de mostrar la respuesta
    loadingModal.hide();
    // Eliminamos el fondo oscuro del modal de carga
    document.querySelector('.modal-backdrop')?.remove();

    if (response.ok) {
      const result = await response.json();
      showModal("Registro Exitoso", `Usuario registrado: ${result.message}`);
      clearFormFields();
    } else {
      const error = await response.json();
      showModal("Error de Registro", error.message || "Hubo un problema al procesar tu solicitud.");
    }
  } catch (error) {
    console.error("Error:", error);
    // Aseguramos que el modal de carga se oculte en caso de error
    loadingModal.hide();
    document.querySelector('.modal-backdrop')?.remove();
    showModal("Error", "No se pudo conectar al servidor. Por favor, intenta más tarde.");
  }
}

function showModal(title, message) {
  // Eliminamos cualquier fondo oscuro existente primero
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

  // Actualizamos el contenido del modal
  document.getElementById("responseModalLabel").textContent = title;
  document.getElementById("modalMessage").textContent = message;

  // Mostramos el modal de respuesta
  const responseModal = new bootstrap.Modal(document.getElementById("responseModal"));
  responseModal.show();
}

function clearFormFields() {
  document.getElementById("username").value = '';
  document.getElementById("email").value = '';
  document.getElementById("password").value = '';
  document.getElementById("user_type").value = 'estudiante';
}