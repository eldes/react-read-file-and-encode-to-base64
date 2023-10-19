# Front-end React: Como abrir um arquivo e converter para Base64

Exemplo de front-end simples que abre um arquivo e exibe suas informações:

- nome do arquivo
- tipo do arquivo (*content-type*)
- tamanho do arquivo
- conteúdo convertido em Base64

Esse exemplo foi criado usando React/Next com TypeScript, a partir do template do *create-next-app*.

```console
$ npx creat-next-app
```

## Interface

A tela dessa aplicação tem um botão "Abrir".

Ao ser clicado, uma caixa de seleção de arquivos se abre para então o usuário escolher um arquivo local do seu computador.

Ao ser selecionado um arquivo, as informações sobre ele são exibidas na tela.

## Funcionamento

Ao ser clicado o botão "Abrir", um elemento `<input>` do tipo `file` é criado dinamicamente pelo código JavaScript e adicionado no final do `<body>`.

```typescript
const acceptList = [
  'image/png',
  'image/jpeg',
  'application/zip',
  'application/x-zip-compressed',
];
const  fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = acceptList.join(',');
fileInput.multiple = false;
fileInput.style.display = 'none';

document.body.append(fileInput);
```

Esse `<input>` pode ser acionado por meio da execução do seu método `click()` (que simula um clique no `<input>`).

```typescript
fileInput.click();
```

Quando esse `<input>` for ativado e um arquivo for selecionado,  um evento `change` é então lançado por esse componente.

Como resposta a esse evento, o arquivo selecionado será processado e logo depois o `<input>` é removido do `<body>`.

```typescript
fileInput.addEventListener('change', function () {
  // processa o arquivo
  fileInput.remove();
}, false);
```

As informações desse arquivo selecionado, em forma de objeto da classe `File`, é adicionado à lista de arquivos do `<input>`: a propriedade `files`.

Como, nesse exemplo, estamos interessados apenas em um único arquivo, vamos acessar o primeiro elemento dessa lista (`files[0]`) e definir como valor de um *state* `file`.

```typescript
const [file, setFile] = useState<File>();
//...
fileInput.addEventListener('change', function () {
  //...
  setFile(fileInput.files[0])
  //...
  fileInput.remove();
}, false);
```

A partir desse ponto, temos acesso às informações do arquivo selecionado:

- nome: `file.name`
- *content-type*: `file.type`
- tamanho: `file.size`

Para conseguir o conteúdo do arquivo em formato Base64, pode ser usado um objeto da classe `FileReader`.

Para isso é chamado o método `readAsDataURL()`, passando o objeto `File` como parâmetro.

Ao ser carregado, o conteúdo poderá ser acessado pela propriedade `result` do objeto `FileReader`.

Nesse exemplo, esse `result` será gravado num *state* chamado `base64`.

```typescript
const [base64, setBase64] = useState<string | ArrayBuffer | null>();
//...
const  reader = new  FileReader();
reader.addEventListener('load', function () {
  setBase64(reader.result);
  fileInput.remove();
}, false);
reader.readAsDataURL(this.files[0]);
```
---
<small>Criado em 19 de outubro de 2023.</small>
<small>Última edição em 19 de outubro de 2023.</small>
<small>Eldes (www.eldes.com)</small>