// variables of the economy
var index_donor = 0;
var index_recipient = 0;
var action = 3;

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
        "type": "action",
        "message0": 'Action: %1', // Must reference all args below using %n notation
        // Built-in field types - https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/overview
        "args0": [
            {
                "type": "field_number", // Field implies a raw input into that block's 'field'
                "name": "NUM", // Use this in block.getFieldValue
                "value": 3,
                "min": 0,
                "max": 6,
                // "precision": 10
            }
        ],
        "output": "Number", // Return type
        "colour": 120,
    },
    {
        "type": "action_const",
        "message0": 'Action', // Must reference all args below using %n notation
        // Built-in field types - https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/overview
        "output": "Number", // Return type
        "colour": 120,
    },
    {
        "type": "updateIndexDonor",
        "message0": 'Update Donor Index by %1', // Must reference all args below using %n notation
        "args0": [
            {
                "type": "input_value", // Input implies another block will be plugged into here
                "name": "INPUT_VAL",
            }
        ],
        "output": "String", // String output expected to be able to output code
        "colour": 210,
    },
    {
        "type": "updateIndexRecipient",
        "message0": 'Update Recipient Index by %1', // Must reference all args below using %n notation
        "args0": [
            {
                "type": "input_value",
                "name": "INPUT_VAL",
            }
        ],
        "output": "String",
        "colour": 210,
    },
    {
        "type": "negate",
        "message0": '- %1', // Must reference all args below using %n notation
        "args0": [
            {
                "type": "input_value",
                "name": "NUM",
                "check": "Number"
            }
        ],
        "output": "Number",
        "colour": 360,
    },
]);

// Define the javascript returned from a specific block type
// Code return definition

Blockly.JavaScript['action'] = function (block) {
    // Fetch value of a 'field' or argument of the block. Defined in "arg0" children
    var text_value = block.getFieldValue('NUM');
    return [text_value, Blockly.JavaScript.ORDER_ATOMIC];
    // Must include Blockly order for operation precedence
    // See https://developers.google.com/blockly/guides/create-custom-blocks/operator-precedence
};

Blockly.JavaScript['action_const'] = function (block) {
    // Fetch value of a 'field' or argument of the block. Defined in "arg0" children
    var value = action;
    return [value, Blockly.JavaScript.ORDER_ATOMIC];
    // Must include Blockly order for operation precedence
    // See https://developers.google.com/blockly/guides/create-custom-blocks/operator-precedence
};

Blockly.JavaScript['updateIndexDonor'] = function (block) {
    var val = Blockly.JavaScript.valueToCode(block, 'INPUT_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `index_donor += ${val}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['updateIndexRecipient'] = function (block) {
    var val = Blockly.JavaScript.valueToCode(block, 'INPUT_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `index_recipient += ${val}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['negate'] = function (block) {
    var val = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `-${val}`
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
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

// List of pre-defined blocks - https://github.com/google/blockly/blob/master/blocks/

// Define a custom toolbox
const toolbox = {
    "kind": "flyoutToolbox",
    "contents": [
        {
            "kind": "block",
            "type": "action"
        },
        {
            "kind": "block",
            "type": "action_const"
        },
        {
            "kind": "block",
            "type": "updateIndexDonor"
        },
        {
            "kind": "block",
            "type": "updateIndexRecipient"
        },
        {
            "kind": "block",
            "type": "negate"
        },
    ]
}

const workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });

function updateCode(e) {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    document.querySelector('#codeDisplay').innerHTML = code;
    document.querySelector('#indexDonor').innerHTML = index_donor;
    document.querySelector('#indexRecipient').innerHTML = index_recipient;
}

workspace.addChangeListener(updateCode);

function runCode() {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    eval(code);
    updateCode();
}
