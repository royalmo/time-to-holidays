# See example variable for usage

import json
import sys

example = 'python3 add_date.py "Últim exàmen de Q6" "2023/06/22 11:36:45"'

if len(sys.argv) != 3:
    print(f"Bad arguments. Usage: `{example}`")
    sys.exit(1)

# Get the new date data from the command line arguments
name, date = sys.argv[1], sys.argv[2]

# Load the existing dates from the file
with open("assets/db/dates.json", "r") as f:
    dates = json.load(f)

# Add the new date to the list
new_date = {"name": name, "date": date}
dates.append(new_date)

# Write the updated list of dates back to the file
with open("assets/db/dates.json", "w") as f:
    json.dump(dates, f, indent=4)

print("Date added successfully!")
