import { useEffect, useState } from "react";

import CodeEditor from "./components/CodeEditor";
import ModeSelect from "./components/ModeSelect";
import RegEditor from "./components/RegEditor";
import CurrentLine from "./components/CurrentLine";
import ExecutionTable from "./components/ExecutionTable";

import { Mode, Register } from "./types";
import { MODES } from "./constants";
import { INITIAL_REGISTERS } from "./constants";

function App() {
	// Controls
	const [selectedMode, setSelectedMode] = useState<Mode>(MODES[1]);
	const [isExecuted, setIsExecuted] = useState(false);
	const [isLastInstruction, setIsLastInstruction] = useState(false);

	// Code Content
	const [code, setCode] = useState<string>("");
	const [currentLine, setCurrentLine] = useState<string>("");
	const [registers, setRegisters] = useState<Register[]>(INITIAL_REGISTERS);

	const onChange = (action: string, data: string) => {
		switch (action) {
			case "code": {
				setCode(data);
				break;
			}
			default: {
				console.warn("case not handled!", action, data);
			}
		}
	};

	const handleRegisterChange = (value: string, name: string) => {
		const newRegisters = registers.map((register) => {
			if (register.name === name) {
				return {
					...register,
					value: parseInt(value),
					hex: parseInt(value).toString(16),
					bin: parseInt(value).toString(2),
				};
			}

			return register;
		});

		setRegisters(newRegisters);
	};

	const handleModeSelect = (mode: Mode) => {
		setSelectedMode(mode);
	};

	const handleExecute = () => {
		setIsExecuted(true);
	};

	const handleReset = () => {
		setIsExecuted(false);
	};

	return (
		<div className="pt-4 bg-slate-800 h-screen">
			<div className="flex items-center justify-center w-full h-4 p-5 space-x-4 text-white">
				{/* Title */}
				<div className="text-3xl font-semibold">RISC-V Simulator</div>

				<ModeSelect selectedMode={selectedMode} handleModeSelect={handleModeSelect} />

				{/* Run button */}
				<button
					onClick={handleExecute}
					disabled={isExecuted}
					className={`${
						isExecuted ? "contrast-50" : ""
					} flex items-center justify-center w-32 px-4 py-2 space-x-3 bg-green-500 rounded-lg`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
						/>
					</svg>
					<div className="font-semibold">Run</div>
				</button>

				{/* Reset button */}
				<button
					onClick={handleReset}
					disabled={!isExecuted}
					className={`${
						!isExecuted ? "contrast-50" : ""
					} flex items-center justify-center w-32 px-4 py-2 space-x-3 bg-orange-500 rounded-lg`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
						/>
					</svg>
					<div className="font-semibold">Reset</div>
				</button>

				{/* Step button */}
				<button
					disabled={selectedMode.name !== MODES[0].name ? true : false}
					className={`${
						selectedMode.name !== MODES[0].name ? "contrast-50" : ""
					} flex items-center justify-center w-32 px-4 py-2 space-x-3 bg-green-500 rounded-lg`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
						/>
					</svg>
					<div className="font-semibold">Step</div>
				</button>
			</div>

			<div className="flex flex-col justify-center p-4 mx-60">
				<div className="flex flex-row space-x-4 h-[37.5rem]">
					<div className="w-full">
						<CodeEditor onChange={onChange} />
					</div>
					<div>
						<RegEditor
							registers={registers}
							handleRegisterChange={handleRegisterChange}
						/>
						<CurrentLine currentLine={currentLine} />
						<div className="text-slate-400 text-xs items-center flex flex-row mt-2">
							This project was made by Lorenzo S. Querol, 2022
						</div>
					</div>
				</div>

				<div className="pt-0.5 my-4 bg-white rounded-full"></div>

				<div className="w-full">
					<ExecutionTable />
				</div>
			</div>
		</div>
	);
}

export default App;
