---
title: Linux Commands
type: article
topic: programming
slug: linux-commands
desc: Living document that serves as a reference for various linux commands
published: 9-17-2020
updated: 10-05-2020
tags:
    - Linux
    - Devops
---
# Linux Commands Reference

This article serves as a living document for various Linux commands. It is continuously updated and will be used as a reference document for various commands I may use frequently or infrequently! Flag definitions will be included as needed.

- Get count of files in a directory
```bash
ls | wc -l
ls -a | wc -l
ls -A | wc -l
```
    - Flags
        - -a, --all
        - -A, --almost-all
        - -l, --lines


- Get count of specific file type in a directory
```bash
ls | grep '.html' | wc -l
find -name '*.html' | wc -l
find . -maxdepth 1 -name '*.html' | wc -l
```
