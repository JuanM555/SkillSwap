
function Login (){
  location.href = '/SkillSwap/pages/auth/login.html'
}

function register (){
  location.href = '/SkillSwap/pages/auth/register.html'
}


async function loginUser(event) {
  event.preventDefault();

  // Obtener datos del formulario
  const loginData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  // Enviar solicitud al backend
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      // Aquí puedes redirigir al usuario o guardar su token de sesión
    } else {
      alert(result.message || 'Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
}