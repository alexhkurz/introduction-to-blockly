# README.md

Blockly links:
- https://hackmd.io/@alexhkurz/HJu9HgAM2

## Instructions I followed to build a simple Blockly app

### Set up a server

Create a folder, navigate to the folder, run in a terminal

```
npm init
npm install express
```

One can press the return/enter key on all questions. To see what this does view the file `package.json` in an editor. 

Create a file `helloWorld.js` that contains

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

Now start a server on localhost with

```
node helloWorld.js
```

and navigate to the webpage http://localhost:3000/

---


Then

```
npm install blockly
```

This will download and install the `blockly` package and all its dependencies.

After that, you can create an HTML file that includes the Blockly library and your custom JavaScript code. Here is an example HTML file that uses the code you provided in `index.js`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Blockly Example</title>
    <script src="https://unpkg.com/blockly/blockly.min.js"></script>
  </head>
  <body>
    <div id="blocklyDiv"></div>
    <script>
      const workspace = Blockly.inject('blocklyDiv', {toolbox: null});

      const code = `
        const express = require('express');
        const app = express();

        app.get('/', (req, res) => {
          res.send('Hello, World!');
        });

        app.listen(3000, () => {
          console.log('Server listening on port 3000');
        });
      `;

      const xml = Blockly.Xml.textToDom('<xml></xml>');
      const block = Blockly.Xml.domToBlock(xml, workspace);

      block.setFieldValue(code, 'CODE');

      function runCode() {
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        eval(code);
      }
    </script>
    <button onclick="runCode()">Run code</button>
  </body>
</html>
```

This HTML file creates a Blockly workspace, adds a custom block that allows you to enter the code you wrote in `index.js`, and includes a button that allows you to run the generated JavaScript code.

Note that the code you entered in `index.js` is wrapped in a string and set as the default value of the `CODE` field of the custom block. When the user enters code in this block, it will replace the default value of the `CODE` field.

Also note that this example uses `eval()` to run the generated JavaScript code. This is generally not recommended in production code, as it can be a security risk. In a real application, you would want to use a more secure way to run the generated code, such as spawning a child process.

---



