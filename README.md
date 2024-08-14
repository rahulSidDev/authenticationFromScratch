# Purpose of this project.
This is project's repository is for learning about and practicing authorization and authentication for websites / webapps from scratch.

# Notes of concepts.
## Authentication.
### What is it?
Authentication is the process of verifying the who the particular user is. We typically use a username and a password combo but we also use security questions, facial recognition etc.

### Rule No. 1.
Never store the passwords as they are i.e. nobody should be able to read the exact passwords when they go into the database. This is because if the data is compromised then everyone's identities will also be compromised.

### The solution: Hashing Function.
Hashing functions are functions that take some arbitrary size inputs values and map them to a fixed sized output values. The outputs from a hash function for different input values is radically different, even if the input values are different by just one character. The passwords are run through a hash function to get the hash value and that value is the one that is stored in the database. When attempting to login the password is run through the hash function and the resulting hash is compared with the hash already stored in the database.

### Cryptographic hashing function.
A hash function must have the following properties to be used for cryptography:
- There should be no way for someone to take the hashed value and reverse it to get the original input value, the hash function should be a one way function.
- A small change in the input should result in a large change in the output value.
- The hash function should be deterministic in nature i.e. the same input will give the same output every time.
- Two inputs should not have the same output value from the hash function. These are called hash collisions.
- Password hash functions should be slow. Faster hash function make it easier to crack the password by trying many inputs and brute forcing.

### Hash Salts.
If the exact hash function e.g. bcrypt that is used to hash passwords is known then a reverse hash table can be created for thousands of commonly used passwords matching hashed values back to the original passwords. This reverse hash table can be used to crack the passwords as the exact stored hash's password can be guessed. This is where hash salts come in where some random values (salts) are added to the password and then it is hashed. Many people use the same password for different accounts so using different salt for each account password can increase security.
