const apiURL = "https://xml.treeunfe.me/"
const form = document.getElementById("form-container")
const file = document.querySelector("#input-file")
const fileNameSpan = document.getElementById("file-name-span")
const svg = document.querySelector("svg")
const payload = new FormData(form)
const modalBody = document.getElementById("modal-content")

// Send file to api
function sendFile() {
    fetch(apiURL, {
        method: "POST",
        body: payload,
    })
        .then((res) => res.json())
        .then((data) => {
            // change element attribute with pdf link
            modalBody.src = data.pdf
        })
        .catch((err) => {
            console.log(err)
            window.alert(`Erro: ${err}`)
        })
}

// Form data
form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (fileNameSpan.innerHTML === "Selecione o arquivo xml") {
        window.alert("Selecione um arquivo XML!")
    } else {
        sendFile()
        // 1000ms delay to open Modal
        setTimeout(() => {
            openModal("modal")
        }, 1000)
    }
})

// Get file name and size
const fileNameAndSize = (element) => {
    // Get the selected file
    const [file] = element.target.files
    // Get file name and size
    const { name: fileName, size } = file
    // Convert size in bytes to kbps
    const fileSize = (size / 1000).toFixed(2)
    // Set the text content
    const fileNameAndSize = `${fileName} (${fileSize}KB)`
    fileNameSpan.textContent = fileNameAndSize
}

// Show on screen file name and size
file.addEventListener("change", (e) => {
    // Call function to show file name and size
    fileNameAndSize(e)
    // Change fontSize on file name
    fileNameSpan.style.fontSize = "0.8rem"
    // Change svg icon and size
    svg.setAttribute("viewBox", "0 0 115.28 122.88")
    svg.innerHTML = `<path d="M25.38,57h64.88V37.34H69.59c-2.17,0-5.19-1.17-6.62-2.6c-1.43-1.43-2.3-4.01-2.3-6.17V7.64l0,0H8.15 c-0.18,0-0.32,0.09-0.41,0.18C7.59,7.92,7.55,8.05,7.55,8.24v106.45c0,0.14,0.09,0.32,0.18,0.41c0.09,0.14,0.28,0.18,0.41,0.18 c22.78,0,58.09,0,81.51,0c0.18,0,0.17-0.09,0.27-0.18c0.14-0.09,0.33-0.28,0.33-0.41v-11.16H25.38c-4.14,0-7.56-3.4-7.56-7.56 V64.55C17.82,60.4,21.22,57,25.38,57L25.38,57z M29.98,68.76h7.76l4.03,7l3.92-7h7.66l-7.07,11.02l7.74,11.73h-7.91l-4.47-7.31 l-4.5,7.31h-7.85l7.85-11.86L29.98,68.76L29.98,68.76z M55.72,68.76H65l3.53,13.85l3.54-13.85h9.23v22.76h-5.75V74.17l-4.44,17.35 H65.9l-4.43-17.35v17.35h-5.75V68.76L55.72,68.76z M85.31,68.76h7.03v17.16h11v5.59H85.31V68.76L85.31,68.76z M97.79,57h9.93 c4.16,0,7.56,3.41,7.56,7.56v31.42c0,4.15-3.41,7.56-7.56,7.56h-9.93v13.55c0,1.61-0.65,3.04-1.7,4.1c-1.06,1.06-2.49,1.7-4.1,1.7 c-29.44,0-56.59,0-86.18,0c-1.61,0-3.04-0.64-4.1-1.7c-1.06-1.06-1.7-2.49-1.7-4.1V5.85c0-1.61,0.65-3.04,1.7-4.1 c1.06-1.06,2.53-1.7,4.1-1.7h58.72C64.66,0,64.8,0,64.94,0c0.64,0,1.29,0.28,1.75,0.69h0.09c0.09,0.05,0.14,0.09,0.23,0.18 l29.99,30.36c0.51,0.51,0.88,1.2,0.88,1.98c0,0.23-0.05,0.41-0.09,0.65V57L97.79,57z M67.52,27.97V8.94l21.43,21.7H70.19 c-0.74,0-1.38-0.32-1.89-0.78C67.84,29.4,67.52,28.71,67.52,27.97L67.52,27.97z" />`
})

// Modal control
// Open modal by id
function openModal(id) {
    document.getElementById(id).classList.add("open")
    document.body.classList.add("jm-modal-open")
}
// Close currently open modal
function closeModal() {
    document.querySelector(".jm-modal.open").classList.remove("open")
    document.body.classList.remove("jm-modal-open")
    window.location.reload()
}

window.addEventListener("load", () => {
    // Close modal on background click
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("jm-modal")) return closeModal()
    })
})
