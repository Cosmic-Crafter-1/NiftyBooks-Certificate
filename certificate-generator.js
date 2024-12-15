// Helper function to format dates
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Helper function to handle file uploads
function handleFileUpload(file, previewElement, certificateElement) {
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewElement.src = e.target.result;
            certificateElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Update certificate when input changes
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', (e) => {
        if (e.target.type === 'file') {
            if (e.target.id === 'ctoSignature') {
                handleFileUpload(
                    e.target.files[0],
                    document.getElementById('ctoPreview'),
                    document.getElementById('ctoSignatureImg')
                );
            } else if (e.target.id === 'ceoSignature') {
                handleFileUpload(
                    e.target.files[0],
                    document.getElementById('ceoPreview'),
                    document.getElementById('ceoSignatureImg')
                );
            }
        } else {
            const value = e.target.value;
            switch (e.target.id) {
                case 'name':
                    document.getElementById('recipientName').textContent = value;
                    document.getElementById('recipientNameSpan').textContent = value;
                    break;
                case 'team':
                    document.getElementById('teamSpan').textContent = value;
                    break;
                case 'skills':
                    document.getElementById('skillsSpan').textContent = value;
                    break;
                case 'ctoName':
                    document.getElementById('ctoNameDisplay').textContent = value;
                    break;
                case 'ceoName':
                    document.getElementById('ceoNameDisplay').textContent = value;
                    break;
            }

            // Update dates if either date input changes
            if (e.target.id === 'startDate' || e.target.id === 'endDate') {
                const startDate = document.getElementById('startDate').value;
                const endDate = document.getElementById('endDate').value;
                if (startDate && endDate) {
                    document.getElementById('dateSpan').textContent =
                        `${formatDate(startDate)} to ${formatDate(endDate)}`;
                }
            }
        }
    });
});

// Initialize dates
document.getElementById('dateSpan').textContent =
    `${formatDate(document.getElementById('startDate').value)} to ${formatDate(document.getElementById('endDate').value)}`;


const priBtn = document.querySelector('.btn-primary');
const secBtn = document.querySelector('.btn-secondary');

priBtn.addEventListener('click', printPDF)
secBtn.addEventListener('click', downloadDOC)


function printPDF() {
    window.print();
}

// // PDF download function
// async function downloadPDF() {
//     const certificate = document.querySelector('.certificate');
//     const options = {
//         margin: 1,
//         filename: 'internship-certificate.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
//     };

//     try {
//         await html2pdf().set(options).from(certificate).save();
//     } catch (error) {
//         console.error('Error generating PDF:', error);
//         alert('Error generating PDF. Please try again.');
//     }
// }

// // DOC download function
// function downloadDOC() {
//     // Get certificate data
//     const recipientName = document.getElementById('recipientName').textContent;
//     const team = document.getElementById('teamSpan').textContent;
//     const skills = document.getElementById('skillsSpan').textContent;
//     const dates = document.getElementById('dateSpan').textContent;
//     const ctoName = document.getElementById('ctoNameDisplay').textContent;
//     const ceoName = document.getElementById('ceoNameDisplay').textContent;

//     // Create document content
//     const content = `
// INTERNSHIP COMPLETION CERTIFICATE

// This certificate is proudly presented to
// ${recipientName}

// For successfully completing 3-month internship as a Front End Web Developer at NiftyBooks.
// During the internship, ${recipientName} showcased ${skills} that added value to the ${team} team.

// Internship Period: ${dates}

// Signatures:

// ${ctoName}                    ${ceoName}
// Chief Technology Officer       Chief Executive Officer
// `;

//     // Create blob and download
//     const blob = new Blob([content], { type: 'application/msword' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'internship-certificate.doc';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }

