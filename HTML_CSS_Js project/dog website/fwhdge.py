import itertools
import time

def brute_force_password(password):
    # Generate all possible combinations of capital English letters of length 5
    combinations = itertools.product("ABCDEFGHIJKLMNOPQRSTUVWXYZ", repeat=5)
    
    start_time = time.time()  # Start time
    
    # Iterate over each combination and check if it matches the password
    for attempt in combinations:
        attempt = ''.join(attempt)
        if attempt == password:
            end_time = time.time()  # End time
            return "SUCCESS", end_time - start_time
    
    # If password is not found
    return "Password not found", None

def main():
    password = input("Enter the password to crack: ")
    
    result, time_taken = brute_force_password(password)
    
    if time_taken:
        print(f"{result}. Time taken: {time_taken:.2f} seconds")
    else:
        print(result)

if __name__ == "__main__":
    main()
