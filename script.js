const urlInput = document.getElementById('imageUrl');
const addBtn = document.getElementById('addBtn');
const deleteBtn = document.getElementById('deleteBtn');
const gallery = document.getElementById('gallery');

let selectedImg = null;

// Habilitar/deshabilitar botón según input
urlInput.addEventListener('input', () => {
  addBtn.disabled = !urlInput.value.trim();
});

// Permitir añadir con Enter
urlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addImage();
});

addBtn.addEventListener('click', addImage);

deleteBtn.addEventListener('click', () => {
  deleteSelected();
});

// Atajos de teclado: Suprimir/Delete para borrar la seleccionada
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Delete' || e.key === 'Backspace') && selectedImg) {
    deleteSelected();
  }
});

function addImage() {
  const url = urlInput.value.trim();
  if (!url) return;

  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Imagen añadida por el usuario';
  img.classList.add('fade-in');

  // Selección al hacer click
  img.addEventListener('click', () => selectImage(img));

  // Manejo de error de carga
  img.addEventListener('error', () => {
    img.remove();
    alert('No se pudo cargar la imagen. Verifica la URL.');
  });

  gallery.appendChild(img);
  urlInput.value = '';
  addBtn.disabled = true;

  // Seleccionar la nueva imagen automáticamente
  selectImage(img);
}

function selectImage(img) {
  if (selectedImg === img) return;
  if (selectedImg) selectedImg.classList.remove('selected');
  selectedImg = img;
  if (selectedImg) selectedImg.classList.add('selected');
  deleteBtn.disabled = false;
}

function deleteSelected() {
  if (!selectedImg) return;
  const target = selectedImg;
  // animación de salida
  target.classList.add('removing');
  // esperar a que termine la transición, luego eliminar
  const cleanup = () => {
    if (target && target.parentElement) target.remove();
    if (selectedImg === target) selectedImg = null;
    deleteBtn.disabled = true;
    target.removeEventListener('transitionend', cleanup);
  };
  // Fallback por si no hay transitionend
  target.addEventListener('transitionend', cleanup);
  setTimeout(cleanup, 250);
}
