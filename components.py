import os
import json

# File content templates
SVELTE_TEMPLATE = """
<script lang="ts">
    import './{component_name}.scss';
    import handle{component_pascal} from './{component_name}';

    handle{component_pascal}();
</script>

<div class="{component_name}-container">{component_pascal} Placeholder!</div>
"""

TS_TEMPLATE = """
export default function handle{component_pascal}() {{}}
"""

SCSS_TEMPLATE = """
.{component_name}-container {{
    font-style: normal;
}}
"""

def create_file(file_path: str, content: str):
    """
    Create a file at the given path and write the provided content into it.
    """
    with open(file_path, 'w') as file:
        file.write(content)

def create_files_for_component(component_name: str, component_pascal: str, root_directory: str):
    """
    Create all necessary files (Svelte, TypeScript, SCSS) for a component in the provided root directory.
    """
    # Create .svelte file
    svelte_file_path = os.path.join(root_directory, f"{component_name}.svelte")
    create_file(svelte_file_path, SVELTE_TEMPLATE.format(component_name=component_name, component_pascal=component_pascal))

    # Create .ts file
    ts_file_path = os.path.join(root_directory, f"{component_name}.ts")
    create_file(ts_file_path, TS_TEMPLATE.format(component_name=component_name, component_pascal=component_pascal))

    # Create .scss file
    scss_file_path = os.path.join(root_directory, f"{component_name}.scss")
    create_file(scss_file_path, SCSS_TEMPLATE.format(component_name=component_name))

def process_component_structure(component_structure: dict, root_directory: str):
    """
    Recursively process the JSON component structure to create the corresponding folder and file structure.
    """
    for item, value in component_structure.items():
        item_path = os.path.join(root_directory, item)
        
        if isinstance(value, dict):
            # Create a directory if the value is a dictionary (nested structure)
            os.makedirs(item_path, exist_ok=True)
            process_component_structure(value, item_path)
        elif isinstance(value, bool) and value:
            # For each component, generate files
            component_name = item.split('.')[0]  # Extract the component name without extension
            component_pascal = ''.join([part.capitalize() for part in component_name.split('_')])
            create_files_for_component(component_name, component_pascal, root_directory)

def load_json_file(file_path: str) -> dict:
    """
    Load a JSON file from the specified path and return the data as a dictionary.
    """
    try:
        with open(file_path, 'r') as json_file:
            return json.load(json_file)
    except FileNotFoundError:
        raise FileNotFoundError(f"Error: JSON file not found at {file_path}.")

def parse_gitignore_patterns(gitignore_file_path: str = ".gitignore") -> list:
    """
    Read and parse patterns from a .gitignore file, ignoring comments and empty lines.
    """
    if os.path.exists(gitignore_file_path):
        with open(gitignore_file_path, 'r') as f:
            return [line.strip() for line in f.readlines() if line.strip() and not line.startswith('#')]
    return []

def is_path_ignored(path: str, ignore_patterns: list) -> bool:
    """
    Check if the provided path should be ignored based on the provided .gitignore patterns.
    """
    for pattern in ignore_patterns:
        if pattern.endswith('/') and os.path.isdir(path):
            # Directory patterns
            if path.startswith(os.path.join(".", pattern)):
                return True
        elif os.path.basename(path) == pattern:
            # File patterns
            return True
    return False

def find_existing_components_directories(root_directory: str, ignore_patterns: list) -> list:
    """
    Search the directory tree for existing 'components' directories, excluding those that match .gitignore patterns.
    """
    found_directories = []
    
    for dirpath, dirnames, _ in os.walk(root_directory):
        # Filter out ignored directories
        dirnames[:] = [d for d in dirnames if not is_path_ignored(os.path.join(dirpath, d), ignore_patterns)]
        
        for dirname in dirnames:
            if dirname.lower() == "components":
                found_directories.append(os.path.relpath(os.path.join(dirpath, dirname)))
    
    return found_directories

def prompt_user_choice(prompt: str, valid_range: int) -> int:
    """
    Prompt the user to choose an option from a list, ensuring the choice is valid within the provided range.
    """
    while True:
        try:
            choice = int(input(f"{prompt}: ").strip())
            if 1 <= choice <= valid_range:
                return choice
            else:
                print("Invalid choice. Please select a valid number.")
        except ValueError:
            print("Invalid input. Please enter a valid number.")

def select_target_directory(script_dir: str, root_directory: str = ".") -> str:
    """
    Display a list of existing 'components' directories or prompt the user to create a new one.
    """
    ignore_patterns = parse_gitignore_patterns()
    components_dirs = find_existing_components_directories(root_directory, ignore_patterns)
    
    # Display options
    print("Found 'components' directories:")
    for idx, dir_path in enumerate(components_dirs, start=1):
        print(f"{idx}. {dir_path}")
    print(f"{len(components_dirs) + 1}. Create a new 'components' directory")

    # Get user choice
    choice = prompt_user_choice("Enter your choice (number)", len(components_dirs) + 1)

    if choice <= len(components_dirs):
        return components_dirs[choice - 1]
    else:
        # Get new directory path
        new_dir = input("Enter the relative path for the new 'components' directory (e.g., 'src/lib'): ").strip()
        new_dir_path = os.path.join(script_dir, new_dir, "components")
        os.makedirs(new_dir_path, exist_ok=True)
        return new_dir_path

def main():
    """
    Main function to load the JSON data, prompt the user for the target directory, and create the component structure.
    """
    # Get the directory of the running script
    script_directory = os.path.dirname(os.path.abspath(__file__))
    
    # Load the JSON component structure
    components_json_path = os.path.join(script_directory, 'components.json')
    component_data = load_json_file(components_json_path)
    
    # Get the target directory where components should be generated
    target_directory = select_target_directory(script_directory)

    # Create the component structure in the target directory
    process_component_structure(component_data, target_directory)

    print(f"Component structure created in {target_directory}")

if __name__ == "__main__":
    main()
