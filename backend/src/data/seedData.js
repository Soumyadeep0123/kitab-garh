const User = require('../models/User');
const Category = require('../models/Category');
const Book = require('../models/Book');
const Review = require('../models/Review');
const Purchase = require('../models/Purchase');
const ReadingProgress = require('../models/ReadingProgress');

const sampleCategories = [
  {
    name: "Computer Science & Programming",
    slug: "programming",
    description: "Foundational programming languages, algorithms, data structures, and computer science theory.",
    icon: "Code"
  },
  {
    name: "Artificial Intelligence & ML",
    slug: "ai-ml",
    description: "Machine learning models, deep learning neural networks, natural language processing, and computer vision.",
    icon: "Cpu"
  },
  {
    name: "Database Management Systems",
    slug: "database",
    description: "Relational databases, SQL, NoSQL, transaction management, indexing, and distributed storage.",
    icon: "Database"
  },
  {
    name: "Web & Cloud Architecture",
    slug: "web-cloud",
    description: "Modern full-stack web frameworks, microservices, cloud deployments, Docker, and RESTful APIs.",
    icon: "Globe"
  },
  {
    name: "Literature & Classic Novels",
    slug: "literature",
    description: "World-renowned literary classics, fiction, historical masterpieces, and timeless storytelling.",
    icon: "Book"
  },
  {
    name: "Science & Mathematics",
    slug: "science-math",
    description: "Physics, discrete mathematics, linear algebra, statistics, and scientific problem-solving.",
    icon: "Compass"
  }
];

const sampleBooks = [
  {
    title: "Eloquent JavaScript: A Modern Introduction to Programming",
    author: "Marijn Haverbeke",
    authorBio: "Independent software developer and author of Eloquent JavaScript and creator of CodeMirror and ProseMirror.",
    categorySlug: "programming",
    description: "This is a book about JavaScript, programming, and the digital wonderland. It provides a deep dive into the language, showing how to write clean, beautiful, and effective code.",
    price: 0,
    isFree: true,
    coverImage: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=600&q=80",
    pagesCount: 472,
    publishedYear: 2024,
    language: "English",
    isbn: "978-1593279509",
    format: "PDF & Web Reader",
    fileUrl: "https://eloquentjavascript.net/Eloquent_JavaScript.pdf",
    featured: true,
    averageRating: 4.9,
    ratingsCount: 38,
    chapters: [
      {
        chapterNumber: 1,
        title: "Values, Types, and Operators",
        content: `Inside the computer's world, there is only data. You can read data, modify data, and create new data; but that which isn't data simply does not exist. All this data is stored as long sequences of bits and is thus fundamentally alike.

### 1.1 Numbers
Numbers in JavaScript are values of numeric type. JavaScript uses a fixed number of bits—64 of them—to store a single number value.
\`\`\`javascript
let total = 100 + 4 * 11;
console.log(total); // 144
\`\`\`

### 1.2 Strings
Strings are used to represent text. They are written by enclosing their content in quotes:
\`\`\`javascript
let greeting = "Hello, KitabGhar reader!";
let multiline = \`This is chapter 1 of Eloquent JavaScript.\`;
\`\`\`

### 1.3 Booleans & Comparisons
The boolean type has just two values: \`true\` and \`false\`.
- Comparison operators: \`>\`, \`<\`, \`>=\`, \`<=\`, \`===\`, \`!==\`
- Logical operators: \`&&\` (and), \`||\` (or), \`!\` (not).

### 1.4 Automatic Type Conversion (Coercion)
When an operator is applied to the "wrong" type of value, JavaScript will quietly convert that value to the type it needs using a set of rules that often aren't what you want or expect:
\`\`\`javascript
console.log(8 * null);     // 0
console.log("5" - 1);       // 4
console.log("5" + 1);       // 51
console.log("five" * 2);    // NaN
\`\`\`
`
      },
      {
        chapterNumber: 2,
        title: "Program Structure and Control Flow",
        content: `A program is a piece of text typed by a programmer. It is our directing script for the computer.

### 2.1 Expressions and Statements
A fragment of code that produces a value is called an expression. Every value that is written literally is an expression. A statement forms a complete sentence:
\`\`\`javascript
let caught = 5 * 5;
\`\`\`

### 2.2 Conditional Execution
Conditional execution is created with the \`if\` keyword in JavaScript. In the simple case, we want some code to be executed if, and only if, a certain condition holds true:
\`\`\`javascript
let num = 35;
if (num < 10) {
  console.log("Small");
} else if (num < 100) {
  console.log("Medium");
} else {
  console.log("Large");
}
\`\`\`

### 2.3 While and Do Loops
Loops allow us to run a piece of code multiple times.
\`\`\`javascript
let number = 0;
while (number <= 12) {
  console.log(number);
  number = number + 2;
}
\`\`\`

### 2.4 For Loops
The \`for\` loop is the most common looping construct in modern JavaScript:
\`\`\`javascript
for (let current = 20; ; current = current + 1) {
  if (current % 7 === 0) {
    console.log("First number divisible by 7 is", current);
    break;
  }
}
\`\`\`
`
      },
      {
        chapterNumber: 3,
        title: "Functions, Closures and Scope",
        content: `Functions are the bread and butter of JavaScript programming. The concept of wrapping a piece of program in a value has many uses.

### 3.1 Defining a Function
A function definition is a regular binding where the value of the binding is a function:
\`\`\`javascript
const square = function(x) {
  return x * x;
};
console.log(square(12)); // 144
\`\`\`

### 3.2 Arrow Functions
Arrow functions are a concise notation introduced in ES6:
\`\`\`javascript
const power = (base, exponent) => {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};
\`\`\`

### 3.3 Closures
The ability to treat functions as values, combined with the fact that local bindings are re-created every time a function is called, brings up an interesting question: what happens to local bindings when the function call that created them is no longer active?
\`\`\`javascript
function multiplier(factor) {
  return number => number * factor;
}

let twice = multiplier(2);
console.log(twice(5)); // 10
\`\`\`
`
      }
    ]
  },
  {
    title: "Automate the Boring Stuff with Python",
    author: "Al Sweigart",
    authorBio: "Software developer, author of numerous Python programming books, and enthusiast teacher of practical computing.",
    categorySlug: "programming",
    description: "Practical programming for total beginners. Learn how to use Python to write programs that do in minutes what would take you hours to do by hand—no prior programming experience required.",
    price: 249,
    isFree: false,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    pagesCount: 504,
    publishedYear: 2024,
    language: "English",
    isbn: "978-1593279929",
    format: "PDF & Web Reader",
    fileUrl: "https://automatetheboringstuff.com/2e/chapter1/",
    featured: true,
    averageRating: 4.9,
    ratingsCount: 42,
    chapters: [
      {
        chapterNumber: 1,
        title: "Python Basics and the Interactive Shell",
        content: `The Python programming language has a wide range of features that make it easy to learn and fun to use.

### 1.1 Entering Expressions into the Interactive Shell
You run the interactive shell by launching IDLE or entering \`python\` in your command terminal.
\`\`\`python
>>> 2 + 2
4
>>> (5 - 1) * ((7 + 1) / (8 - 4))
8.0
\`\`\`

### 1.2 Data Types: Integers, Floats, and Strings
- **Integers**: Whole numbers like -2, 0, 42.
- **Floating-Point Numbers**: Numbers with a decimal point like 3.14, -0.5.
- **Strings**: Text values enclosed in single or double quotes: \`'Alice'\`, \`"Hello World!"\`.

### 1.3 Your First Python Script
\`\`\`python
# This program says hello and asks for my name.
print('Hello, world!')
print('What is your name?')
my_name = input()
print('It is good to meet you, ' + my_name)
print('The length of your name is:', len(my_name))
\`\`\`
`
      },
      {
        chapterNumber: 2,
        title: "Flow Control: Decisions and Loops",
        content: `Flow control statements can decide which Python instructions to execute under which conditions.

### 2.1 Boolean Values & Comparison Operators
Booleans represent \`True\` or \`False\`.
- \`==\` Equal to
- \`!=\` Not equal to
- \`<\`, \`>\`, \`<=\`, \`>=\` Ordering

### 2.2 If-Elif-Else Decision Trees
\`\`\`python
name = 'Bob'
age = 22

if name == 'Alice':
    print('Hi, Alice.')
elif age < 12:
    print('You are not Alice, kiddo.')
elif age > 2000:
    print('Unlike you, Alice is not an undead vampire.')
else:
    print('Hello, stranger.')
\`\`\`

### 2.3 While Loops & Break Statements
\`\`\`python
while True:
    print('Please type your name:')
    name = input()
    if name == 'your name':
        break
print('Thank you!')
\`\`\`
`
      },
      {
        chapterNumber: 3,
        title: "Lists, Dictionaries & Pattern Matching",
        content: `Lists and dictionaries are fundamental Python data structures that let you organize complex information.

### 3.1 Python Lists & Slices
\`\`\`python
spam = ['cat', 'bat', 'rat', 'elephant']
print(spam[0])     # 'cat'
print(spam[-1])    # 'elephant'
print(spam[1:3])   # ['bat', 'rat']
\`\`\`

### 3.2 Dictionaries & Key-Value Pairs
\`\`\`python
my_cat = {'size': 'fat', 'color': 'gray', 'disposition': 'loud'}
print(f"My cat has {my_cat['color']} fur.")
for k, v in my_cat.items():
    print(f"Key: {k}, Value: {v}")
\`\`\`
`
      }
    ]
  },
  {
    title: "Operating Systems: Three Easy Pieces (OSTEP)",
    author: "Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau",
    authorBio: "Professors of Computer Science at University of Wisconsin-Madison and leaders in computer systems architecture and file system research.",
    categorySlug: "web-cloud",
    description: "The fundamental textbook on modern operating systems covering the three core conceptual pillars: Virtualization (CPU & Memory), Concurrency (Threads & Locks), and Persistence (Disks & File Systems).",
    price: 399,
    isFree: false,
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    pagesCount: 680,
    publishedYear: 2024,
    language: "English",
    isbn: "978-1985086593",
    format: "PDF & Web Reader",
    fileUrl: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf",
    featured: true,
    averageRating: 5.0,
    ratingsCount: 56,
    chapters: [
      {
        chapterNumber: 1,
        title: "A Dialogue on Virtualization and the OS Crux",
        content: `How does the operating system provide the illusion of endless computing resources (CPUs, infinite memory) to each running program?

### 1.1 The Virtualization Illusion
The OS takes physical resources (such as the processor, memory, or disk) and transforms them into a virtual form of itself.
1. **Virtualizing the CPU**: Turning a single CPU (or small set of cores) into a seemingly infinite number of CPUs, allowing many programs to run seemingly at the same time.
2. **Virtualizing Memory**: Giving each process its own private, isolated virtual address space.

### 1.2 System Calls & The Trap Mechanism
When a user process needs privileged operations (like reading a file or allocating physical memory):
- It initiates a **system call** (using a software interrupt or trap instruction).
- The hardware switches to **kernel mode** and jumps to a predefined trap table handler.
- Upon completion, the kernel executes a **return-from-trap** instruction back to user mode.
`
      },
      {
        chapterNumber: 2,
        title: "Processes and the Process API (fork, exec, wait)",
        content: `A process is simply a running program. At any moment, we can summarize a process by taking an inventory of the parts of the machine it accesses or affects.

### 2.1 The Process Control Block (PCB)
The OS maintains a structure for each process storing:
- Process ID (PID)
- Program counter (PC)
- Register contents
- Memory address pointers
- File descriptors table

### 2.2 The UNIX Process API in C
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(int argc, char *argv[]) {
    printf("hello world (pid:%d)\\n", (int) getpid());
    int rc = fork();
    if (rc < 0) {
        // fork failed
        fprintf(stderr, "fork failed\\n");
        exit(1);
    } else if (rc == 0) {
        // child (new process)
        printf("hello, I am child (pid:%d)\\n", (int) getpid());
    } else {
        // parent goes down this path
        int rc_wait = wait(NULL);
        printf("hello, I am parent of %d (rc_wait:%d) (pid:%d)\\n",
               rc, rc_wait, (int) getpid());
    }
    return 0;
}
\`\`\`
`
      },
      {
        chapterNumber: 3,
        title: "Concurrency: Threads, Mutex Locks & Semaphores",
        content: `A multi-threaded program has more than one point of execution (i.e. multiple program counters).

### 3.1 Race Conditions
A race condition occurs when multiple threads concurrently execute a critical section of code modifying shared state without synchronization:
\`\`\`c
// Critical Section
counter = counter + 1;
// Compiles into 3 assembly instructions:
// 1. mov 0x8049a1c, %eax
// 2. add $0x1, %eax
// 3. mov %eax, 0x8049a1c
\`\`\`

### 3.2 Mutual Exclusion (Mutex) Locks
Locks provide atomicity to critical sections:
\`\`\`c
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

pthread_mutex_lock(&lock);
counter++; // Protected critical section
pthread_mutex_unlock(&lock);
\`\`\`
`
      }
    ]
  },
  {
    title: "Pro Git: Version Control and Collaborative Engineering",
    author: "Scott Chacon and Ben Straub",
    authorBio: "Co-founder of GitHub and principal maintainers of Git tooling documentation.",
    categorySlug: "web-cloud",
    description: "The official guide to Git, from beginner basics to advanced branching, staging, rebasing, submodule orchestration, and GitHub team workflows.",
    price: 0,
    isFree: true,
    coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=600&q=80",
    pagesCount: 512,
    publishedYear: 2024,
    language: "English",
    isbn: "978-1484200773",
    format: "PDF & Web Reader",
    fileUrl: "https://git-scm.com/book/en/v2",
    featured: false,
    averageRating: 4.8,
    ratingsCount: 29,
    chapters: [
      {
        chapterNumber: 1,
        title: "Getting Started & The Three States of Git",
        content: `What is Git? In short, it is a distributed revision control system designed to handle everything from small to very large projects with speed and efficiency.

### 1.1 Snapshots, Not Differences
The major difference between Git and any other VCS (Subversion, CVS, Perforce) is the way Git thinks about its data. Most systems store information as a set of file-based changes. Git thinks of its data more like a series of snapshots of a miniature filesystem.

### 1.2 The Three States
Git has three main states that your files can reside in:
1. **Modified**: You have changed the file in your working tree but have not committed it to your database yet.
2. **Staged**: You have marked a modified file in its current version to go into your next commit snapshot.
3. **Committed**: The data is safely stored in your local repository database (.git directory).

\`\`\`bash
# Essential Git Commands
git init
git add index.html app.js
git commit -m "Initial commit of KitabGhar application"
git status
git log --oneline --graph
\`\`\`
`
      },
      {
        chapterNumber: 2,
        title: "Git Branching, Fast-Forward and 3-Way Merges",
        content: `Branching means you diverge from the main line of development and continue to do work without messing with that main line.

### 2.1 What a Branch Is
A branch in Git is simply a lightweight movable pointer to one of these commits. The default branch name in Git is \`main\` (or \`master\`).

### 2.2 Creating and Switching Branches
\`\`\`bash
# Create a new branch
git branch feature/ebook-reader

# Switch to the new branch
git checkout feature/ebook-reader
# Or using modern git:
git switch feature/ebook-reader

# Merge back into main
git checkout main
git merge feature/ebook-reader
\`\`\`
`
      }
    ]
  },
  {
    title: "Deep Learning & Neural Network Architectures",
    author: "Dr. Ian Goodfellow, Yoshua Bengio & Aaron Courville",
    authorBio: "Pioneering researchers in Artificial Intelligence, Generative Adversarial Networks (GANs), and Deep Learning.",
    categorySlug: "ai-ml",
    description: "The definitive textbook on deep learning. Covers mathematical foundations (linear algebra, probability), deep feedforward networks, convolutional neural networks (CNNs), recurrent networks (RNNs), and attention transformers.",
    price: 499,
    isFree: false,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
    pagesCount: 800,
    publishedYear: 2024,
    language: "English",
    isbn: "978-0262035613",
    format: "PDF & Web Reader",
    fileUrl: "https://www.deeplearningbook.org/",
    featured: true,
    averageRating: 5.0,
    ratingsCount: 65,
    chapters: [
      {
        chapterNumber: 1,
        title: "Applied Mathematics and Machine Learning Basics",
        content: `Deep learning is a specific subfield of machine learning that achieves great power and flexibility by learning to represent the world as a nested hierarchy of concepts.

### 1.1 Vectors, Matrices, and Tensors
- **Scalar**: A single number ($x \\in \\mathbb{R}$).
- **Vector**: An array of numbers ($\\mathbf{x} = [x_1, x_2, \\dots, x_n]^T$).
- **Matrix**: A 2-D array of numbers ($A_{i,j}$).
- **Tensor**: An array with more than two axes.

### 1.2 Loss Functions & Gradient Descent
To train a model, we define an objective function $J(\\theta)$ and update parameters in the direction of negative gradient:
$$\\theta \\leftarrow \\theta - \\alpha \\nabla_{\\theta} J(\\theta)$$
`
      },
      {
        chapterNumber: 2,
        title: "Deep Feedforward Networks and Backpropagation",
        content: `Feedforward neural networks are the quintessential deep learning models. The goal of a feedforward network is to approximate some function $f^*$.

### 2.1 Activation Functions
Nonlinear activation functions allow deep networks to compute non-trivial functional representations:
- **ReLU (Rectified Linear Unit)**: $g(z) = \\max(0, z)$
- **Sigmoid**: $\\sigma(z) = \\frac{1}{1 + e^{-z}}$
- **Softmax**: Multi-class probability distribution.

### 2.2 The Backpropagation Algorithm
Backpropagation allows information from the cost to flow backward through the network to compute the gradient with respect to every layer weight using the chain rule of calculus.
`
      }
    ]
  },
  {
    title: "Database System Concepts & SQL Internals",
    author: "Dr. Raghu Ramakrishnan & Johannes Gehrke",
    authorBio: "Distinguished Database Researchers and Authors of standard academic database curricula.",
    categorySlug: "database",
    description: "An in-depth exploration of database architecture, relational algebra, SQL optimization, B+ Tree indexing, ACID transactions, 2-Phase Locking, and crash recovery.",
    price: 329,
    isFree: false,
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
    pagesCount: 420,
    publishedYear: 2024,
    language: "English",
    isbn: "978-0072465631",
    format: "PDF & Web Reader",
    fileUrl: "https://mcfp.felk.cvut.cz/curs/dbs/Ramakrishnan%20-%20Database%20Management%20Systems%203rd%20Edition.pdf",
    featured: true,
    averageRating: 4.8,
    ratingsCount: 31,
    chapters: [
      {
        chapterNumber: 1,
        title: "The Relational Model and Integrity Constraints",
        content: `A database management system (DBMS) is a software package designed to store and manage databases.

### 1.1 Core Relational Concepts
- **Relation Schema**: Specifies name of relation and name/type of each column.
- **Tuples (Rows)**: Specific instances of records conforming to schema.
- **Primary Key (PK)**: Minimal set of attributes that uniquely identifies a row.
- **Foreign Key (FK)**: Enforces referential integrity between parent and child tables.

### 1.2 KitabGhar Relational Data Definition (DDL)
\`\`\`sql
CREATE TABLE Customer (
    Customer_id VARCHAR(50) PRIMARY KEY,
    First_name VARCHAR(100) NOT NULL,
    Last_name VARCHAR(100) NOT NULL,
    DOB DATE,
    Gender VARCHAR(20) DEFAULT 'Prefer not to say'
);

CREATE TABLE eBooks (
    ebook_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) DEFAULT 0.00,
    drm_protected BOOLEAN DEFAULT TRUE
);
\`\`\`
`
      },
      {
        chapterNumber: 2,
        title: "ACID Transactions and Concurrency Control",
        content: `A transaction is an execution of a program that accesses or changes the contents of a database.

### 2.1 The ACID Guarantees
1. **Atomicity**: All changes are executed or none are (All-or-Nothing).
2. **Consistency**: Transactions bring database from one valid state to another.
3. **Isolation**: Concurrent execution results in a state that would be obtained if executed serially.
4. **Durability**: Once committed, updates persist even across system crashes.

### 2.2 Two-Phase Locking (2PL)
Strict 2PL prevents cascading rollbacks and guarantees serializability by acquiring shared/exclusive locks before read/write operations and holding exclusive locks until the end of the transaction.
`
      }
    ]
  },
  {
    title: "The Art of War: Complete Strategic Treatise",
    author: "Sun Tzu (Translated by Lionel Giles)",
    authorBio: "Ancient Chinese military general, strategist, and philosopher credited with the most influential strategy treatise in history.",
    categorySlug: "literature",
    description: "The timeless classic on strategy, tactics, leadership, conflict resolution, and psychological preparedness, written in the 5th century BC.",
    price: 0,
    isFree: true,
    coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80",
    pagesCount: 160,
    publishedYear: 2024,
    language: "English",
    isbn: "978-1590302255",
    format: "PDF & Web Reader",
    fileUrl: "https://sites.ualberta.ca/~enoch/Readings/The_Art_Of_War.pdf",
    featured: true,
    averageRating: 4.9,
    ratingsCount: 88,
    chapters: [
      {
        chapterNumber: 1,
        title: "Chapter I: Laying Plans",
        content: `Sun Tzu said: The art of war is of vital importance to the State. It is a matter of life and death, a road either to safety or to ruin. Hence it is a subject of inquiry which can on no account be neglected.

### The Five Constant Factors
The art of war is governed by five constant factors:
1. **The Moral Law**: Causes the people to be in complete accord with their ruler, so that they will follow him regardless of their lives.
2. **Heaven**: Signifies night and day, cold and heat, times and seasons.
3. **Earth**: Comprises distances, great and small; danger and security; open ground and narrow passes.
4. **The Commander**: Stands for the virtues of wisdom, sincerity, benevolence, courage, and strictness.
5. **Method and Discipline**: The marshaling of the army in its proper subdivisions, the graduations of rank among the officers, the maintenance of roads, and the control of expenditure.

*All warfare is based on deception. Hence, when able to attack, we must seem unable; when using our forces, we must seem inactive; when we are near, we must make the enemy believe we are far away.*
`
      },
      {
        chapterNumber: 2,
        title: "Chapter II: Waging War",
        content: `Sun Tzu said: In the operations of war, where there are in the field a thousand swift chariots, as many heavy chariots, and a hundred thousand mail-clad soldiers, with provisions enough to carry them a thousand li, the expenditure at home and at the front will amount to the sum of a thousand ounces of silver a day.

### Decisiveness and Speed
When you engage in actual fighting, if victory is long in coming, then men's weapons will grow dull and their ardor will be damped.
*There is no instance of a country having benefited from prolonged warfare.*

Bring war material with you from home, but forage on the enemy. Thus the army will have food enough for its needs.
`
      },
      {
        chapterNumber: 3,
        title: "Chapter III: Attack by Stratagem",
        content: `Sun Tzu said: In the practical art of war, the best thing of all is to take the enemy's country whole and intact; to shatter and destroy it is not so good.

*Supreme excellence consists in breaking the enemy's resistance without fighting.*

### The Golden Rule of Victory
Thus we may know that there are five essentials for victory:
1. He will win who knows when to fight and when not to fight.
2. He will win who knows how to handle both superior and inferior forces.
3. He will win whose army is animated by the same spirit throughout all its ranks.
4. He will win who, prepared himself, waits to take the enemy unprepared.
5. He will win who has military capacity and is not interfered with by the sovereign.

**If you know the enemy and know yourself, you need not fear the result of a hundred battles.**
`
      }
    ]
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    authorBio: "English novelist known primarily for her six major novels, which interpret, critique, and comment upon the British landed gentry at the end of the 18th century.",
    categorySlug: "literature",
    description: "The beloved romantic comedy of manners detailing the emotional development of Elizabeth Bennet and Mr. Darcy in early 19th-century England.",
    price: 0,
    isFree: true,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    pagesCount: 390,
    publishedYear: 2024,
    language: "English",
    isbn: "978-0141439518",
    format: "PDF & Web Reader",
    fileUrl: "https://www.gutenberg.org/files/1342/1342-pdf.pdf",
    featured: false,
    averageRating: 4.9,
    ratingsCount: 74,
    chapters: [
      {
        chapterNumber: 1,
        title: "Chapter 1: Netherfield Park is Let at Last",
        content: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"
Mr. Bennet replied that he had not.
"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."
Mr. Bennet made no answer.
"Do you not want to know who has taken it?" cried his wife impatiently.
"You want to tell me, and I have no objection to hearing it."
`
      },
      {
        chapterNumber: 2,
        title: "Chapter 2: Mr. Bennet's Secret Visit",
        content: `Mr. Bennet was among the earliest of those who waited on Mr. Bingley. He had always intended to visit him, though to the last always assuring his wife that he should not go; and till the evening after the visit was paid she had no knowledge of it.

The astonishment of the ladies was just what he wished; that of Mrs. Bennet perhaps surpassing the rest; though, when the first tumult of joy was over, she began to declare that it was what she had expected all the while.

"How good it was in you, my dear Mr. Bennet! But I knew I should persuade you at last. I was sure you loved your girls too well to neglect such an acquaintance."
`
      },
      {
        chapterNumber: 3,
        title: "Chapter 3: The Assembly Ball at Meryton",
        content: `Not all that Mrs. Bennet, however, with the assistance of her five daughters, could ask on the subject, was sufficient to draw from her husband any satisfactory description of Mr. Bingley.

Mr. Bingley was good-looking and gentlemanlike; he had a pleasant countenance, and easy, unaffected manners. His sisters were fine women, with an air of decided fashion. His brother-in-law, Mr. Hurst, merely looked the gentleman; but his friend Mr. Darcy soon drew the attention of the room by his fine, tall person, handsome features, noble mien, and the report which was in general circulation within five minutes after his entrance, of his having ten thousand a year.
`
      }
    ]
  },
  {
    title: "Frankenstein; or, The Modern Prometheus",
    author: "Mary Wollstonecraft Shelley",
    authorBio: "English novelist who wrote the pioneering Gothic and science fiction masterpiece Frankenstein at the age of eighteen.",
    categorySlug: "literature",
    description: "The seminal Gothic science fiction novel exploring the ambition of Victor Frankenstein and the poignant plight of the sentient creature he brings to life.",
    price: 0,
    isFree: true,
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    pagesCount: 280,
    publishedYear: 2024,
    language: "English",
    isbn: "978-0141439471",
    format: "PDF & Web Reader",
    fileUrl: "https://www.gutenberg.org/files/84/84-pdf.pdf",
    featured: false,
    averageRating: 4.8,
    ratingsCount: 45,
    chapters: [
      {
        chapterNumber: 1,
        title: "Letter I & The Arctic Expedition",
        content: `*To Mrs. Saville, England.*
*St. Petersburgh, Dec. 11th, 17—*

You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.

I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes.
`
      },
      {
        chapterNumber: 2,
        title: "Chapter 1: Victor Frankenstein's Youth in Geneva",
        content: `I am by birth a Genevese, and my family is one of the most distinguished of that republic. My ancestors had been for many years counsellors and syndics, and my father had filled several public situations with honour and reputation.

No creature could have more tender parents than mine. My mother's tender caresses and my father's smile of benevolent pleasure while regarding me are my first recollections. I was their plaything and their idol, and something better—their child, the innocent and helpless creature bestowed on them by Heaven.
`
      },
      {
        chapterNumber: 3,
        title: "Chapter 4: The Spark of Being",
        content: `No one can conceive the variety of feelings which bore me onwards, like a whirlwind, eager to penetrate the secrets of nature.

It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.
`
      }
    ]
  },
  {
    title: "Discrete Mathematics & Graph Theory Foundations",
    author: "Dr. Kenneth H. Rosen",
    authorBio: "Distinguished mathematician and computer scientist specializing in discrete mathematics, cryptography, and graph theory.",
    categorySlug: "science-math",
    description: "Mathematical reasoning, propositional logic, sets, functions, sequences, mathematical induction, combinatorics, and graph algorithms essential for computer science.",
    price: 349,
    isFree: false,
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    pagesCount: 550,
    publishedYear: 2024,
    language: "English",
    isbn: "978-0073383095",
    format: "PDF & Web Reader",
    fileUrl: "https://www.cs.cornell.edu/~rafael/discmath.pdf",
    featured: false,
    averageRating: 4.7,
    ratingsCount: 22,
    chapters: [
      {
        chapterNumber: 1,
        title: "Propositional Logic, Predicates and Quantifiers",
        content: `Discrete mathematics is the part of mathematics devoted to the study of discrete objects.

### 1.1 Propositions and Truth Values
A proposition is a declarative statement that is either TRUE ($T$) or FALSE ($F$), but not both:
- $p$: "KitabGhar is an eBook management system." ($T$)
- $q$: "$2 + 2 = 5$." ($F$)

### 1.2 Logical Connectives
- **Negation** ($\\neg p$): NOT $p$
- **Conjunction** ($p \\land q$): $p$ AND $q$
- **Disjunction** ($p \\lor q$): $p$ OR $q$
- **Conditional Statement** ($p \\rightarrow q$): If $p$, then $q$
- **Biconditional Statement** ($p \\leftrightarrow q$): $p$ if and only if $q$
`
      },
      {
        chapterNumber: 2,
        title: "Graph Theory, Trees and Network Topologies",
        content: `A graph $G = (V, E)$ consists of $V$, a non-empty set of vertices (or nodes), and $E$, a set of edges connecting pairs of vertices.

### 2.1 Graph Models in Computing
- **Social Networks**: Vertices represent users, edges represent friendships.
- **Computer Networks**: Vertices represent routers/servers, edges represent physical or wireless links.
- **Web Graphs**: Vertices represent web pages, directed edges represent hyperlinks.

### 2.2 Trees and Binary Search
A tree is an undirected connected graph with no simple circuits. A tree with $n$ vertices has exactly $n - 1$ edges.
`
      }
    ]
  }
];

const seedIfEmpty = async (force = false) => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0 && !force) {
      console.log(`[Seed Service] Database already populated with ${userCount} users. Skipping auto-seed.`);
      return;
    }

    if (force) {
      console.log('[Seed Service] Force reset enabled. Clearing existing collections...');
      await User.deleteMany({});
      await Category.deleteMany({});
      await Book.deleteMany({});
      await Review.deleteMany({});
      await Purchase.deleteMany({});
      await ReadingProgress.deleteMany({});
    }

    console.log('[Seed Service] Seeding authentic eBooks, categories, and accounts for KitabGhar...');

    // 1. Create Default Users (Customer & Admin)
    const adminUser = await User.create({
      customerId: 'CUST-000001',
      firstName: 'System',
      lastName: 'Administrator',
      username: 'admin',
      email: 'admin@kitabghar.com',
      password: 'admin123',
      role: 'admin',
      city: 'New Delhi',
      state: 'Delhi',
      zip: '110001',
      phone: '+91 9876543210',
      gender: 'Male',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80'
    });

    const demoUser = await User.create({
      customerId: 'CUST-100245',
      firstName: 'Aarav',
      lastName: 'Sharma',
      username: 'student',
      email: 'student@kitabghar.com',
      password: 'student123',
      role: 'customer',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560001',
      phone: '+91 9123456780',
      gender: 'Male',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'
    });

    console.log('[Seed Service] Created Admin (admin@kitabghar.com / admin123) and Student (student@kitabghar.com / student123)');

    // 2. Create Categories
    const categoryMap = {};
    for (const cat of sampleCategories) {
      const createdCat = await Category.create(cat);
      categoryMap[cat.slug] = createdCat;
    }
    console.log(`[Seed Service] Created ${sampleCategories.length} Categories.`);

    // 3. Create Real Books
    const createdBooks = [];
    for (const bookData of sampleBooks) {
      const catObj = categoryMap[bookData.categorySlug];
      const book = await Book.create({
        ...bookData,
        category: catObj ? catObj._id : null,
        categoryName: catObj ? catObj.name : 'General'
      });
      if (catObj) {
        await Category.findByIdAndUpdate(catObj._id, { $inc: { bookCount: 1 } });
      }
      createdBooks.push(book);
    }
    console.log(`[Seed Service] Created ${createdBooks.length} Real Authentic eBooks with complete readable chapters.`);

    // 4. Create Sample Purchases for Demo User
    if (createdBooks.length >= 3) {
      await Purchase.create({
        user: demoUser._id,
        book: createdBooks[0]._id,
        amount: 0,
        paymentStatus: 'completed'
      });

      await Purchase.create({
        user: demoUser._id,
        book: createdBooks[1]._id,
        amount: createdBooks[1].price,
        paymentStatus: 'completed'
      });

      await Purchase.create({
        user: demoUser._id,
        book: createdBooks[6]._id, // The Art of War
        amount: 0,
        paymentStatus: 'completed'
      });

      // 5. Create Reading Progress
      await ReadingProgress.create({
        user: demoUser._id,
        book: createdBooks[0]._id,
        currentChapter: 1,
        currentPage: 1,
        totalPages: createdBooks[0].chapters.length,
        percentage: 33,
        bookmarks: [
          {
            chapter: 1,
            page: 1,
            title: 'Numbers and Precision Note',
            note: 'Important note on 64-bit IEEE 754 floating point numbers in JavaScript.'
          }
        ]
      });

      // 6. Create Reviews
      await Review.create({
        user: demoUser._id,
        userName: `${demoUser.firstName} ${demoUser.lastName}`,
        userAvatar: demoUser.avatar,
        book: createdBooks[0]._id,
        rating: 5,
        comment: 'Brilliant book! The interactive chapters and code snippets make learning modern JavaScript a pleasure.'
      });

      await Review.create({
        user: demoUser._id,
        userName: `${demoUser.firstName} ${demoUser.lastName}`,
        userAvatar: demoUser.avatar,
        book: createdBooks[6]._id,
        rating: 5,
        comment: 'Essential reading on strategy and decisive leadership. The reader interface in Sepia mode feels like reading an antique manuscript.'
      });
    }

    console.log('[Seed Service] Real eBook seed dataset initialized successfully!');
  } catch (error) {
    console.error('[Seed Service Error]', error);
  }
};

// Allow direct execution: node seedData.js
if (require.main === module) {
  const dotenv = require('dotenv');
  const mongoose = require('mongoose');
  dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });

  const runDirectSeed = async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kitabghar';
    console.log('[Direct Seed] Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    await seedIfEmpty(true);
    await mongoose.disconnect();
    console.log('[Direct Seed] Done!');
    process.exit(0);
  };
  runDirectSeed().catch(err => {
    console.error('[Direct Seed Error]', err);
    process.exit(1);
  });
}

module.exports = { seedIfEmpty };
