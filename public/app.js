/*/document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    alert(data.message);
});
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login exitoso');
        window.location.href = 'profile.html';
    } else {
        alert(data.message);
    }
});/*/
/*/document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
        window.location.href = 'profile.html';
    } else {
        alert(data.message);
    }
});
/*/



document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    const messageDiv = document.getElementById('message');

    if (response.ok) {
        // Mensaje de éxito
        messageDiv.textContent = 'Account created successfully! Redirecting...';
        messageDiv.className = 'message-popup success'; // Clase para estilo de éxito
        messageDiv.style.display = 'block';

        // Redirigir después de 3 segundos
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirige al login
        }, 3000);
    } else {
        // Mensaje de error
        messageDiv.textContent = data.message || 'Registration failed. Please try again.';
        messageDiv.className = 'message-popup error'; // Clase para estilo de error
        messageDiv.style.display = 'block';
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que la página se recargue
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        const messageDiv = document.getElementById('login-message');

        if (response.ok) {
            // Mostrar mensaje de éxito
            messageDiv.textContent = 'Login successful. Welcome!';
            messageDiv.className = 'message-popup success';
            messageDiv.style.display = 'block';

            // Redirigir después de 3 segundos
            setTimeout(() => {
                window.location.href = 'user.html'; // Asegúrate de que esta página exista
            }, 3000);
        } else {
            // Mostrar mensaje de error
            messageDiv.textContent = data.message || 'Incorrect username or password. Try again.';
            messageDiv.className = 'message-popup error';
            messageDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error en el login:', error);
    }
});
