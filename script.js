document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("inquiryForm");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value?.trim() || "";
    const email = document.getElementById("email")?.value?.trim() || "";
    const details = document.getElementById("details")?.value?.trim() || "";

    const subject = encodeURIComponent("Custom Tie Inquiry - Tied With Grace");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nCustom Tie Idea:\n${details}\n\n— Sent from the Tied With Grace website`
    );

    window.location.href = `mailto:marcia.hare@gmail.com?subject=${subject}&body=${body}`;
  });
});
