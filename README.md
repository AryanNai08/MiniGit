# MiniGit 🌀

A lightweight Git-like version control system built in Node.js to understand core Git concepts like staging, committing, hashing, and file tracking without using Git itself.

## 🔧 Features

- `init` ➤ Initializes a `.minigit` version directory
- `add` ➤ Stages files for commit (based on file content hash)
- `commit` ➤ Commits staged files with a message and hash
- `log` ➤ Displays commit history
- Uses SHA-1 hashing (like Git) to track unique file versions
- Simple CLI-based interface

---

## 🚀 How to Run

### 1. Clone the Repo


git clone https://github.com/AryanNai08/MiniGit.git
cd MiniGit



2. Install dependencies

npm install




3. Run Commands

Copy code
node minigit.js init
node minigit.js add test.txt
node minigit.js commit -m "Initial version"
node minigit.js log



❓ Why This Project?
To understand:

How Git tracks file changes using hashes

Version control principles without relying on external tools

The internal workflow of commands like add, commit, and log

👨‍💻 Author
Aryan Nai
GitHub: @AryanNai08

📜 License
This project is licensed for learning and educational use only.