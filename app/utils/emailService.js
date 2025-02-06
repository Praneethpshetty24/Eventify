export const sendWelcomeEmail = async (userEmail) => {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}; 