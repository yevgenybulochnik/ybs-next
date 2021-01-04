---
title: Jupyter Notebook References
type: article
topic: programming
slug: jupyter-reference
desc: Living document that serves as a reference for jupyter notebooks
published: 10-18-2020
updated: 10-18/2020
tags:
    - Python
    - Data
    - Analytics
---
# Jupyter Notebook References
This article is a living reference for various Jupyter notebook commands and configurations. Im a huge fan of jupyterlab so many of these references will apply to labs.

### Import a local module or package and auto-reload on code change
Many times you may want to write code in a text editor or work on creating a python package to be used within a jupyter notebook. Additionally, its convenient to have this code auto-reload whenever you rerun a jupyter cell. If your notebook is not run at your project root sometimes this can cause issues with imports. Adding the following to a notebook can help.

1. Append to the python sys.path

    ```python
    import sys
    from pathlib import Path

    module_path = Path("/some/parent/path").resolve()
    sys.path.append(str(module_path))
    ```

2. Enable auto-reload

    ```bash
    %load_ext autoreload

    %autoreload 2
    ```
