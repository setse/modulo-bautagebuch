# Offline text assistant notices

All text processing runs on this PC. Production does not download model weights or send transcripts to a service.

## Qwen3.5-2B — Apache 2.0

Original model: Qwen/Qwen3.5-2B, Qwen Team, Alibaba Cloud: https://huggingface.co/Qwen/Qwen3.5-2B

Bundled GGUF Q4_K_M conversion: Unsloth, https://huggingface.co/unsloth/Qwen3.5-2B-GGUF at revision `f6d5376be1edb4d416d56da11e5397a961aca8ae`.

The publisher converted and quantized the weights; Modulo uses the converted file unchanged. Only the text model is shipped. No vision projection model is included. Neither publisher endorses this app. License: `licenses/Apache-2.0.txt`. Exact asset URLs, sizes and SHA-256 hashes: `models/manifest.json`.

## llama.cpp — MIT

Copyright (c) 2023-2024 The ggml authors.

Unmodified Windows x64 CPU runtime from release b11476, commit `988190680d5a89fce97de3c20df2c2813731fd61`: https://github.com/ggml-org/llama.cpp/releases/tag/b11476

License: `licenses/llama.cpp-LICENSE.txt`. CPU implementations select a compatible instruction set at runtime. The server listens only on loopback and requires a per-session random key for generation. No public web interface, tool agent or external MCP proxy is enabled.

## LLVM OpenMP

The bundled `libomp.dll` is the LLVM OpenMP runtime. Apache 2.0 with LLVM exceptions and legacy notices: `licenses/OpenMP-LICENSE.txt`. Project: https://github.com/llvm/llvm-project/tree/main/openmp

## Microsoft Visual C++ runtime

Microsoft MSVC runtime DLLs are included beside the native runtime for app-local deployment, copied from the frozen transcription runtime's redistribution dependencies. Copyright Microsoft Corporation. These files retain their original binary signatures and version metadata. They are not covered by llama.cpp's MIT license. Redistribution documentation: https://learn.microsoft.com/en-us/cpp/windows/redistributing-visual-cpp-files
