let tarefas = [];

const formulario = document.querySelector("#form-tarefa");
const campoTitulo = document.querySelector("#titulo");
const campoDescricao = document.querySelector("#descricao");
const campoPrioridade = document.querySelector("#prioridade");
const campoData = document.querySelector("#data");

const mensagemFormulario = document.querySelector("#mensagem-formulario")

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const titulo = campoTitulo.value.trim();
    const descricao = campoDescricao.value.trim();
    const prioridade = campoPrioridade.value;
    const data = campoData.value;

    if (!validarTarefa(titulo, prioridade, data)) {
        return;
    }

    const novaTarefa = {
        id: gerarProximoId(),
        titulo,
        descricao,
        prioridade,
        data,
        concluida: false
    }

    tarefas.push(novaTarefa);

    renderizarTarefas();
    
    formulario.reset();

    mensagemFormulario.textContent = "Tarefa cadastrada com sucesso!";
});

function gerarProximoId() {
    if (tarefas.length === 0) {
        return 1;
    }

    const ids = tarefas.map(tarefa => tarefa.id);
    return Math.max(...ids) + 1;
}

function validarTarefa(titulo, prioridade, data) {
    if (titulo === "") {
        mensagemFormulario.textContent = "Informe o título da tarefa."
        return false;
    }

    if (titulo.length < 3) {
        mensagemFormulario.textContent = "O título deve ter pelo menos 3 caracteres."
        return false;
    }

    if (prioridade === "") {
        mensagemFormulario.textContent = "Selecione uma prioridade.";
        return false;
    }

    if (data === "") {
        mensagemFormulario.textContent = "Informe a data da tarefa."
        return false;
    }

    mensagemFormulario.textContent = "";
    return true;

}

function renderizarTarefas() {
    const listaTarefas = document.querySelector("#lista-tarefas");

    listaTarefas.textContent = "";

    atualizarResumo();

    if (tarefas.length === 0) {
        listaTarefas.textContent = "Nenhuma tarefa cadastrada."

        return;
    }

    tarefas.forEach(function(tarefa) {
        const artigo = document.createElement("article");
        artigo.classList.add("tarefa");

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = tarefa.descricao;

        const prioridade = document.createElement("p");
        prioridade.textContent = `Prioridade: ${tarefa.prioridade}`;

        const data = document.createElement("p");
        data.textContent = `Data: ${tarefa.data}`

        const situacao = document.createElement("p");

        if (tarefa.concluida) {
            situacao.textContent = "Situação: Concluída";
        } else {
            situacao.textContent = "Situação: Pendente";
        }

        const acoes = document.createElement("div");
        acoes.classList.add("tarefa-acoes");

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = "Concluir";
        botaoConcluir.dataset.acao = "concluir";
        botaoConcluir.dataset.id = tarefa.id;

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.dataset.acao = "editar";
        botaoEditar.dataset.id = tarefa.id;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.dataset.acao = "excluir";
        botaoExcluir.dataset.id = tarefa.id;

        acoes.append(botaoConcluir, botaoEditar, botaoExcluir);

        artigo.append(titulo, descricao, prioridade, data, situacao, acoes);
        listaTarefas.append(artigo);
        
    });
    }

function atualizarResumo() {
    const resumo = document.querySelector("#resumo-tarefas");

    if (tarefas.length === 1) {
        resumo.textContent = "1 tarefa";
    } else {
        resumo.textContent = `${tarefas.length} tarefas`;
    }
}