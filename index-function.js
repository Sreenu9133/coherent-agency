document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const currentItem = question.parentElement;
      const currentAnswer = currentItem.querySelector(".faq-answer");
      const isActive = currentItem.classList.contains("active");

      if (!isActive) {
        
        const allItems = document.querySelectorAll(".faq-item");
        
        allItems.forEach((item) => {
          item.classList.remove("active");
          
          const answer = item.querySelector(".faq-answer");
          if (answer) {
            answer.style.maxHeight = null;
          }
        });

        currentItem.classList.add("active");
        currentAnswer.style.maxHeight = currentAnswer.scrollHeight + "px";
        
      } else {
        currentItem.classList.remove("active");
        currentAnswer.style.maxHeight = null;
      }
    });
  });
});




