document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".faq-item");

    items.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        answer.style.height = "0px";

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            // Close all
            items.forEach((faq) => {
                const ans = faq.querySelector(".faq-answer");

                faq.classList.remove("active");

                ans.style.height = ans.scrollHeight + "px";

                requestAnimationFrame(() => {
                    ans.style.height = "0px";
                });
            });

            // Open current
            if (!isOpen) {

                item.classList.add("active");

                answer.style.height = "0px";

                requestAnimationFrame(() => {
                    answer.style.height = answer.scrollHeight + "px";
                });

                answer.addEventListener(
                    "transitionend",
                    function handler() {
                        if (item.classList.contains("active")) {
                            answer.style.height = "auto";
                        }
                        answer.removeEventListener("transitionend", handler);
                    }
                );
            }

        });
    });
});