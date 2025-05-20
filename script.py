from threading import Thread, Lock
# import multiprocessing as mp
from time import sleep

lock = Lock()
li = []
def print_numbers(x, li):
    for i in range(1, 21):
        with lock:
            li.append(f"{x} => {i} => {li}")
        # print(f"{x} => {i}")
        sleep(0.5)
    
if __name__ == "__main__":
    t1 = Thread(target=print_numbers, args=("A", li))
    t2 = Thread(target=print_numbers, args=("B", li))
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    print(li)
    

    print("Thread has finished executing.")
    print("Thread has finished executing.")

