# See example variable for usage

import json
import sys

example = 'python3 add_citation.py "Mariano Rajoy" "Un plato es un plato."'

if len(sys.argv) != 3:
    print(f"Bad arguments. Usage: `{example}`")
    sys.exit(1)

# Get the new citation data from the command line arguments
author, citation = sys.argv[1], sys.argv[2]

# Load the existing citations from the file
with open("assets/db/citations.json", "r") as f:
    citations = json.load(f)

# Add the new citation to the list
new_citation = {"author": author, "citation": citation}
citations.append(new_citation)

# Write the updated list of citations back to the file
with open("assets/db/citations.json", "w") as f:
    json.dump(citations, f, indent=4)

print("Citation added successfully!")
