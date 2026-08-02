document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.querySelector('.text');
    const passwordInput = document.querySelector('.password');
    const loginButton = document.querySelector('.login');
    const resetButton = document.querySelector('.reset');

    const statusColors = {
        success: '#064',
        error: '#900',
        info: '#333'
    };

    function showStatus(message, type = 'info') {
        let status = document.querySelector('#form-status');
        if (!status) {
            status = document.createElement('div');
            status.id = 'form-status';
            status.style.marginTop = '15px';
            status.style.fontWeight = '700';
            status.style.fontSize = '0.95rem';
            const parent = document.querySelector('.parent');
            parent.appendChild(status);
        }
        status.textContent = message;
        status.style.color = statusColors[type] || statusColors.info;
    }

    function clearStatus() {
        const status = document.querySelector('#form-status');
        if (status) {
            status.textContent = '';
        }
    }

    function validateFields() {
        return usernameInput.value.trim() !== '' && passwordInput.value.trim() !== '';
    }

    function loginHandler() {
        if (!validateFields()) {
            showStatus('Please enter both username and password.', 'error');
            return;
        }

        if (usernameInput.value.trim().toLowerCase() === 'admin' && passwordInput.value === 'admin') {
            showStatus('Login successful! Loading router settings...', 'success');
            setTimeout(() => {
                alert('Welcome! Router settings would load now.');
            }, 150);
        } else {
            showStatus('Invalid username or password.', 'error');
        }
    }

    loginButton.addEventListener('click', loginHandler);

    resetButton.addEventListener('click', (event) => {
        event.preventDefault();
        usernameInput.value = '';
        passwordInput.value = '';
        clearStatus();
        usernameInput.focus();
    });

    [usernameInput, passwordInput].forEach((input) => {
        input.addEventListener('input', clearStatus);

        input.addEventListener('focus', () => {
            if (input.classList.contains('text')) {
                input.placeholder = 'Router username';
            } else {
                input.placeholder = 'Router password';
            }
        });

        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.placeholder = input.classList.contains('text')
                    ? 'Enter Your Router Username'
                    : 'Enter Your Router Password';
            }
        });
    });

    passwordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            loginHandler();
        }
    });
});