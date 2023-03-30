$(document).ready(function () {
    const $chat = $('#chat');
    const $messageForm = $('#message-form');
    const $messageInput = $('#message-input');
  
    $messageForm.submit(async function (event) {
      event.preventDefault();
  
      const message = $messageInput.val();
  
      // Send message to server and get response
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());
  
      // Append message to chat container
      $chat.append(`<p><strong>You:</strong> ${message}</p>`);
      $chat.append(`<p><strong>AI:</strong> ${response.message}</p>`);
  
      // Clear input field
      $messageInput.val('');
  
      // Scroll to bottom of chat container
      $chat.scrollTop($chat[0].scrollHeight);
    });
  });
  