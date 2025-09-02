# run_all.py
"""
Runs the full pipeline: scraping, AI suggestion generation, keyword extraction, and place connection.
"""
import subprocess
import sys

scripts = [
    "backend/scraper.py",
    "backend/connect_llm_to_places.py"
]

def run_script(script):
    print(f"\n--- Running {script} ---")
    result = subprocess.run([sys.executable, script], capture_output=True, text=True)
    print(result.stdout)
    if result.stderr:
        print("[stderr]", result.stderr)
    if result.returncode != 0:
        print(f"[ERROR] {script} exited with code {result.returncode}")
    return result.returncode

if __name__ == "__main__":
    for script in scripts:
        code = run_script(script)
        if code != 0:
            print(f"Aborting pipeline due to error in {script}.")
            break
    else:
        print("\nPipeline completed successfully.")
