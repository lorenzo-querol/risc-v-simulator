
# risc-v-simulator

This is a RISC-V simulator written in TypeScript. It is a work in progress, but support for RV32I is functional. The simulator is written for sequential execution, and does not yet support pipelining.

*This is a final project developed in fulfillment of my Multiprocessing and Parallel Computing subject in 2022*


## Features

- Single-step execution mode 
    - The user can step through each instruction
- Full execution mode 
    - The simulator will run until it reaches the end of the program
- Initial value setter 
    - The user can set initial values for registers `x1-x31`, and the memory locations `0x00000000-0x00007FF` 
    - The program will run from memory location `0x00001000-0x00001FFF`
- Visible internal register values
    - The user can also see the internal registers per cycle of the written program, which includes the `PC, NPC, IR, A, B, IMM, ALU, COND, LMD`, and `RN` registers

### Instructions Supported
- ADDI
- ADD
- SUB
- OR
- ORI
- BEQ
- BNE
- BLT
- SW
- LW
## Run Locally

Clone the project

```bash
  git clone https://github.com/lorenzo-querol/risc-v-simulator
```

Go to the project directory

```bash
  cd risc-v-simulator
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Known Bugs

- [ ]   Operations that lead to negative values are not yet properly supported and displayed
- [ ]   UI/UX issues such as double pressing the start button to actually start the program
