// Obtener el parámetro 'status' de la URL
const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get('status');

// Referencias a los elementos
const statusIcon = document.getElementById('status-icon');
const statusTitle = document.getElementById('status-title');
const statusMessage = document.getElementById('status-message');
const actionButton = document.getElementById('action-button');

// Configurar mensaje según el estado
if (status === 'success') {
  statusIcon.classList.add('bi-check-circle-fill', 'text-success');
  statusTitle.textContent = '¡Verificación Exitosa!';
  statusMessage.textContent = 'Gracias por verificar tu correo electrónico. Ahora puedes disfrutar de todos los beneficios de SkillSwap.';
  actionButton.style.display = 'block'; // Mostrar el botón de iniciar sesión
} else {
  statusIcon.classList.add('bi-exclamation-triangle-fill', 'text-danger');
  statusTitle.textContent = '¡Error de Verificación!';
  statusMessage.textContent = 'Hubo un problema con la verificación de tu correo. Por favor, intenta nuevamente.';
  actionButton.style.display = 'none'; // Ocultar el botón
}