import hashlib
import os

def generate_hashed_password(password, salt=None):
    if salt is None:
        salt = os.urandom(16)  # Generate a random salt
    hashed_password = hashlib.sha256(password.encode() + salt).hexdigest()
    return hashed_password, salt

def save_password_to_file(username, hashed_password, salt):
    with open("passwords.txt", "a") as file:
        file.write(f"{username}:{hashed_password}:{salt}\n")

def main():
    username = input("Enter username: ")
    password = input("Enter password: ")
    
    hashed_password, salt = generate_hashed_password(password)
    
    save_password_to_file(username, hashed_password, salt)
    print("Password saved successfully.")

if __name__ == "__main__":
    main()
