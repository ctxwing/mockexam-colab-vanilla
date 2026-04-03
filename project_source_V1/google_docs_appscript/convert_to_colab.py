
import json
import os
import re

def convert_md_to_ipynb(md_path, ipynb_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    cells = []
    
    # Split by code blocks
    parts = re.split(r'```python\n(.*?)\n```', content, flags=re.DOTALL)
    
    for i, part in enumerate(parts):
        if i % 2 == 0:
            # Markdown part
            if part.strip():
                # Remove the "Google Forms guide" at the end if it exists
                part = re.split(r'## 💡 구글 설문지', part)[0]
                if part.strip():
                    cells.append({
                        "cell_type": "markdown",
                        "metadata": {},
                        "source": part.strip().splitlines(keepends=True)
                    })
        else:
            # Code part - Strip solution but keep data loading
            lines = part.splitlines()
            new_lines = []
            has_data_load = False
            for line in lines:
                # Replace local files with likely GitHub URLs for AICE
                line = line.replace("'A0007IT.json'", "'https://raw.githubusercontent.com/venture21/AICE-associate/main/AICE%20Associate%20A0007IT.json'")
                line = line.replace("'Invistico_Airline.csv'", "'https://raw.githubusercontent.com/SilasPenda/Airline-Customer-Satisfaction/main/Invistico_Airline.csv'")
                
                if 'import ' in line or 'from ' in line:
                    if line not in new_lines:
                        new_lines.append(line)
                elif '.read_csv(' in line or '.read_json(' in line:
                    new_lines.append(line)
                    has_data_load = True
            
            if not has_data_load and any('pd.' in l for l in new_lines):
                # If it's a code block that adds a column or something, we might want to keep some context
                # but for simplicity, let's just add the comment
                pass
                
            new_lines.append("# 여기에 코드를 작성하세요\n")
            
            cells.append({
                "cell_type": "code",
                "execution_count": None,
                "metadata": {},
                "outputs": [],
                "source": [l + "\n" if not l.endswith("\n") else l for l in new_lines]
            })

    # Add a final submission cell if it's bigdata
    if 'bigdata' in md_path:
         cells.append({
            "cell_type": "markdown",
            "metadata": {},
            "source": ["## 최종 결과 제출\n", "모든 문제의 답을 구한 뒤, 구글 설문지에 답안을 입력하세요."]
        })

    ipynb = {
        "cells": cells,
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3"
            },
            "language_info": {
                "codemirror_mode": {
                    "name": "ipython",
                    "version": 3
                },
                "file_extension": ".py",
                "mimetype": "text/x-python",
                "name": "python",
                "nbconvert_exporter": "python",
                "pygments_lexer": "ipython3",
                "version": "3.8.10"
            }
        },
        "nbformat": 4,
        "nbformat_minor": 4
    }

    with open(ipynb_path, 'w', encoding='utf-8') as f:
        json.dump(ipynb, f, indent=1, ensure_ascii=False)

# File mapping
source_dir = '/home/ctxwing/docker-ctx/lancer/qr-mockexam-colab-nextjs/project_source/webfront/public/solutions'
target_dir = '/home/ctxwing/docker-ctx/lancer/qr-mockexam-colab-nextjs/project_source/webfront/public/colab'

for filename in os.listdir(source_dir):
    if filename.endswith('.md'):
        md_file = os.path.join(source_dir, filename)
        ipynb_file = os.path.join(target_dir, filename.replace('.md', '.ipynb'))
        print(f"Converting {md_file} to {ipynb_file}")
        convert_md_to_ipynb(md_file, ipynb_file)
