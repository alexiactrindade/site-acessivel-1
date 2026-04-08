document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  var ok = true;

  document.querySelectorAll(".erro").forEach(function(el) {
    el.classList.remove("visivel");
  });
  document.getElementById("sucesso").style.display = "none";

  if (document.getElementById("nome").value.trim() === "") {
    document.getElementById("erro-nome").classList.add("visivel");
    ok = false;
  }

  if (!document.querySelector('input[name="genero"]:checked')) {
    document.getElementById("erro-genero").classList.add("visivel");
    ok = false;
  }

  if (document.getElementById("email").value.trim() === "") {
    document.getElementById("erro-email").classList.add("visivel");
    ok = false;
  }

  if (document.getElementById("estado").value === "") {
    document.getElementById("erro-estado").classList.add("visivel");
    ok = false;
  }

  if (ok) {
    document.getElementById("sucesso").style.display = "block";
    document.getElementById("form").reset();
  }
});