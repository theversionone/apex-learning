// Simple popup for now - will enhance later
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="width: 300px; padding: 20px; font-family: system-ui;">
        <h2 style="margin: 0 0 16px 0; color: #1f2937;">Apex Quiz Automation</h2>
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px 0;">
          Foundation built successfully! 🎉
        </p>
        <div style="background: #f3f4f6; padding: 12px; border-radius: 6px; font-size: 12px;">
          <div>✅ Content script loaded</div>
          <div>✅ Background script active</div>
          <div>✅ Quiz detection ready</div>
        </div>
      </div>
    `;
  }
});