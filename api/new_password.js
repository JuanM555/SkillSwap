
async function handlePasswordRecovery(event) {
    event.preventDefault(); // Prevenir envío por defecto del formulario
    const email = document.getElementById("email").value.trim();

    // Verificar que el correo sea válido
    const emailRegex = /^[a-zA-Z0-9._%+-]+@unibarranquilla\.edu\.co$/;
    if (!emailRegex.test(email)) {
    showModal("Error", "Por favor, ingresa un correo institucional válido.");
    return;
    }

    // Mostrar el modal de carga (si tienes uno)
    showLoadingModal(true);

    try {
    // Enviar solicitud al servidor para verificar si el correo existe
    const response = await fetch("https://proyecto-bs4m.onrender.com/verify-email", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
    });

    const result = await response.json();

    if (response.ok) {
        // Si el correo existe, enviar el correo para restablecer la contraseña
        showModal("Correo Enviado", `Te hemos enviado un correo con instrucciones para restablecer tu contraseña a: ${email}`);
    } else {
        // Si no existe, mostrar error
        showModal("Error", result.message || "No se ha encontrado este correo.");
    }
    } catch (error) {
    console.error("Error:", error);
    showModal("Error", "Hubo un problema al intentar recuperar la contraseña. Por favor, intenta más tarde.");
    } finally {
    showLoadingModal(false);
    }
}

function showModal(title, message) {
    const modal = new bootstrap.Modal(document.getElementById("responseModal"));
    document.getElementById("responseModalLabel").textContent = title;
    document.getElementById("modalMessage").textContent = message;
    modal.show();
}

function showLoadingModal(show) {
    const loadingModal = new bootstrap.Modal(document.getElementById("loadingModal"));
    if (show) {
    loadingModal.show();
    } else {
    loadingModal.hide();
    }
}
