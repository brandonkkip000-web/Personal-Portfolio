// Main JS for Brandon Kimutai Kiplangat Portfolio - Terminal Version

(function() {
  // DOM Elements
  const terminal = document.getElementById('terminal');
  const commandInput = document.getElementById('commandInput');
  const card3d = document.getElementById('card3d');
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  
  // Command history
  let commandHistory = [];
  let historyIndex = -1;
  
  // Available commands
  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => {
        let output = '<p>Available commands:</p><ul>';
        Object.entries(commands).forEach(([cmd, { description }]) => {
          output += `<li><span class="command">${cmd}</span> - ${description}</li>`;
        });
        return output + '</ul>';
      }
    },
    welcome: {
      description: 'Show the welcome message',
      execute: () => `
        <p>Hi, I'm Brandon, a Software & AI Engineer.</p>
        <p>Welcome to my interactive portfolio terminal!</p>
        <p>Type 'help' to see available commands.</p>
      `
    },
    about: {
      description: 'Show information about me',
      execute: () => `
        <p>Hello! I'm Brandon Kimutai Kiplangat.</p>
        <p>I'm a Cyber Security and Computer Networks student with a passion for
        automation, network defense and building reliable tooling.</p>
        <p>I'm currently pursuing my degree at Strathmore University (2024–2028).</p>
      `
    },
    skills: {
      description: 'Show my skills',
      execute: () => `
        <p><strong>Cybersecurity:</strong> Network Security, Ethical Hacking, Cryptography</p>
        <p><strong>Development:</strong> Python, JavaScript, C++, Bash</p>
        <p><strong>Tools:</strong> Wireshark, Nmap, Metasploit, Git</p>
        <p><strong>Other:</strong> Problem Solving, Teamwork, Communication</p>
      `
    },
    projects: {
      description: 'List my projects',
      execute: () => `
        <p><strong>integrity-cli</strong> - Directory integrity checker using SHA‑256 with optional HMAC</p>
        <p><strong>password-hash-cli</strong> - Secure password hashing with Argon2id</p>
        <p><strong>secure-delete-cli</strong> - Securely delete files by overwriting data</p>
        <p><strong>file-encrypt-cli</strong> - File encryption/decryption using AES‑256‑GCM</p>
      `
    },
    experience: {
      description: 'My work experience',
      execute: () => `
        <p><strong>Cresenty Studio</strong> — Game Development (Indie) — 2024–Present</p>
        <p><strong>Security Projects</strong> — Self-directed tooling (CLI, crypto, ops)</p>
      `
    },
    education: {
      description: 'My educational background',
      execute: () => `
        <p><strong>Strathmore University</strong> — BSc. Informatics and Computer Science (2024–2028)</p>
      `
    },
    certifications: {
      description: 'View my certifications',
      execute: () => `
        <p>CompTIA Security+ (in-progress)</p>
        <p>TryHackMe / HackTheBox Labs</p>
      `
    },
    leadership: {
      description: 'Leadership and community',
      execute: () => `
        <p>Community contributor in security/tools open-source.</p>
        <p>Mentoring peers in scripting and networking basics.</p>
      `
    },
    clear: {
      description: 'Clear the terminal',
      execute: () => {
        const welcomeMessage = document.querySelector('.welcome-message');
        const commandLines = document.querySelectorAll('.command-line');
        commandLines.forEach((line, index) => {
          if (index > 0) line.remove();
        });
        return '';
      }
    },
    ls: {
      description: 'List sections',
      execute: () => `about  projects  skills  experience  contact  education  certifications  leadership`
    },
    contact: {
      description: 'Get my contact information',
      execute: () => {
        // Trigger card flip
        const inner = card3d.querySelector('.card-inner');
        inner.classList.add('flipped');
        setTimeout(() => inner.classList.remove('flipped'), 5000);
        return 'Check out the 3D card to the right for my contact information!';
      }
    },
    sudo: {
      description: 'Try superuser mode',
      execute: () => `
        <p>Permission denied. This terminal is sandboxed.</p>
        <p>Tip: use commands like 'about', 'projects', or 'contact'.</p>
      `
    },
    theme: {
      description: 'Toggle between light and dark theme',
      execute: () => {
        toggleTheme();
        return 'Theme toggled!';
      }
    }
  };

  // Initialize terminal
  function initTerminal() {
    // Set current year if footer exists
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    
    // Load theme
    const saved = localStorage.getItem('theme');
    if (saved) {
      html.setAttribute('data-theme', saved);
      updateIcon();
    }
    
    // Focus input
    commandInput.focus();
    
    // Add event listeners
    commandInput.addEventListener('keydown', handleKeyDown);
    toggle.addEventListener('click', toggleTheme);
    
    // Add click handler for terminal to focus input
    terminal.addEventListener('click', () => {
      commandInput.focus();
    });
  }
  
  // Handle keyboard input
  function handleKeyDown(e) {
    // Handle Enter key
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = commandInput.value.trim();
      
      if (command) {
        // Add to history
        commandHistory.unshift(command);
        historyIndex = -1;
        
        // Create command line display
        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        commandLine.innerHTML = `
          <span class="prompt">gateremark@portfolio:~$</span>
          <span>${escapeHTML(command)}</span>
        `;
        terminal.insertBefore(commandLine, commandInput.parentNode);
        
        // Process command
        processCommand(command);
        
        // Clear input
        commandInput.value = '';
        
        // Scroll to bottom
        terminal.scrollTop = terminal.scrollHeight;
      }
    }
    // Handle up arrow for command history
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        historyIndex++;
        commandInput.value = commandHistory[historyIndex];
        // Move cursor to end of input
        commandInput.selectionStart = commandInput.selectionEnd = commandInput.value.length;
      }
    }
    // Handle down arrow for command history
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        commandInput.value = commandHistory[historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        commandInput.value = '';
      }
    }
  }
  
  // Process terminal commands
  function processCommand(command) {
    const args = command.split(' ');
    const cmd = args[0].toLowerCase();
    
    // Create output container
    const output = document.createElement('div');
    output.className = 'command-output';
    
    // Execute command if it exists
    if (commands[cmd]) {
      output.innerHTML = commands[cmd].execute(args.slice(1));
    } else if (cmd) {
      output.innerHTML = `Command not found: ${cmd}<br>Type 'help' to see available commands.`;
    }
    
    // Add output to terminal
    terminal.insertBefore(output, commandInput.parentNode);
    
    // Auto-scroll to bottom
    terminal.scrollTop = terminal.scrollHeight;
  }
  
  // Toggle theme
  function toggleTheme() {
    const current = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    updateIcon();
  }
  
  // Update theme icon
  function updateIcon() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Initialize the terminal when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    initTerminal();

    // Update clock in status bar
    const clock = document.getElementById('statusClock');
    function updateClock() {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      clock.textContent = `${hh}:${mm}:${ss}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Command bar buttons trigger commands
    document.querySelectorAll('.command-bar [data-cmd]').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const cmd = btn.getAttribute('data-cmd');
        commandInput.value = cmd;
        const ev = new KeyboardEvent('keydown', { key: 'Enter' });
        commandInput.dispatchEvent(ev);
      });
    });

    // Add hover effect for 3D card
    const card = document.querySelector('.card-3d');
    const inner = card.querySelector('.card-inner');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltY = (x - centerX) / 12;
      const tiltX = (centerY - y) / 12;
      const isFlipped = inner.classList.contains('flipped');
      const baseY = isFlipped ? 180 : 0;
      inner.style.transform = `rotateY(${baseY + tiltY}deg) rotateX(${tiltX}deg)`;
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      card.style.setProperty('--gx', `${gx}%`);
      card.style.setProperty('--gy', `${gy}%`);
    });

    card.addEventListener('mouseleave', () => {
      const isFlipped = inner.classList.contains('flipped');
      const baseY = isFlipped ? 180 : 0;
      inner.style.transform = `rotateY(${baseY}deg) rotateX(0deg)`;
    });

    // Click to flip
    card.addEventListener('click', () => {
      inner.classList.toggle('flipped');
      const isFlipped = inner.classList.contains('flipped');
      const baseY = isFlipped ? 180 : 0;
      inner.style.transform = `rotateY(${baseY}deg) rotateX(0deg)`;
    });

    // Global key to focus input
    document.addEventListener('keydown', () => commandInput.focus());
  });

})();
