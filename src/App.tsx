import { useEffect, useState } from "react";

import CodeEditor from "./components/CodeEditor";
import ModeSelect from "./components/ModeSelect";
import RegEditor from "./components/RegEditor";
import DataEditor from "./components/DataEditor";
import CurrentLine from "./components/CurrentLine";
import ExecutionTable from "./components/ExecutionTable";
import OpcodeVersion from "./components/OpcodeVersion";

import { DataEntry, ExecutionTableType, Instruction, Mode, Register } from "./types";
import { INITIAL_DATA, INITIAL_EXECUTION_TABLE, INITIAL_INSTRUCTIONS, MODES } from "./constants";
import { INITIAL_REGISTERS } from "./constants";
import parseCode, { preprocessCode } from "./utils/parseCode";
import executeProgram from "./utils/executeProgram";
import SingleStepExecute from "./utils/singleStepExecute";

function App() {
	// Controls
	const [selectedMode, setSelectedMode] = useState<Mode>(MODES[1]);
	const [isExecuted, setIsExecuted] = useState(false);
	const [currentInstruction, setCurrentInstruction] = useState<Instruction>();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLastInstruction, setIsLastInstruction] = useState(false);
	const [isCompiled, setIsCompiled] = useState(false);
	const [currentPC, setCurrentPC] = useState("00001000");

	// Code Content
	const [code, setCode] = useState<string>("");
	const [codeLines, setCodeLines] = useState<string[]>([]);
	const [currentLine, setCurrentLine] = useState<string>("");
	const [instructions, setInstructions] = useState<Instruction[]>([]);
	const [preprocessedCode, setPreprocessedCode] = useState<string[]>([""]);
	const [executionTable, setExecutionTable] =
		useState<ExecutionTableType>(INITIAL_EXECUTION_TABLE);
	const [data, setData] = useState<DataEntry[]>(INITIAL_DATA);
	const [registers, setRegisters] = useState<Register[]>(INITIAL_REGISTERS);
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		console.log("Preprocessed", preprocessedCode);
		console.log("Instructions", instructions);
	}, [preprocessedCode, instructions]);

	const onChange = (action: string, data: string) => {
		switch (action) {
			case "code": {
				setCode(data);
				break;
			}
			default: {
				console.warn("Case not handled!", action, data);
			}
		}
	};

	const handleRegisterChange = (value: string, name: string) => {
		const newRegisters = registers.map((register) => {
			if (register.name === name) {
				return {
					...register,
					value: parseInt(value),
					hex: parseInt(value).toString(16).padStart(8, "0").toUpperCase(),
					bin: parseInt(value).toString(2).padStart(32, "0"),
				};
			}

			return register;
		});

		setRegisters(newRegisters);
	};

	const handleDataChange = (value: string, memoryLocation: string) => {
		let found = false;
		let newData = data.map((dataEntry) => {
			if (parseInt(dataEntry.memoryLocation, 16) === parseInt(memoryLocation, 16)) {
				found = true;
				return {
					...dataEntry,
					value: parseInt(value),
					hex: parseInt(value).toString(16).padStart(8, "0").toUpperCase(),
					bin: parseInt(value).toString(2).padStart(32, "0"),
				};
			}

			return dataEntry;
		});

		if (!found) {
			newData.push({
				memoryLocation: parseInt(memoryLocation, 16)
					.toString(16)
					.padStart(8, "0")
					.toUpperCase(),
				value: parseInt(value),
				hex: parseInt(value).toString(16).padStart(8, "0").toUpperCase(),
				bin: parseInt(value).toString(2).padStart(32, "0"),
			});
		}

		setData(newData);
	};

	const handleModeSelect = (mode: Mode) => {
		setSelectedMode(mode);
	};

	const handleCurrentIndexChange = () => {
		setCurrentIndex(currentIndex + 1);
	};
	const handleSingleStep = () => {
		if (isLastInstruction) return;

		handleCurrentLineChange(preprocessedCode[currentIndex]);

		let executionResults: any;
		executionResults = SingleStepExecute(
			instructions[currentIndex],
			currentIndex,
			executionTable,
			data,
			registers,
			currentPC,
		);

		setExecutionTable(executionResults.table);
		setRegisters(executionResults.registers);
		setData(executionResults.data);
		setCurrentPC(executionResults.currentPC);

		handleCurrentIndexChange();
		if (currentIndex + 1 === instructions.length) setIsLastInstruction(true);
	};

	const handleFullExecution = () => {
		setIsExecuted(true);

		try {
			let executionResults: any;
			executionResults = executeProgram(
				instructions,
				data,
				registers,
				handleCurrentLineChange,
				preprocessedCode,
			);

			setExecutionTable(executionResults.table);
			setRegisters(executionResults.registers);
			setData(executionResults.data);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			}
		}
	};

	const handleCompile = () => {
		setIsCompiled(true);

		try {
			let parseResults;
			parseResults = parseCode(selectedMode, code);

			setPreprocessedCode(parseResults.preprocessed);
			setInstructions(parseResults.encoded);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			}
		}
	};

	const handleCurrentLineChange = (instruction: string) => {
		setCurrentLine(instruction);
	};

	const handleReset = () => {
		setExecutionTable({
			IR: [],
			NPC: [],
			PC: [],
			A: [],
			B: [],
			ALU: [],
			IMM: [],
			LMD: [],
			COND: [],
			RN: [],
		});
		setIsExecuted(false);
		setRegisters(INITIAL_REGISTERS);
		setData(INITIAL_DATA);
		setInstructions([]);
		setErrorMessage("");
		setCurrentLine("");
		setCurrentIndex(0);
		setCurrentInstruction(undefined);
		setIsLastInstruction(false);
		setPreprocessedCode([""]);
		setIsCompiled(false);
		setCurrentPC("00001000");
	};

	return (
		<div className="min-h-screen pt-4 bg-slate-800">
			{/* Header */}
			<div className="flex items-center justify-center w-full h-4 p-5 space-x-4 text-white">
				{/* Title */}
				<div className="font-semibold text-center lg:text-2xl">RISC-V Simulator</div>
			</div>

			{/* Body */}
			<div className="flex flex-col justify-center p-4 space-y-4">
				<div className="flex flex-col mx-24 xl:flex-row xl:space-x-4">
					<div className="w-full space-y-4">
						<CodeEditor code={code} onChange={onChange} />
						<CurrentLine currentLine={currentLine} errorMessage={errorMessage} />
						<div className="flex flex-row items-center text-xs text-slate-400">
							This web application was made by Lorenzo S. Querol, 2022
						</div>
					</div>

					<div className="flex flex-col content-around space-y-4 w-fit">
						<RegEditor
							registers={registers}
							handleRegisterChange={handleRegisterChange}
						/>

						<div className="flex flex-col justify-center space-y-4">
							{/* Mode select */}
							<ModeSelect
								selectedMode={selectedMode}
								handleModeSelect={handleModeSelect}
							/>

							<div className="flex flex-row justify-center h-full space-x-4">
								{/* Compile button */}
								<button
									onClick={handleCompile}
									disabled={isCompiled}
									className={`${
										isCompiled ? "contrast-50" : ""
									} flex items-center justify-center w-32 px-2 py-2 space-x-3 bg-green-500 rounded-lg`}
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
									<div className="font-semibold">Compile</div>
								</button>

								{/* Run button */}
								<button
									onClick={handleFullExecution}
									disabled={isCompiled && isExecuted}
									className={`${
										isCompiled && isExecuted ? "contrast-50" : ""
									} flex items-center justify-center w-32 px-2 py-2 space-x-3 bg-green-500 rounded-lg`}
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
									disabled={!isExecuted && !isCompiled}
									className={`${
										!isExecuted && !isCompiled ? "contrast-50" : ""
									} flex items-center justify-center w-32 px-2 py-2 space-x-3 bg-orange-500 rounded-lg`}
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
									onClick={handleSingleStep}
									disabled={
										selectedMode.name !== MODES[0].name
											? isLastInstruction
												? true
												: false
											: false
									}
									className={`${
										selectedMode.name !== MODES[0].name ? "contrast-50" : ""
									} flex items-center justify-center w-32 px-2 py-2 space-x-3 bg-green-500 rounded-lg`}
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
						</div>
					</div>
				</div>

				<div className="flex flex-row mx-24 space-x-4">
					<div className="flex flex-col w-fit">
						<OpcodeVersion instructions={instructions} />
					</div>
					<div className="flex flex-col w-fit">
						<DataEditor data={data} handleDataChange={handleDataChange} />
					</div>
					<div className="flex flex-col w-1/2">
						<ExecutionTable executionTable={executionTable} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
