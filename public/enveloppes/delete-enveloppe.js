const submitButton = document.getElementById('submit-enveloppe');
const newEnveloppeContainer = document.getElementById('new-enveloppe');

submitButton.addEventListener('click', () => {
  const id = document.getElementById('id').value;

  fetch(`/api/envelopes/${id}`, {
    method: 'DELETE',
  })
  .then(() => {
    const newEnveloppe = document.createElement('div');
    newEnveloppe.innerHTML = `
    <h3>Congrats, your enveloppe was deleted!</h3>
    <p>Go to the <a href="../index.html">home page</a> to request and view all enveloppes.</p>
    `
    newEnveloppeContainer.appendChild(newEnveloppe);
  });
});