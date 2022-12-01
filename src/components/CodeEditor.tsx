import React, { useState } from "react";
import Editor from "@monaco-editor/react";

type CodeEditorProps = {
	onChange: (action: string, data: string) => void;
};

const CodeEditor = ({ onChange }: CodeEditorProps) => {
	const [value, setValue] = useState("");

	const handleEditorChange = (value: string) => {
		setValue(value);
		onChange("code", value);
	};

	return (
		<div className="w-full h-full overflow-hidden rounded-xl overlay shadow-4xl">
			<Editor
				height="60vh"
				width={`100%`}
				value={value}
				defaultValue="# Start coding here"
				// onChange={handleEditorChange}
			/>
		</div>
	);
};

export default CodeEditor;
