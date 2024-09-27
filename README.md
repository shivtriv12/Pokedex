# Pokedex CLI

Welcome to the **Pokedex CLI**! This command-line interface (CLI) application allows users to interact with the Pokémon API and manage their own Pokémon collection. Users can catch, inspect, and explore various Pokémon and their locations.

## Features

- Catch Pokémon and add them to your personal Pokedex.
- Inspect caught Pokémon to view their details, including stats and types.
- Explore different Pokémon locations and find new Pokémon to catch.
- View a list of all caught Pokémon.

## Installation

To set up the Pokedex CLI on your local machine, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/shivtriv12/pokedex-cli.git
   ```
2. Change Directory:
   ```bash
   cd pokedex-cli
   ```
3. Install Node Modules:
   ```bash
   npm install
   ```
4. Run:
   ```bash
   node main.js
   ```

## Files Overview

### api.js
This file handles API requests to the PokeAPI. It includes functions to fetch data about locations, Pokémon in specific areas, and individual Pokémon. It implements a caching mechanism to store API responses and reduce the number of requests.

### command.js
This file contains the command definitions and their respective actions for the CLI. It allows users to catch Pokémon, inspect caught Pokémon, explore locations, and view the list of caught Pokémon.

### main.js
This file initializes the REPL (Read-Eval-Print Loop) for the CLI. It sets up the prompt and handles user input, including parsing commands and providing help and version information.

### pokecache.js
This file implements a caching system for storing API responses. It defines the Cache class to manage cache entries, including adding, retrieving, and automatically cleaning up expired entries.

