export function errorCatcher(error) {
    const body = document.querySelector("body");

    const errorElement = document.createElement("div");
    errorElement.className = "error-modal";
    errorElement.textContent = error;
    body.append(errorElement);
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}
