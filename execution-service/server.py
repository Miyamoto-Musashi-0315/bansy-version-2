import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import tempfile

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Piston-like API endpoint
@app.route('/api/v2/execute', methods=['POST'])
def execute_piston_like():
    data = request.get_json()
    language = data.get('language')
    version = data.get('version') # Piston uses version
    files = data.get('files', [])
    stdin = data.get('stdin', '')
    args = data.get('args', [])
    # compile_timeout = data.get('compile_timeout', 10000) # in ms
    # run_timeout = data.get('run_timeout', 3000) # in ms

    if not language or not files:
        return jsonify({"message": "Language and files are required"}), 400

    # For now, we'll simulate execution.
    # In a real Piston setup, you'd call the Piston engine here.
    # This example just echoes back some info and a dummy output.

    # Find the main file content
    main_file_content = ""
    for f in files:
        if f.get("name"): # Piston files have a name and content
            main_file_content = f.get("content", "")
            break
    
    # Simplified dummy execution response
    # A real Piston response has 'run' and optionally 'compile' stages
    # 'run': { 'stdout': '', 'stderr': '', 'output': '', 'code': 0, 'signal': null }
    # 'compile': (optional) { 'stdout': '', 'stderr': '', 'output': '', 'code': 0, 'signal': null }

    # This is a very simplified response structure.
    # Your Node.js controller expects { passed: boolean, output: string, error: string }
    # We need to adapt to what the testController expects.
    
    # Let's try to match the structure your testController.ts seems to expect
    # based on `const result = executionResponse.data;` and its usage.
    # It looks for `result.passed`, `result.output`, `result.error`.

    # For now, let's assume a simple pass if code is present.
    # This is NOT real execution.
    if main_file_content:
        return jsonify({
            "language": language,
            "version": version,
            "run": { # Piston-like run output
                "stdout": f"Executed {language} code (simulated).\nInput: {stdin}\nArgs: {args}",
                "stderr": "",
                "output": f"Executed {language} code (simulated).\nInput: {stdin}\nArgs: {args}", # Piston often merges stdout/stderr here
                "code": 0,
                "signal": None
            },
            # Fields expected by your testController.ts
            "passed": True, 
            "output": f"Simulated execution of {language} code. Content received.",
            "error": ""
        }), 200
    else:
        return jsonify({
            "language": language,
            "version": version,
            "run": {
                "stdout": "",
                "stderr": "No code provided for execution.",
                "output": "No code provided for execution.",
                "code": 1,
                "signal": None
            },
            "passed": False,
            "output": "",
            "error": "No code provided for execution."
        }), 400

# This is the endpoint your testController.ts is currently calling
@app.route('/execute', methods=['POST'])
def execute_legacy():
    data = request.get_json()
    app.logger.debug(f"Received data for /execute: {data}")

    language = data.get('language')
    code_content = data.get('code')
    stdin_input = data.get('input', '')
    test_case_data = data.get('testCase', {})
    expected_output = test_case_data.get('expectedOutput', None)

    if not language or code_content is None:
        app.logger.error("Missing language or code in /execute request")
        return jsonify({"passed": False, "error": "Language and code are required"}), 400
    
    # It's good practice to have an expectedOutput, even if it's an empty string for some tests
    if expected_output is None:
        app.logger.warn("Warning: expectedOutput not provided for test case.")
        # Decide handling: either error out or assume it should be empty for now
        # For now, let's assume it means the output should be empty if not provided.
        expected_output = ""

    # Basic security: prevent execution of arbitrary commands via language string
    # You'd have a proper mapping to actual execution commands/sandboxes
    allowed_languages = {"python", "javascript", "java", "typescript"}
    if language.lower() not in allowed_languages:
        app.logger.error(f"Unsupported language: {language}")
        return jsonify({"passed": False, "error": f"Unsupported language: {language}"}), 400

    # Create temporary files for execution
    # This is a simplified and insecure way to run code. 
    # A robust solution uses sandboxing (Docker, nsjail, etc.) like Piston does.
    try:
        with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix=get_suffix(language)) as tmp_code_file:
            tmp_code_file.write(code_content)
            code_file_path = tmp_code_file.name
        
        with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.txt') as tmp_input_file:
            tmp_input_file.write(stdin_input)
            input_file_path = tmp_input_file.name

        # Construct execution command (VERY SIMPLIFIED AND INSECURE)
        # This needs to be replaced with a call to a sandboxed execution engine (like Piston)
        # or a much more robust and secure subprocess management.
        cmd = []
        if language.lower() == 'python':
            cmd = ['python3', code_file_path]
        elif language.lower() == 'javascript':
            cmd = ['node', code_file_path]
        # Add other languages as needed; Java/C# etc. require compilation steps.
        else:
            # For now, just return an error for other languages as an example
            os.remove(code_file_path)
            os.remove(input_file_path)
            return jsonify({"passed": False, "error": f"Execution for {language} not yet implemented in this basic server."}), 501

        app.logger.info(f"Executing command: {' '.join(cmd)} with input from {input_file_path}")
        
        # Execute with timeout and capture output
        # IMPORTANT: This is still not fully secure. Subprocess can still be dangerous.
        # A real system uses nsjail, firecracker, or similar for strong isolation.
        process = subprocess.Popen(
            cmd,
            stdin=open(input_file_path, 'r'),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        stdout, stderr = process.communicate(timeout=10) # 10 second timeout

        if process.returncode == 0:
            app.logger.info(f"Execution successful. Raw stdout: '{stdout}', Raw stderr: '{stderr}'")
            
            # Normalize outputs for comparison (e.g., strip trailing newlines)
            # For JSON outputs, a more robust comparison (parsing and comparing objects) might be needed.
            normalized_stdout = stdout.strip()
            normalized_expected_output = expected_output.strip()

            app.logger.info(f"Normalized stdout: '{normalized_stdout}'")
            app.logger.info(f"Normalized expected_output: '{normalized_expected_output}'")

            passed_status = (normalized_stdout == normalized_expected_output)
            
            if passed_status:
                app.logger.info("Output matches expected output. Test PASSED.")
            else:
                app.logger.info("Output does NOT match expected output. Test FAILED.")
                app.logger.info(f"Expected: '{normalized_expected_output}' ({len(normalized_expected_output)} chars)")
                app.logger.info(f"Got:      '{normalized_stdout}' ({len(normalized_stdout)} chars)")

            return jsonify({
                "passed": passed_status, 
                "output": stdout, 
                "error": stderr,
                "debug_received_expected_output": expected_output, # What was initially received or set
                "debug_normalized_expected_output": normalized_expected_output,
                "debug_normalized_stdout": normalized_stdout
            }), 200
        else:
            app.logger.error(f"Execution failed with return code {process.returncode}. Error: {stderr}, Output: {stdout}")
            return jsonify({
                "passed": False, 
                "output": stdout, 
                "error": stderr,
                "debug_received_expected_output": expected_output, # What was initially received or set
                "debug_normalized_expected_output": expected_output.strip() if isinstance(expected_output, str) else "[expected_output was not a string]",
                "debug_normalized_stdout": stdout.strip() if isinstance(stdout, str) else "[stdout was not a string]"
            }), 200 # Return 200 so Axios doesn't throw 500

    except subprocess.TimeoutExpired:
        app.logger.error("Execution timed out")
        return jsonify({
            "passed": False, "output": "", "error": "Execution timed out after 10 seconds",
            "debug_received_expected_output": expected_output,
            "debug_normalized_expected_output": expected_output.strip() if isinstance(expected_output, str) else "[expected_output was not a string before timeout]",
            "debug_normalized_stdout": "[timeout]"
        }), 200
    except FileNotFoundError:
        app.logger.error(f"Execution command not found (e.g., node or python). Ensure it's in PATH.")
        return jsonify({
            "passed": False, "output": "", "error": "Execution environment error: command not found.",
            "debug_received_expected_output": expected_output,
            "debug_normalized_expected_output": expected_output.strip() if isinstance(expected_output, str) else "[expected_output was not a string before FileNotFoundError]",
            "debug_normalized_stdout": "[FileNotFoundError]"
        }), 200
    except Exception as e:
        app.logger.error(f"An unexpected error occurred: {str(e)}", exc_info=True)
        return jsonify({
            "passed": False, "output": "", "error": f"An unexpected error occurred: {str(e)}",
            "debug_received_expected_output": data.get('testCase', {}).get('expectedOutput', 'Error fetching expectedOutput'),
            "debug_normalized_expected_output": "[Error]",
            "debug_normalized_stdout": "[Error]"
        }), 200
    finally:
        # Clean up temporary files
        if 'code_file_path' in locals() and os.path.exists(code_file_path):
            os.remove(code_file_path)
        if 'input_file_path' in locals() and os.path.exists(input_file_path):
            os.remove(input_file_path)

def get_suffix(language):
    if language.lower() == 'python':
        return '.py'
    elif language.lower() == 'javascript':
        return '.js'
    # Add other languages
    return '.txt'

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000)) # Gunicorn will use $PORT from Dockerfile
    # When running locally for dev: python server.py
    # For production, Gunicorn is used via the Dockerfile CMD
    if os.environ.get('FLASK_ENV') == 'development': # Simple check for local dev
        app.run(debug=True, host='0.0.0.0', port=port)
    # Gunicorn handles running the app in production (via Docker CMD)
