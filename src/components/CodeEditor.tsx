import React, { useState } from "react";
import Editor from "@monaco-editor/react";

type CodeEditorProps = {
	code: string;
	onChange: (action: string, data: string) => void;
};

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
	const [value, setValue] = useState(code || "");

	const handleEditorChange = (value: string | undefined) => {
		if (!value) return;

		setValue(value);
		onChange("code", value);
	};

	return (
		<>
			<div className="font-semibold text-white">Editor</div>
			<div className="overflow-hidden rounded-md overlay">
				<Editor
					height="51vh"
					value={value}
					onChange={handleEditorChange}
					defaultValue="# Start coding here"
				/>
			</div>
		</>
	);
};

export default CodeEditor;
