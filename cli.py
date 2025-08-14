#!/usr/bin/env python3
"""
Gemini CLI Documentation Generator with Context Management
Processes large text files in chunks while maintaining context between sections.
"""

import subprocess
import os
import json
import time
from typing import List, Dict, Optional
import argparse
from datetime import datetime

class GeminiDocGenerator:
    def __init__(self, input_file: str, chunk_size: int = 300, output_file: str = "documentation.md"):
        self.input_file = input_file
        self.chunk_size = chunk_size
        self.output_file = output_file
        self.context_file = "context_memory.json"
        self.temp_chunk_file = "temp_chunk.txt"
        self.context_memory = []
        self.current_section = 0
        self.total_chunks = 0
        
    def load_context_memory(self) -> None:
        """Load previous context memory if exists"""
        if os.path.exists(self.context_file):
            try:
                with open(self.context_file, 'r') as f:
                    data = json.load(f)
                    self.context_memory = data.get('context_memory', [])
                    self.current_section = data.get('current_section', 0)
                print(f"Loaded context memory with {len(self.context_memory)} previous sections")
            except Exception as e:
                print(f"Warning: Could not load context memory: {e}")
                self.context_memory = []
    
    def save_context_memory(self, section_summary: str) -> None:
        """Save current context to memory"""
        context_entry = {
            'section': self.current_section,
            'summary': section_summary,
            'timestamp': datetime.now().isoformat()
        }
        
        self.context_memory.append(context_entry)
        
        # Keep only last 5 sections for context (to manage prompt length)
        if len(self.context_memory) > 5:
            self.context_memory = self.context_memory[-5:]
        
        # Save to file
        context_data = {
            'context_memory': self.context_memory,
            'current_section': self.current_section,
            'last_updated': datetime.now().isoformat()
        }
        
        with open(self.context_file, 'w') as f:
            json.dump(context_data, f, indent=2)
    
    def build_context_prompt(self) -> str:
        """Build context prompt from memory"""
        if not self.context_memory:
            return ""
        
        context_parts = []
        context_parts.append("CONTEXT FROM PREVIOUS SECTIONS:")
        
        for entry in self.context_memory[-3:]:  # Use last 3 sections for context
            context_parts.append(f"Section {entry['section']}: {entry['summary']}")
        
        context_parts.append("\nNow continue with the next section, maintaining consistency and building upon the above context.")
        return "\n".join(context_parts)
    
    def extract_summary_from_response(self, response: str) -> str:
        """Extract a brief summary from Gemini's response for context memory"""
        # Take first 200 characters and find a good breaking point
        summary = response.strip()[:200]
        
        # Try to break at sentence end
        last_period = summary.rfind('.')
        if last_period > 50:  # Ensure we have a reasonable length
            summary = summary[:last_period + 1]
        
        # Clean up and add ellipsis if truncated
        if len(response.strip()) > len(summary):
            summary += "..."
        
        return summary
    
    def create_prompt(self, chunk_num: int, total_chunks: int) -> str:
        """Create appropriate prompt based on chunk position and context"""
        
        if chunk_num == 1:
            return """Analyze this code and start writing comprehensive technical documentation. 
            
            Structure your response with clear headers and sections. This is the beginning of a large codebase documentation project.
            
            Include:
            - Overview of what this code section does
            - Key components and their purposes
            - Important functions/classes with descriptions
            - Any notable patterns or architectural decisions
            
            Use markdown formatting with proper headers (##, ###) and code blocks where appropriate."""
            
        elif chunk_num == total_chunks:
            context_prompt = self.build_context_prompt()
            return f"""{context_prompt}
            
            This is the FINAL section ({chunk_num}/{total_chunks}) of the codebase documentation.
            
            Document this final code section and then provide:
            - Summary of what this section covers
            - Overall conclusions about the codebase
            - Any final notes or recommendations
            
            Maintain the same documentation style and formatting as previous sections."""
            
        else:
            context_prompt = self.build_context_prompt()
            return f """{context_prompt}
            
            This is section {chunk_num} of {total_chunks} of the codebase documentation.
            
            Continue documenting this code section:
            - Maintain consistent formatting and style
            - Build upon concepts introduced in previous sections
            - Include detailed descriptions of functions, classes, and logic
            - Note any relationships to previously documented components
            
            Use the same markdown structure with appropriate headers."""
    
    def call_gemini_cli(self, prompt: str, chunk_file: str) -> Optional[str]:
        """Call Gemini CLI with error handling and retries"""
        max_retries = 3
        retry_delay = 5
        
        for attempt in range(max_retries):
            try:
                print(f"  Calling Gemini CLI (attempt {attempt + 1}/{max_retries})...")
                
                result = subprocess.run([
                    'gemini', prompt, f'--files={chunk_file}'
                ], capture_output=True, text=True, check=True, timeout=120)
                
                if result.stdout.strip():
                    return result.stdout.strip()
                else:
                    print(f"  Warning: Empty response from Gemini CLI")
                    
            except subprocess.TimeoutExpired:
                print(f"  Timeout on attempt {attempt + 1}")
            except subprocess.CalledProcessError as e:
                print(f"  Error on attempt {attempt + 1}: {e}")
                if e.stderr:
                    print(f"  Stderr: {e.stderr}")
            except Exception as e:
                print(f"  Unexpected error on attempt {attempt + 1}: {e}")
            
            if attempt < max_retries - 1:
                print(f"  Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
                retry_delay *= 2  # Exponential backoff
        
        print(f"  Failed to get response after {max_retries} attempts")
        return None
    
    def process_file(self, resume: bool = False) -> None:
        """Main processing function"""
        
        # Load context if resuming
        if resume:
            self.load_context_memory()
        
        # Read the input file
        try:
            with open(self.input_file, 'r', encoding='utf-8') as f:
                lines = f.readlines()
        except Exception as e:
            print(f"Error reading input file: {e}")
            return
        
        self.total_chunks = (len(lines) + self.chunk_size - 1) // self.chunk_size
        print(f"Processing {len(lines)} lines in {self.total_chunks} chunks of {self.chunk_size} lines each")
        
        # Determine starting point
        start_chunk = self.current_section + 1 if resume else 1
        
        # Initialize or append to output file
        mode = 'a' if resume and os.path.exists(self.output_file) else 'w'
        
        with open(self.output_file, mode, encoding='utf-8') as doc_file:
            if not resume:
                # Write header only for new documentation
                doc_file.write(f"# Comprehensive Code Documentation\n\n")
                doc_file.write(f"**Source File:** {self.input_file}\n")
                doc_file.write(f"**Total Lines:** {len(lines):,}\n")
                doc_file.write(f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                doc_file.write(f"**Chunks:** {self.total_chunks}\n\n")
                doc_file.write("---\n\n")
            
            # Process each chunk
            for chunk_num in range(start_chunk, self.total_chunks + 1):
                self.current_section = chunk_num
                start_line = (chunk_num - 1) * self.chunk_size
                end_line = min(start_line + self.chunk_size, len(lines))
                
                print(f"\nProcessing chunk {chunk_num}/{self.total_chunks} (lines {start_line + 1}-{end_line})...")
                
                # Extract chunk lines
                chunk_lines = lines[start_line:end_line]
                
                # Write chunk to temporary file
                try:
                    with open(self.temp_chunk_file, 'w', encoding='utf-8') as temp_file:
                        temp_file.writelines(chunk_lines)
                except Exception as e:
                    print(f"Error writing temp chunk file: {e}")
                    continue
                
                # Create prompt with context
                prompt = self.create_prompt(chunk_num, self.total_chunks)
                
                # Call Gemini CLI
                response = self.call_gemini_cli(prompt, self.temp_chunk_file)
                
                if response:
                    # Write to documentation
                    doc_file.write(f"## Section {chunk_num} (Lines {start_line + 1}-{end_line})\n\n")
                    doc_file.write(response)
                    doc_file.write("\n\n---\n\n")
                    doc_file.flush()  # Ensure content is written immediately
                    
                    # Extract summary and save context
                    summary = self.extract_summary_from_response(response)
                    self.save_context_memory(summary)
                    
                    print(f"  ✓ Successfully processed chunk {chunk_num}")
                    print(f"  Summary: {summary[:100]}...")
                    
                else:
                    # Write placeholder for failed chunks
                    doc_file.write(f"## Section {chunk_num} (Lines {start_line + 1}-{end_line})\n\n")
                    doc_file.write("*[Documentation generation failed for this section]*\n\n")
                    doc_file.write("---\n\n")
                    doc_file.flush()
                    
                    # Save empty summary
                    self.save_context_memory(f"Section {chunk_num}: Documentation generation failed")
                    
                    print(f"  ✗ Failed to process chunk {chunk_num}")
                
                # Clean up temp file
                if os.path.exists(self.temp_chunk_file):
                    os.remove(self.temp_chunk_file)
                
                # Rate limiting - wait between requests
                if chunk_num < self.total_chunks:
                    print("  Waiting 3 seconds before next request...")
                    time.sleep(3)
        
        print(f"\n✅ Documentation generation complete!")
        print(f"📄 Output file: {self.output_file}")
        print(f"💾 Context saved to: {self.context_file}")
        
        # Final cleanup
        if os.path.exists(self.temp_chunk_file):
            os.remove(self.temp_chunk_file)

def main():
    parser = argparse.ArgumentParser(description='Generate documentation from large code files using Gemini CLI')
    parser.add_argument('input_file', help='Input text file to process')
    parser.add_argument('--chunk-size', type=int, default=300, help='Number of lines per chunk (default: 300)')
    parser.add_argument('--output', '-o', default='documentation.md', help='Output documentation file (default: documentation.md)')
    parser.add_argument('--resume', action='store_true', help='Resume from where it left off')
    
    args = parser.parse_args()
    
    if not os.path.exists(args.input_file):
        print(f"Error: Input file '{args.input_file}' not found")
        return
    
    generator = GeminiDocGenerator(args.input_file, args.chunk_size, args.output)
    
    try:
        generator.process_file(resume=args.resume)
    except KeyboardInterrupt:
        print(f"\n⚠️  Process interrupted by user")
        print(f"You can resume later using: python {__file__} {args.input_file} --resume")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        print(f"You can try to resume using: python {__file__} {args.input_file} --resume")

if __name__ == "__main__":
    main()
