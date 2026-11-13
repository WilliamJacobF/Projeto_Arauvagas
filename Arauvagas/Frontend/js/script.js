const API_URL = "http://127.0.0.1:8000/api/vagas";

// Elementos HTML
const listaVagas = document.getElementById("listaVagas");
const mensagemVagas = document.getElementById("mensagemVagas");

const formBusca = document.getElementById("formBusca");
const tituloBusca = document.getElementById("tituloBusca");
const btnLimpar = document.getElementById("btnLimpar");

const formCadastro = document.getElementById("formCadastro");
const mensagemCadastro = document.getElementById("mensagemCadastro");

// ==========================================
// 1. LISTAR E BUSCAR VAGAS
// ==========================================

async function listarVagas(titulo = "") {
  listaVagas.replaceChildren();
  mensagemVagas.textContent = "Carregando vagas...";

  try {
    let url = API_URL;

    if (titulo.trim() !== "") {
      url += `?titulo=${encodeURIComponent(titulo)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao buscar vagas.");
    }

    const vagas = await response.json();

    if (vagas.length === 0) {
      mensagemVagas.textContent = "Nenhuma vaga encontrada.";
      return;
    }

    mensagemVagas.textContent = "";

    vagas.forEach((vaga) => {
      // Criando coluna
      const coluna = document.createElement("div");
      coluna.className = "col-md-6 col-lg-4";

      // Criando card
      const card = document.createElement("div");
      card.className = "card-vaga";

      // Título
      const tituloVaga = document.createElement("h5");
      tituloVaga.textContent = vaga.titulo;

      // Empresa
      const empresa = document.createElement("p");
      empresa.textContent = `Empresa: ${vaga.empresa}`;

      // Localização
      const localizacao = document.createElement("p");
      localizacao.textContent = `Localização: ${vaga.localizacao}`;

      // Salário
      const salario = document.createElement("p");

      salario.textContent =
        vaga.salario != null
          ? `Salário: R$ ${Number(vaga.salario).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`
          : "Salário não informado";

      // Descrição
      const descricao = document.createElement("p");
      descricao.className = "text-muted mt-3";
      descricao.textContent = vaga.descricao;

      // Adicionando elementos ao card
      card.append(tituloVaga, empresa, localizacao, salario, descricao);

      coluna.appendChild(card);

      listaVagas.appendChild(coluna);
    });
  } catch (error) {
    mensagemVagas.textContent =
      "Não foi possível carregar as vagas. Verifique se a API está funcionando.";

    console.error(error);
  }
}

// ==========================================
// 2. EVENTO DE BUSCA
// ==========================================

formBusca.addEventListener("submit", function (event) {
  event.preventDefault();

  const titulo = tituloBusca.value;

  listarVagas(titulo);
});

// ==========================================
// 3. LIMPAR PESQUISA
// ==========================================

btnLimpar.addEventListener("click", function () {
  tituloBusca.value = "";

  listarVagas();
});

// ==========================================
// 4. CADASTRAR VAGA
// ==========================================

formCadastro.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Capturando os dados do formulário
  const vaga = {
    titulo: document.getElementById("titulo").value,
    empresa: document.getElementById("empresa").value,
    descricao: document.getElementById("descricao").value,
    localizacao: document.getElementById("localizacao").value,
    salario: document.getElementById("salario").value || null,
  };

  try {
    // Enviando dados para a API
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(vaga),
    });

    const texto = await response.text();

    const dados = texto ? JSON.parse(texto) : {};

    // Verificando resposta
    if (!response.ok) {
      if (response.status === 422) {
        const erros = Object.values(dados.errors || {}).flat();

        throw new Error(erros.join(" "));
      }

      throw new Error(dados.message || "Erro ao cadastrar vaga.");
    }

    // Mensagem de sucesso
    mensagemCadastro.className = "mensagem mensagem-sucesso mt-3";

    mensagemCadastro.textContent = "Vaga cadastrada com sucesso!";

    // Limpando formulário
    formCadastro.reset();

    // Atualizando listagem
    listarVagas();
  } catch (error) {
    mensagemCadastro.className = "mensagem mensagem-erro mt-3";

    mensagemCadastro.textContent = error.message;

    console.error(error);
  }
});

// ==========================================
// 5. CARREGAR VAGAS AO ABRIR A PÁGINA
// ==========================================

listarVagas();
