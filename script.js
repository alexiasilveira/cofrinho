class Moeda {
    constructor(valor) {
        this.valor = valor;
    }

    info() {
        throw new Error("Método 'info()' deve ser implementado.");
    }

    converterParaReal() {
        throw new Error("Método 'converterParaReal()' deve ser implementado.");
    }
}

class Real extends Moeda {
    info() {
        return `R$ ${this.valor.toFixed(2)}`;
    }

    converterParaReal() {
        return this.valor;
    }
}

class Dolar extends Moeda {
    info() {
        return `US$ ${this.valor.toFixed(2)}`;
    }

    converterParaReal() {
        return this.valor * 5.4;
    }
}

class Euro extends Moeda {
    info() {
        return `€ ${this.valor.toFixed(2)}`;
    }

    converterParaReal() {
        return this.valor * 5.9;
    }
}

class Cofrinho {
    constructor() {
        this.moedas = [];
    }

    adicionarMoeda(moeda) {
        this.moedas.push(moeda);
    }

    removerMoeda(moeda) {
        const index = this.moedas.indexOf(moeda);
        if (index > -1) {
            this.moedas.splice(index, 1);
        }
    }

    listarMoedas() {
        return this.moedas.map(moeda => moeda.info()).join("\n");
    }

    calcularTotalEmReais() {
        return this.moedas.reduce((total, moeda) => total + moeda.converterParaReal(), 0);
    }

    isCofrinhoVazio() {
        return this.moedas.length === 0;
    }

    obterUltimaMoeda() {
        return this.isCofrinhoVazio() ? null : this.moedas[this.moedas.length - 1];
    }
}// Declarações de variáveis
const cofre = new Cofrinho();

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeModalBtn = document.querySelector(".close-btn");

// Variáveis globais para armazenar moedas
let moedas = [];

// Função para abrir o modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";
    modal.style.justifyContentcontent = "center";
    modal.style.alignItems = "center";


}

// Função para fechar o modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('adicionar');
    const removeButton = document.getElementById('remover');
    const listButton = document.getElementById('listar');
    const calcButton = document.getElementById('calcular');
    const exitButton = document.getElementById('sair');

    const addModalId = 'add-modal';
    const removeModalId = 'remove-modal';
    const listModalId = 'list-modal';
    const totalModalId = 'total-modal';
    const exitModalId = 'exit-modal';

    // Abertura dos modais
    addButton.addEventListener('click', () => openModal(addModalId));
    removeButton.addEventListener('click', () => openModal(removeModalId));
    listButton.addEventListener('click', () => openModal(listModalId));
    calcButton.addEventListener('click', () => openModal(totalModalId));
    exitButton.addEventListener('click', () => openModal(exitModalId));

    // Fechamento dos modais ao clicar no botão "x"
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Fechar modais ao clicar fora deles
    window.onclick = function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    };

    // Lógica para Adicionar Moeda
    document.getElementById('confirmarAdicionar').addEventListener('click', function () {
        const tipoMoeda = document.getElementById('tipoMoeda').value;
        const valorMoeda = parseFloat(document.getElementById('valorMoeda').value);
        let moeda;
    
        if (tipoMoeda == 1) {
            moeda = new Real(valorMoeda);
        } else if (tipoMoeda == 2) {
            moeda = new Dolar(valorMoeda);
        } else if (tipoMoeda == 3) {
            moeda = new Euro(valorMoeda);
        }
    
        cofre.adicionarMoeda(moeda);
    const mensagemDiv = document.getElementById('mensagemAdicionar');
    mensagemDiv.textContent = "Moeda adicionada com sucesso!";
    mensagemDiv.style.display = "block"; // Mostra a mensagem
    
        // Fecha o modal após 1 segundo
        setTimeout(() => {
            closeModal('add-modal'); // Feche o modal de adicionar moeda
        }, 1000); // 1000 milissegundos = 1 segundo
    });
    
    // Lógica para Remover Moeda
    document.getElementById('confirmarRemover').addEventListener('click', function () {
        const mensagemRemover = document.getElementById('mensagemRemover');

        if (cofre.moedas.length === 0) {
            mensagemRemover.textContent = "Não há moedas para remover.";
        } else {
            cofre.moedas.pop(); // Remove a última moeda
            mensagemRemover.textContent = "Última moeda removida com sucesso!";
        }

        mensagemRemover.style.display = 'block';
        setTimeout(() => {
            mensagemRemover.style.display = 'none';
            closeModal(removeModalId);
        }, 1000); // Fecha o modal após 1 segundo
    });

    // Lógica para Listar Moedas
    document.getElementById('listar').addEventListener('click', function () {
        let listarMoedasDiv = document.getElementById('listarMoedas');
        listarMoedasDiv.innerHTML = ""; // Limpa a listagem anterior
    
        // Acesse a lista de moedas através da instância de Cofrinho
        if (cofre.isCofrinhoVazio()) { // Verifica se o cofre está vazio
            listarMoedasDiv.textContent = "Nenhuma moeda adicionada.";
        } else {
            // Use o método listarMoedas da classe Cofrinho
            listarMoedasDiv.innerHTML = cofre.listarMoedas(); // Obtém a listagem formatada
        }
    
        openModal(listModalId);
    });
    
    // Função para fechar o modal de listar moedas
    document.getElementById('fecharListar').addEventListener('click', function () {
        closeModal(listModalId);
    });
    
    // Lógica para Calcular Total
    document.getElementById('calcular').addEventListener('click', function () {
        const totalValor = document.getElementById('totalValor');
        const total = cofre.calcularTotalEmReais(); // Usando o método do Cofrinho
    
        totalValor.textContent = `Total em reais: R$ ${total.toFixed(2)}`;
        openModal(totalModalId); // Abre o modal de calcular total
    });


// Lógica para fechar o modal de calcular total ao clicar em "Fechar"
document.getElementById('fecharTotal').addEventListener('click', function () {
    closeModal(totalModalId); // Fecha o modal de calcular total
});

  // Funções para abrir e fechar modais
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Lógica para Sair
document.getElementById('confirmarSair').addEventListener('click', function () {
    closeModal('exit-modal'); // Fecha o modal de confirmação de saída
    openModal('exit-message-modal'); // Abre o modal de saída
});

document.getElementById('cancelarSair').addEventListener('click', function () {
    closeModal('exit-modal'); // Fecha o modal de confirmação de saída
});

// Lógica para fechar os modais de mensagem
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        closeModal(this.closest('.modal').id);
    });
});

});
