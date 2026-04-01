document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-cadastro");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valido = true;

    // Campos
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const rua = document.getElementById("rua");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");
    const termos = document.getElementById("termos");
    const radiosGenero = document.querySelectorAll('input[name="genero"]');

    // Limpa erros anteriores
    limparErro(nome, "erro-nome");
    limparErro(email, "erro-email");
    limparErro(telefone, "erro-telefone");
    limparErro(cep, "erro-cep");
    limparErro(rua, "erro-rua");
    limparErro(cidade, "erro-cidade");
    limparErro(estado, "erro-estado");
    limparErro(termos, "erro-termos");
    limparErroRadio(radiosGenero, "erro-genero");

    // Validação nome
    if (!nome.value.trim()) {
      mostrarErro(nome, "erro-nome", "O nome é obrigatório.");
      valido = false;
    } else if (nome.value.trim().length < 2) {
      mostrarErro(nome, "erro-nome", "O nome deve ter ao menos 2 caracteres.");
      valido = false;
    }

    // Validação gênero
    const generoSelecionado = document.querySelector('input[name="genero"]:checked');
    if (!generoSelecionado) {
      mostrarErroRadio(radiosGenero, "erro-genero", "Selecione um gênero.");
      valido = false;
    }

    // Validação email
    if (!email.value.trim()) {
      mostrarErro(email, "erro-email", "O e-mail é obrigatório.");
      valido = false;
    } else if (!validarEmail(email.value.trim())) {
      mostrarErro(email, "erro-email", "Digite um e-mail válido.");
      valido = false;
    }

    // Validação telefone (opcional)
    if (telefone.value.trim()) {
      const telLimpo = telefone.value.replace(/\D/g, "");
      if (telLimpo.length < 10 || telLimpo.length > 11) {
        mostrarErro(telefone, "erro-telefone", "Digite um telefone válido.");
        valido = false;
      }
    }

    // Validação CEP (opcional)
    if (cep.value.trim() && !validarCEP(cep.value.trim())) {
      mostrarErro(cep, "erro-cep", "Digite um CEP válido (00000-000).");
      valido = false;
    }

    // Validação rua e cidade (opcional)
    if (rua.value.trim() && rua.value.trim().length < 2) {
      mostrarErro(rua, "erro-rua", "Informe uma rua válida.");
      valido = false;
    }
    if (cidade.value.trim() && cidade.value.trim().length < 2) {
      mostrarErro(cidade, "erro-cidade", "Informe uma cidade válida.");
      valido = false;
    }

    // Validação estado
    if (!estado.value) {
      mostrarErro(estado, "erro-estado", "Selecione um estado.");
      valido = false;
    }

    // Validação termos
    if (!termos.checked) {
      mostrarErro(termos, "erro-termos", "Você deve aceitar os termos.");
      valido = false;
    }

    // Foca no primeiro erro
    if (!valido) {
      const primeiro = form.querySelector("[aria-invalid='true']") || document.querySelector('.error:not(:empty)');
      if (primeiro) primeiro.focus();
      return;
    }

    alert("Formulário enviado com sucesso!");
    form.reset();
    limparTodosOsErros();
  });

  function mostrarErro(campo, idErro, mensagem) {
    campo.setAttribute("aria-invalid", "true");
    const erro = document.getElementById(idErro);
    if (erro) erro.textContent = mensagem;
  }

  function limparErro(campo, idErro) {
    if (campo) campo.removeAttribute("aria-invalid");
    const erro = document.getElementById(idErro);
    if (erro) erro.textContent = "";
  }

  function mostrarErroRadio(radios, idErro, mensagem) {
    radios.forEach(r => r.setAttribute("aria-invalid", "true"));
    const erro = document.getElementById(idErro);
    if (erro) erro.textContent = mensagem;
  }

  function limparErroRadio(radios, idErro) {
    radios.forEach(r => r.removeAttribute("aria-invalid"));
    const erro = document.getElementById(idErro);
    if (erro) erro.textContent = "";
  }

  function validarEmail(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  function validarCEP(valor) {
    return /^\d{5}-?\d{3}$/.test(valor);
  }

  function limparTodosOsErros() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll("[aria-invalid='true']").forEach(c => c.removeAttribute("aria-invalid"));
  }
});