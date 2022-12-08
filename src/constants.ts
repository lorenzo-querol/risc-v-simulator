export const MODES = [
	{ id: 1, name: "Single-Step Instruction Mode" },
	{ id: 2, name: "Full Execution Mode" },
];

export const INITIAL_REGISTERS = [
	{ name: "x0", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x1", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x2", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x3", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x4", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x5", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x6", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x7", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x8", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x9", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x10", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x11", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x12", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x13", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x14", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x15", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x16", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x17", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x18", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x19", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x20", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x21", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x22", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x23", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x24", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x25", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x26", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x27", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x28", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x29", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x30", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
	{ name: "x31", value: 0, bin: "00000000000000000000000000000000", hex: "00000000" },
];

export const MEMORY_LOCATIONS = [
	{ name: "DATA_START", address: "00000000" },
	{ name: "DATA_END", address: "000007FF" },
	{ name: "PROGRAM_START", address: "00001000" },
	{ name: "PROGRAM_END", address: "00001FFF" },
];

export const INSTRUCTIONS_OPCODES = [
	{ name: "add", funct7: "0000000", funct3: "000", opcode: "0110011" },
	{ name: "sub", funct7: "0100000", funct3: "000", opcode: "0110011" },
	{ name: "addi", funct3: "000", opcode: "0010011" },
	{ name: "ori", funct3: "110", opcode: "0010011" },
	{ name: "or", funct7: "0000000", funct3: "110", opcode: "0110011" },
	{ name: "beq", funct3: "000", opcode: "1100011" },
	{ name: "bne", funct3: "001", opcode: "1100011" },
	{ name: "blt", funct3: "100", opcode: "1100011" },
	{ name: "lw", funct3: "010", opcode: "0000011" },
	{ name: "sw", funct3: "010", opcode: "0100011" },
];

export const SUPPORTED_INSTRUCTIONS = [
	"add",
	"sub",
	"addi",
	"ori",
	"or",
	"beq",
	"bne",
	"blt",
	"lw",
	"sw",
];
