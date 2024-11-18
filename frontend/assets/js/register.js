function Login (){
    location.href = '/frontend/pages/Login/login.html'
  }
  
  function register (){
    location.href = '/frontend/pages/Login/register.html'
  }

  
async function registerUser(event) {
    event.preventDefault();
    
    // Validar correo (lo que ya tienes)
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@unibarranquilla\.edu\.co$/;
    
    if (!emailRegex.test(emailValue)) {
      emailError.style.display = "block";
      return;
    } else {
      emailError.style.display = "none";
    }
  
    // Obtener datos del formulario
    const userData = {
      username: document.getElementById("username").value,
      email: emailValue,
      password: document.getElementById("password").value,
      user_type: document.getElementById("user_type").value,
    };
  
    // Enviar solicitud al backend
    try {
      const response = await fetch('http://127.0.0.1:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }