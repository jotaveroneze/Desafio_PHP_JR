window.formatarCpf = function (cpf) {
    return cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
    );
};


window.formatarData = function (data) {
    const dataFormatada = data.substring(0, 10);
    const [ano, mes, dia] = dataFormatada.split('-');

    return `${dia}/${mes}/${ano}`;
};


window.mostrarMensagem = function (texto, erro = false) {
    const message = document.getElementById('message');

    message.textContent = texto;

    message.className = erro
        ? 'message-error'
        : 'message-success';

    setTimeout(() => {
        message.textContent = '';
        message.className = '';
    }, 4000);
};

window.aplicarMascaraTelefone = function (valor) {
    valor = valor.replace(/\D/g, '');

    if (valor.length <= 10) {
        return valor.replace(
            /(\d{2})(\d{4})(\d{0,4})/,
            '($1) $2-$3'
        );
    }

    return valor.replace(
        /(\d{2})(\d{5})(\d{0,4})/,
        '($1) $2-$3'
    );
};