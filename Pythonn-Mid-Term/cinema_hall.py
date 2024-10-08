
class Star_Cinema:
    _hall_list = []

    @classmethod
    def entry_hall(cls, hall):
        cls._hall_list.append(hall)

    @classmethod
    def view_all_shows(cls):
        for hall in cls._hall_list:
            hall.view_show_list()

class Hall(Star_Cinema):
    def __init__(self, rows, cols, hall_no):
        self.__seats = {}
        self.__show_list = []
        self._rows = rows
        self._cols = cols
        self._hall_no = hall_no
        super().entry_hall(self)

    def entry_show(self, show_id, movie_name, time):
        self.__show_list.append((show_id, movie_name, time))
        self.__seats[show_id] = [['F' for _ in range(self._cols)] for _ in range(self._rows)]

    def book_seats(self, show_id, seat_list):
        if show_id not in self.__seats:
            print(f"Error: Invalid show ID {show_id}")
            return

        for row, col in seat_list:
            if row >= self._rows or col >= self._cols:
                print(f"Error: Invalid seat location ({row}, {col})")
                continue
            if self.__seats[show_id][row][col] == 'B':
                print(f"Error: Seat ({row}, {col}) already booked")
                continue
            self.__seats[show_id][row][col] = 'B'
            print(f"Seat ({row}, {col}) booked successfully for show ID {show_id}")

    def view_show_list(self):
        print(f"Hall Number: {self._hall_no}, Show List:")
        for show_id, movie_name, time in self.__show_list:
            print(f"ID: {show_id}, Movie: {movie_name}, Time: {time}")

    def view_available_seats(self, show_id):
        if show_id not in self.__seats:
            print(f"Error: Invalid show ID {show_id}")
            return
        print(f"Available seats for show ID {show_id} in Hall Number: {self._hall_no}:")
        for row in self.__seats[show_id]:
            print(" ".join(row))


hall1 = Hall(5, 6, 1)
hall1.entry_show('111', 'Kalki', '12:00 PM')
hall1.entry_show('222', 'Tufan', '3:00 PM')


def menu():
    while True:
        print("\n1. View all shows today")
        print("2. View available seats")
        print("3. Book ticket")
        print("4. Exit")
        option = input("Enter any option: ")

        if option == '1':
            Star_Cinema.view_all_shows()
        elif option == '2':
            show_id = input("Enter show ID: ")
            hall1.view_available_seats(show_id)
        elif option == '3':
            show_id = input("Enter show ID: ")
            try:
                num_tickets = int(input("Number of tickets: "))
                seats_to_book = []
                for _ in range(num_tickets):
                    row = int(input("Enter seat row: "))
                    col = int(input("Enter seat col: "))
                    seats_to_book.append((row, col))
                hall1.book_seats(show_id, seats_to_book)
            except ValueError:
                print("Invalid input. Please enter integer values.")
        elif option == '4':
            break
        else:
            print("Invalid option. Please try again.")

menu()
