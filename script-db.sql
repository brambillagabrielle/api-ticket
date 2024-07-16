CREATE DATABASE sistematickets;

-- criação da tabela usuários
--- A = Admin / G = Agente / S = Solicitante
CREATE TABLE usuarios (
    email VARCHAR(50) NOT NULL PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    tipo CHAR(1) NOT NULL,
    CHECK (tipo = 'A' OR tipo = 'G' OR tipo = 'S')
);

-- inserir dados na tabela usuário
INSERT INTO usuarios(email, nome, senha, tipo) VALUES
    ('gabriellebrambillacc@gmail.com', 'Gabrielle Brambilla', '123456', 'A'), 
    ('joaosilva@gmail.com', 'Joao Silva', '456789', 'S'),
    ('mariacardoso@gmail.com', 'Maria Cardoso', '999999', 'G');

-- criação da tabela tickets
--- A = Aberto / E = Em andamento / R = Resolvido
CREATE TABLE tickets (
    id SERIAL NOT NULL PRIMARY KEY,
    resumo VARCHAR(100) NOT NULL,
    descricao VARCHAR(300) NOT NULL,
    responsavel VARCHAR(50) DEFAULT 'gabriellebrambillacc@gmail.com',
    solicitante VARCHAR(50) NOT NULL,
    data_abertura TIMESTAMP NOT NULL,
    status CHAR(1) NOT NULL DEFAULT 'A',
    CHECK (status = 'A' OR status = 'E' OR status = 'R'),
    FOREIGN KEY (responsavel) REFERENCES usuarios(email),
    FOREIGN KEY (solicitante) REFERENCES usuarios(email)
);

-- criação da tabela comentários
CREATE TABLE comentarios (
    id SERIAL NOT NULL PRIMARY KEY,
    data_postagem TIMESTAMP NOT NULL,
    texto VARCHAR(300) NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    editado BOOLEAN NOT NULL,
    ticket INTEGER NOT NULL,
    FOREIGN KEY (usuario) REFERENCES usuarios(email),
    FOREIGN KEY (ticket) REFERENCES tickets(id)
);

-- inserir dados na tabela tickets
INSERT INTO tickets (resumo, descricao, responsavel, solicitante, data_abertura) VALUES
    ('Troca de carregador USB', 'Solicito a troca de um carregador USB do tipo C', 'mariacardoso@gmail.com', 'joaosilva@gmail.com', NOW()),
    ('Novo monitor', 'Quero um novo monitor para trabalho', null, 'mariacardoso@gmail.com', NOW());

-- inserir dados na tabela comentários
INSERT INTO comentarios (data_postagem, texto, usuario, editado, ticket) VALUES
    (NOW(), 'Boa tarde João, poderia informar a data desejada para troca do equipamento na sede?', 'mariacardoso@gmail.com', false, 1);