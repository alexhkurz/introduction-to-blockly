// const xml = Blockly.Xml.textToDom('<xml><block type="text_print"><value name="TEXT"><block type="text" ><field name="TEXT">Hello, World!</field></block></value></block></xml>');
// const block = Blockly.Xml.domToBlock(xml, workspace);



// Define a custom block
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#json
Blockly.defineBlocksWithJsonArray([{
    "type": "string_length",
    "message0": 'length of %1',
    "args0": [
        {
            "type": "input_value",
            "name": "VALUE",
            "check": "String"
        }
    ],
    "output": "Number",
    "colour": 160,
    "tooltip": "Returns number of letters in the provided text.",
    "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
}]);

Blockly.defineBlocksWithJsonArray([{
    "type": "myString",
    "message0": 'Hello My Friend',
    "output": "String",
    "colour": 360,
}]);

Blockly.defineBlocksWithJsonArray([{
    "type": "econ_action",
    "message0": "%1 %2 %3 %4",
    "args0": [
        {
            "type": "field_image",
            "src": "https://www.gstatic.com/codesite/ph/images/star_on.gif",
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
        },
        {
            "type": "field_number",
            "name": "NAME",
            "value": 0,
            "min": 0,
            "max": 6
        },
        {
            "type": "input_value",
            "name": "NAME",
            "check": "Number"
        },
        {
            "type": "input_dummy"
        }
    ],
    "colour": 260,
    "tooltip": "Some cool block",
    "helpUrl": ""
}]);

// Useful tool for creating custom blocks:
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html

// Define a custom toolbox
const toolbox = {
    "kind": "flyoutToolbox",
    "contents": [
        {
            "kind": "block",
            "type": "text_print"
        },
        {
            "kind": "block",
            "type": "string_length"
        },
        {
            "kind": "block",
            "type": "econ_action"
        },
        {
            "kind": "block",
            "type": "myString"
        },
    ]
}


const workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });

function runCode() {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    eval(code);
}

// Not sure why you'd do this?
// fetch('http://localhost:3000')
//     .then(response => response.text())
//     .then(message => {
//         const messageElement = document.getElementById('message');
//         messageElement.innerText = message;
//     });