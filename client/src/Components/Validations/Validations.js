export const ValidateGameName = (e) => {
  function CorrectName(value) {
    const regex = /^[A-Za-z0-9\s&':!?".,()-]+$/;
    return regex.test(value);
  }

  return e.name.length === 0
    ? "Este campo es obligatorio"
    : e.name.length < 2
    ? "Ningún juego puede tener menos de 2 caracteres"
    : e.name.length > 100
    ? "Vamos viejo, ese nombre es demasiado extenso"
    : !CorrectName(e.name)
    ? "No se permiten ese tipo de caracteres especiales"
    : undefined;
};

export const ValidateGameIMG = (e) => {
  function CorrectIMG(value) {
    const regex = /.(jpg|jpeg|png)$/i;
    return regex.test(value);
  }

  return e.image.length === 0
    ? "Este campo es obligatorio"
    : !CorrectIMG(e.image)
    ? "Solo se permiten imágenes con extensión .jpg, .jpeg o .png"
    : undefined;
};

export const ValidateGameDescription = (e) => {
  function CorrectDescription(value) {
    const regex = /^[A-Za-z0-9\s&':!?".,()-]+$/;
    return regex.test(value);
  }

  return e.description.length < 2
    ? "No existe manera de que una descripción sea tan corta"
    : e.description.length > 100
    ? "Hermano... no es un libro a publicar"
    : !CorrectDescription(e.description)
    ? "No se permiten ese tipo de caracteres especiales"
    : undefined;
};

export const ValidateDate = (e) => {
  const minDate = new Date("1950-01-01");

  if (!e.date) return "La fecha es obligatoria";
  const inputDate = new Date(e.date);

  if (inputDate < minDate) return "La fecha no puede ser anterior a 1950";
  else return;
};

export const ValidateRating = (e) => {
  if (e.rating < 1 || e.rating > 5) return "Rango entre 1 y 5";
  else return;
};
export const ValidatePlatform = (e) => {
  if (e.platform.length === 0) return "Este campo es obligatorio";
  else return;
};

export const ValidateGenres = (e) => {
  if (e.genres.length === 0) return "Este campo es obligatorio";
  else if (e.genres.length > 6) return "No se permiten mas de 6 generos";
  else return;
};
