import { DataEntry, Instruction, Register } from "../types";
import { MEMORY_LOCATIONS, INSTRUCTIONS_OPCODES } from "../constants";
import { parse } from "path";

const getOperation = (funct3: string, opcode: string, funct7?: string) => {
	let instruction = INSTRUCTIONS_OPCODES.find(
		(instruction) => instruction.funct3 === funct3 && instruction.opcode === opcode,
	);

	if ("funct7" in instruction!) {
		instruction = INSTRUCTIONS_OPCODES.find(
			(instruction) =>
				instruction.funct3 === funct3 &&
				instruction.opcode === opcode &&
				instruction.funct7 === funct7,
		);
	}

	if (!instruction) throw new Error("Unsupported instruction");

	return instruction.name;
};

const executeOperation = (
	currentPC: string,
	operation: string,
	a: string,
	b: string,
	imm: string,
	type: string,
) => {
	const A = parseInt(a, 16);
	const B = parseInt(b, 16);
	const IMM = parseInt(imm, 16);
	let COND = 0;
	let ALU;

	switch (operation) {
		case "addi":
			ALU = A + IMM;
			break;

		case "ori":
			ALU = A | IMM;
			break;

		case "add":
			ALU = A + B;
			break;

		case "or":
			ALU = A | B;
			break;

		case "sub":
			console.log(A, B);
			ALU = A - B;
			break;

		case "sw":
			ALU = A + IMM;
			break;

		case "lw":
			ALU = A + IMM;
			break;

		case "beq":
			ALU = parseInt(currentPC, 16) + IMM;
			COND = A === B ? 1 : 0;
			break;

		case "bne":
			ALU = parseInt(currentPC, 16) + IMM;
			COND = A !== B ? 1 : 0;
			break;

		case "blt":
			ALU = parseInt(currentPC, 16) + IMM;
			COND = A < B ? 1 : 0;
			break;

		default:
			throw new Error(`Unsupported Instruction: ${operation}`);
	}

	return [ALU.toString(16).padStart(8, "0").toUpperCase(), COND.toString()];
};

export default function executeProgram(
	instructions: Instruction[],
	data: DataEntry[],
	registers: Register[],
	handleCurrentLineChange: (instruction: string) => void,
	codeLines: string[],
) {
	let IR: string[] = [],
		PC: string[] = [],
		NPC: string[] = [],
		A: string[] = [],
		B: string[] = [],
		IMM: string[] = [],
		COND: string[] = [],
		ALU: string[] = [],
		LMD: string[] = [],
		RN: string[] = [];

	let destRegister;
	let registerName: string;
	let dataEntry;
	let number;
	let operation;
	let branchResults;
	let dataStart = MEMORY_LOCATIONS.find((instruction: any) => instruction.name === "DATA_START")
		?.address!;
	let dataEnd = MEMORY_LOCATIONS.find((instruction: any) => instruction.name === "DATA_END")
		?.address!;

	let currentPC = MEMORY_LOCATIONS.find(
		(instruction: any) => instruction.name === "PROGRAM_START",
	)?.address!;

	instructions.map((instruction, index) => {
		handleCurrentLineChange(codeLines[index]);

		if (parseInt(currentPC, 16) === parseInt(instruction.memoryLocation, 16)) {
			// IF cycle
			IR.push(instruction.hexOpcode);
			PC.push(parseInt(currentPC, 16).toString(16).padStart(8, "0").toUpperCase());
			NPC.push((parseInt(currentPC, 16) + 4).toString(16).padStart(8, "0").toUpperCase());

			// ID cycle
			registerName = `x${parseInt(instruction.binOpcode.slice(12, 17), 2)}`;
			destRegister = registers.find((register) => register.name === registerName);
			A.push(destRegister!.hex);

			registerName = `x${parseInt(instruction.binOpcode.slice(7, 12), 2)}`;
			destRegister = registers.find((register) => register.name === registerName);
			B.push(destRegister!.hex);

			if (instruction.type === "I" || instruction.type === "R")
				IMM.push(
					parseInt(instruction.binOpcode.slice(0, 12), 2)
						.toString(16)
						.padStart(8, "0")
						.toUpperCase(),
				);

			if (instruction.type === "B" || instruction.type === "S")
				IMM.push(
					parseInt(
						instruction.binOpcode.slice(0, 7) + instruction.binOpcode.slice(20, 25),
						2,
					)
						.toString(16)
						.padStart(8, "0")
						.toUpperCase(),
				);

			// EX cycle
			operation = getOperation(
				instruction.binOpcode.slice(17, 20),
				instruction.binOpcode.slice(25, 32),
				instruction.binOpcode.slice(0, 7),
			);

			branchResults = executeOperation(
				currentPC,
				operation,
				A[index],
				B[index],
				IMM[index],
				instruction.type,
			);

			COND.push(branchResults[1]);
			ALU.push(branchResults[0]);

			// MEM cycle
			if (COND[index] === "1") PC[index] = ALU[index];
			else PC[index] = NPC[index];

			if (operation === "lw") {
				dataEntry = data.find((dataEntry) => {
					return parseInt(dataEntry.memoryLocation, 16) === parseInt(ALU[index], 16);
				});

				if (dataEntry === undefined) LMD.push("00000000");
				else LMD.push(dataEntry.hex);
			} else {
				LMD.push("N/A");
			}

			if (operation === "sw") {
				if (
					parseInt(ALU[index], 16) >= parseInt(dataStart, 16) &&
					parseInt(ALU[index], 16) <= parseInt(dataEnd, 16)
				) {
					let locationFound: boolean = false;

					data = data.map((dataEntry) => {
						if (dataEntry.memoryLocation === ALU[index]) {
							locationFound = true;
							return {
								...dataEntry,
								value: parseInt(B[index], 16),
								bin: parseInt(B[index], 16).toString(2).padStart(32, "0"),
								hex: parseInt(B[index], 16)
									.toString(16)
									.padStart(8, "0")
									.toUpperCase(),
							};
						}
						return dataEntry;
					});

					if (!locationFound)
						data.push({
							memoryLocation: ALU[index],
							value: parseInt(B[index], 16),
							bin: parseInt(B[index], 16).toString(2).padStart(32, "0"),
							hex: parseInt(B[index], 16).toString(16).padStart(8, "0").toUpperCase(),
						});
				} else {
					throw new Error("Memory location out of bounds.");
				}
			}

			// WB cycle
			if (operation === "lw") {
				RN.push(LMD[index]);
				registerName = `x${parseInt(instruction.binOpcode.slice(20, 25), 2)}`;
				registers = registers.map((register) => {
					if (register.name === registerName) {
						return {
							...register,
							value: parseInt(LMD[index], 10),
							hex: parseInt(LMD[index], 16)
								.toString(16)
								.padStart(8, "0")
								.toUpperCase(),
							bin: parseInt(LMD[index], 16).toString(2).padStart(32, "0"),
						};
					}

					return register;
				});
			} else if (
				operation === "add" ||
				operation === "or" ||
				operation === "sub" ||
				operation === "addi"
			) {
				RN.push(ALU[index]);

				registerName = `x${parseInt(instruction.binOpcode.slice(20, 25), 2)}`;
				registers = registers.map((register) => {
					if (register.name === registerName) {
						return {
							...register,
							value: parseInt(ALU[index], 10),
							hex: parseInt(ALU[index], 16)
								.toString(16)
								.padStart(8, "0")
								.toUpperCase(),
							bin: parseInt(ALU[index], 16).toString(2).padStart(32, "0"),
						};
					}

					return register;
				});
			} else {
				RN.push("N/A");
			}

			currentPC = PC[index];
		} else {
			// IF cycle
			IR.push(" ");
			PC.push(" ");
			NPC.push(" ");
			A.push(" ");
			B.push(" ");
			IMM.push(" ");
			COND.push(" ");
			ALU.push(" ");
			LMD.push(" ");
			RN.push(" ");
		}
	});

	return {
		table: { IR, PC, NPC, A, B, IMM, COND, ALU, LMD, RN },
		data: data,
		registers: registers,
	};
}
