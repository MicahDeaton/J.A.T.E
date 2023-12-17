const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;
// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // TODO-CHECK: Add an event handler to the `beforeinstallprompt` event
  // Prevent the browser's default prompt to install the PWA
  event.preventDefault();
  // Store the event for later use
  deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
});

// TODO-CHECK: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the browser's installation prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation');
    } else {
      console.log('User dismissed the installation');
    }
    // Reset the deferredPrompt variable
    deferredPrompt = null;
    // Hide the install button after installation
    butInstall.style.display = 'none';
  }
});

// TODO-CHECK: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // The app has been installed
  console.log('App installed successfully');
  // Hide the install button after installation
  butInstall.style.display = 'none';
});
