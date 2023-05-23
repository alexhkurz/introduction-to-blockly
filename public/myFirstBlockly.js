// Useful tool for creating custom blocks:
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#json

// defineBlocksWithJsonArray takes an array of json objects of blocks
Blockly.defineBlocksWithJsonArray([
    {
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
    },
    {
        "type": "myString",
        "message0": 'myString Label: %1', // Must reference all args below using %n notation
        // Built-in field types - https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/overview
        "args0": [
            {
                "type": "field_label", // Non-editable text AKA label - built in field type
                "name": "ARG1_VALUE",
                "text": "Static String Value!", // Default text
                "editable": false
            }
        ],
        "output": "String",
        "colour": 360,
    },
    {
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
    }
]);

// Define the javascript returned from a specific block type

Blockly.JavaScript['myString'] = function (block) {
    // Fetch value of a 'field' or argument of the block. Defined in "arg0" children
    var text_value = block.getFieldValue('ARG1_VALUE');
    return [JSON.stringify(text_value), Blockly.JavaScript.ORDER_ATOMIC];
    // Must include Blockly order for operation precedence
    // See https://developers.google.com/blockly/guides/create-custom-blocks/operator-precedence
};

Blockly.JavaScript['string_length'] = function (block) {
    // Fetch value of a 'field' or argument of the block. Defined in "arg0" children
    // Value to code returns a 'code' type of that field, in this case a literal string
    // value_string will hold 'Static String Value!'
    var value_string = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_string + '.length'
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
    // Must include Blockly order for operation precedence
    // See https://developers.google.com/blockly/guides/create-custom-blocks/operator-precedence
};


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
const codeDisplay = document.querySelector('#codeDisplay')

function updateCode(e) {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    codeDisplay.innerHTML = code;
}
workspace.addChangeListener(updateCode);

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