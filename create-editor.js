let minDim = 1;

// const sampleProgram = `\
// import java.util.Scanner;

// public static void Main
// {
//     public static void main(String[] args) {
//         Scanner keyboard = new Scanner(System.in);

//         System.out.print("Enter width: ");
//         float width = keyboard.nextFloat();

//         System.out.print("Enter height: ");
//         float height = keyboard.nextFloat();
        
//         float area = width * height;

//         System.out.println("area: " + area);
//     }
// }`;
const sampleProgram = `\
import java.util.Scanner;

public static void Main
{
    public static void main(String[] args) {
        Scanner keyboard = new Scanner(System.in);
        
        System.out.println("Enter width: ");
        float width = keyboard.nextFloat();

        System.out.println("Enter height: ");
        float height = keyboard.nextFloat();

        float area = width * height;
        System.out.println("Area: " + area);
    }
}`;

//wait for the page to load since Monaco's JS won't be ready until then
let editor;

window.onload = function () {
    editor = monaco.editor.create(
        document.getElementById('monaco-editor-window'), {
            value: sampleProgram,
            language: 'cpp',
            theme: 'vs-dark',
            minimap: {
                enabled: false
            },
            scrollBeyondLastLine: false,
        }
    );

    editor.addAction({
        // An unique identifier of the contributed action.
        id: 'duplicate-selection-id',

        // A label of the action that will be presented to the user.
        label: 'Duplicate Selection',

        // An optional array of keybindings for the action.
        keybindings: [
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_D,
            // chord
            // monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M)
        ],

        // A precondition for this action.
        precondition: null,

        // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
        keybindingContext: null,

        contextMenuGroupId: '9_cutcopypaste',

        contextMenuOrder: 4,

        // Method that will be executed when the action is triggered.
        // @param editor The editor instance is passed in as a convinience
        run: function (editor) {
            // editor.trigger('keyboard', 'type', { text: "test" });

            let currentSelection = editor.getSelection();

            let {
                lineNumber,
                column
            } = currentSelection.getEndPosition();
            let selectedText;
            let insertColumn = column;

            // pressign CTRL-D without selecting text should duplicate the line the cursor is on
            if (currentSelection.isEmpty()) {
                selectedText = editor.getModel().getLineContent(lineNumber) + '\n';
                ++lineNumber;
                insertColumn = 1;
            } else {
                selectedText = editor.getModel().getValueInRange(currentSelection);
            }

            editor.executeEdits("", [{
                range: {
                    startLineNumber: lineNumber,
                    startColumn: insertColumn,
                    endLineNumber: lineNumber,
                    endColumn: insertColumn
                },
                text: selectedText
            }]);

            const newSelection = editor.getSelection().setStartPosition(lineNumber, column);
            editor.setSelection(newSelection);

            return null;
        }
    });

    window.onresize = function () {
        editor.layout();
    }
    window.onresize();
}