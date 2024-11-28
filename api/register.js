async function registerUser(event) {
    event.preventDefault(); // Evita el envío del formulario
  
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const userType = document.getElementById("user_type").value;
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@unibarranquilla\.edu\.co$/;
  
    if (!emailRegex.test(email)) {
      showModal("Error de Validación", "Por favor, ingresa un correo institucional válido.");
      return;
    }
  
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
  
      if (response.ok) {
        const result = await response.json();
        showModal("Registro Exitoso", `Usuario registrado: ${result.message}`);
      } else {
        const error = await response.json();
        showModal("Error de Registro", error.message || "Hubo un problema al procesar tu solicitud.");
      }
    } catch (error) {
      console.error("Error:", error);
      showModal("Error", "No se pudo conectar al servidor. Por favor, intenta más tarde.");
    }
  }
  
  function showModal(title, message) {
    // Actualiza contenido del modal
    document.getElementById("responseModalLabel").textContent = title;
    document.getElementById("modalMessage").textContent = message;
  
    // Muestra el modal
    const modal = new bootstrap.Modal(document.getElementById("responseModal"));
    modal.show();
  }
  
  function Login() {
    window.location.href = "/SkillSwap/pages/auth/login.html";
  }
  
