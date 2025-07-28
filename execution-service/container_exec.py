import subprocess, os, json, tempfile, shutil
from typing import Dict

LANGUAGE_IMAGE_MAP: Dict[str, str] = {
    'python': 'bansy/python:3.12',
    'javascript': 'bansy/node:20',
    'typescript': 'bansy/node:20',
}

def run_in_container(language: str, repo_path: str, main_file: str | None = None, timeout_ms: int = 10000):
    """Run tests inside a language-specific container.

    Args:
        language: canonical language string (python, javascript, typescript …)
        repo_path: host path of the cloned repository (will be mounted read-only).
        main_file: optional path (relative to repo root) to execute.
        timeout_ms: overall timeout in milliseconds.
    Returns: dict with passed, output, error.
    """
    lang_key = language.lower().split(',')[0].strip()
    image = LANGUAGE_IMAGE_MAP.get(lang_key)
    if not image:
        return {"passed": False, "error": f"No container image mapped for language '{language}'"}

    # Build docker command
    cmd = [
        'docker', 'run', '--rm',
        '--network', 'none',             # no outbound net
        '--pids-limit', '256',
        '-m', '512m',                    # memory cap
        '-v', f'{repo_path}:/workspace:ro',
        image,
    ]
    if main_file:
        cmd.extend([main_file])

    try:
        completed = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout_ms/1000)
        return {
            'passed': completed.returncode == 0,
            'output': completed.stdout,
            'error': completed.stderr,
        }
    except subprocess.TimeoutExpired:
        return {'passed': False, 'output': '', 'error': 'Execution timed out'}
    except Exception as exc:
        return {'passed': False, 'output': '', 'error': str(exc)} 