import {
	MEMORY_LOCATIONS,
	SUPPORTED_INSTRUCTIONS,
	INSTRUCTIONS_OPCODES,
	MODES,
} from "../constants";
import { Instruction, Mode } from "../types";

export const preprocessCode = (code: string) => {
	// Split code by new lines
	const codeLines = code.split("\n");

	// Remove any empty lines or whitespace lines
	const noEmptyLines = codeLines.filter((codeLine) => codeLine.trim() !== "");

	// Remove any carriage return \r characters at the end of each line
	const noCarriageReturns = noEmptyLines.map((codeLine) => {
		return codeLine.replace(/\\[a-z]/, "");
	});

	// Remove any comments
	const noComments = noCarriageReturns.filter((codeLine) => {
		return !codeLine.trim().startsWith("#");
	});

	return noComments; // Cleaned code at this point
};

const assignAddressLocations = (code: string[]) => {
	let instructions: Instruction[] = [];

	// Assign memory locations to each instruction
	let programStart = MEMORY_LOCATIONS.find((location) => location.name === "PROGRAM_START")
		?.address!;

	const programEnd = MEMORY_LOCATIONS.find((location) => location.name === "PROGRAM_END")
		?.address!;

	let tempLocation = 0;
	code.forEach((codeLine, index) => {
		if (parseInt(programStart, 16) > parseInt(programEnd, 16))
			throw new Error("Program is too large to fit in memory.");

		instructions.push({
			memoryLocation: programStart.toUpperCase().padStart(8, "0"),
			hexOpcode: codeLine,
			binOpcode: "",
			type: "",
		});
		tempLocation = parseInt(programStart, 16) + 4;
		programStart = tempLocation.toString(16);
	});

	return instructions;
};

const getInstructionType = (opcode: string) => {
	// If the opcode is not supported, throw an error
	if (!SUPPORTED_INSTRUCTIONS.includes(opcode))
		throw new Error(`Unsupported instruction: ${opcode}`);

	if (opcode === "addi" || opcode === "ori" || opcode === "lw") return "I";
	if (opcode === "add" || opcode === "or" || opcode === "sub") return "R";
	if (opcode === "sw") return "S";
	if (opcode === "beq" || opcode === "bne" || opcode === "blt") return "B";
};

const encodeInstructions = (instructions: Instruction[]) => {
	let encodedInstructions: Instruction[] = [];
	let instructionType; // R, I, S, or B

	let labelInstruction: Instruction, label: string;
	let labeled: boolean = false;
	let rd: string,
		rs1: string,
		rs2: string,
		imm: string,
		imm_12_10_5: string,
		imm_4_1_11: string,
		imm_11_5: string,
		imm_4_0: string,
		immComponent: string[],
		offset,
		instructionOpcode,
		hexOpcode: string,
		binaryOpcode: string;

	instructions.map((instruction, index) => {
		// Split the instructions by spaces, commas, or colons
		let components = instruction.hexOpcode.split(/[, :]+/);

		// Check if the instruction is labelled or not
		if (components.length <= 4) {
			// Get the instruction type for normal instructions
			instructionType = getInstructionType(components[0]);
			labeled = false;
		} else {
			instructionType = getInstructionType(components[1]);
			labeled = true;
		}

		// Get the instruction opcode
		instructionOpcode = INSTRUCTIONS_OPCODES.find(
			(opcode) => opcode.name === components[labeled ? 1 : 0],
		)!;

		switch (instructionType) {
			case "R":
				if (labeled) {
					rd = parseInt(components[2].split("x")[1]).toString(2).padStart(5, "0");
					rs1 = parseInt(components[3].split("x")[1]).toString(2).padStart(5, "0");
					rs2 = parseInt(components[4].split("x")[1]).toString(2).padStart(5, "0");
				} else {
					rd = parseInt(components[1].split("x")[1]).toString(2).padStart(5, "0");
					rs1 = parseInt(components[2].split("x")[1]).toString(2).padStart(5, "0");
					rs2 = parseInt(components[3].split("x")[1]).toString(2).padStart(5, "0");
				}

				hexOpcode =
					instructionOpcode.funct7 +
					rs2 +
					rs1 +
					instructionOpcode.funct3 +
					rd +
					instructionOpcode.opcode;

				binaryOpcode = hexOpcode;
				break;

			case "I":
				if (labeled) {
					rd = parseInt(components[2].split("x")[1]).toString(2).padStart(5, "0");
					rs1 = parseInt(components[3].split("x")[1]).toString(2).padStart(5, "0");
					imm = parseInt(components[4]).toString(2).padStart(12, "0");
				} else {
					rd = parseInt(components[1].split("x")[1]).toString(2).padStart(5, "0");
					rs1 = parseInt(components[2].split("x")[1]).toString(2).padStart(5, "0");
					imm = parseInt(components[3]).toString(2).padStart(12, "0");

					if (components[0] === "lw") {
						immComponent = components[2].split("(");
						rs1 = parseInt(immComponent[1].replace(")", "").split("x")[1])
							.toString(2)
							.padStart(5, "0");
						imm = parseInt(immComponent[0], 16).toString(2).padStart(12, "0");
					}
				}

				hexOpcode = imm + rs1 + instructionOpcode.funct3 + rd + instructionOpcode.opcode;

				binaryOpcode = hexOpcode;
				break;

			case "S":
				immComponent = components[2].split("(");

				imm = parseInt(immComponent[0]).toString(2).padStart(12, "0");
				imm_11_5 = imm.slice(0, 7);
				imm_4_0 = imm.slice(7, 12);
				rs2 = parseInt(components[1].split("x")[1]).toString(2).padStart(5, "0");
				rs1 = parseInt(immComponent[1].replace(")", "").split("x")[1])
					.toString(2)
					.padStart(5, "0");

				hexOpcode =
					imm_11_5 +
					rs2 +
					rs1 +
					instructionOpcode.funct3 +
					imm_4_0 +
					instructionOpcode.opcode;

				binaryOpcode = hexOpcode;
				break;

			case "B":
				label = components[3];
				labelInstruction = instructions.find((instruction) => {
					return instruction.hexOpcode.startsWith(label);
				})!;

				let offset =
					(parseInt(labelInstruction!.memoryLocation, 16) -
						parseInt(instruction.memoryLocation, 16)) /
					2;

				imm = parseInt(offset.toString()).toString(2).padStart(12, "0");
				imm_12_10_5 = imm.slice(0, 1) + imm.slice(2, 8);
				imm_4_1_11 = imm.slice(8, 12) + imm.slice(1, 2);
				rs2 = parseInt(components[2].split("x")[1]).toString(2).padStart(5, "0");
				rs1 = parseInt(components[1].split("x")[1]).toString(2).padStart(5, "0");

				hexOpcode =
					imm_12_10_5 +
					rs2 +
					rs1 +
					instructionOpcode.funct3 +
					imm_4_1_11 +
					instructionOpcode.opcode;

				binaryOpcode = hexOpcode;
				break;
		}

		if (/(?:[NaN])/.test(hexOpcode))
			throw new Error(`Invalid instruction format: ${instruction.hexOpcode}`);

		hexOpcode = parseInt(hexOpcode, 2).toString(16).padStart(8, "0").toUpperCase();

		encodedInstructions.push({
			memoryLocation: instruction.memoryLocation,
			hexOpcode: hexOpcode,
			binOpcode: binaryOpcode,
			type: instructionType!,
		});
	});

	return encodedInstructions;
};

export default function parseCode(
	mode: Mode,
	code: string,
	handleChangeInstructions: (instructions: Instruction[], preprocessedCode: string[]) => void,
) {
	// Preprocess the lines of code from the editor
	const preprocessedCode = preprocessCode(code);

	// Assign address locations to each instruction
	let instructions: Instruction[] = [];
	instructions = assignAddressLocations(preprocessedCode);

	// Encode the instructions into hex opcodes
	let encodedInstructions: Instruction[] = [];
	encodedInstructions = encodeInstructions(instructions);

	if (mode.name === MODES[1].name)
		handleChangeInstructions(encodedInstructions, preprocessedCode);

	return encodedInstructions;
}
