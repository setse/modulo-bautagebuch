# Local German transcription — implementation plan

Historical Whisper research, 7 October 2026. Version 0.6.0 instead implements offline CPU Parakeet; see [the current implementation](../README.md#offline-parakeet-transcription). The Whisper option below remains unimplemented. Target assumption: Windows office PC, 16 GB system RAM, NVIDIA GPU with roughly 4 GB dedicated VRAM; exact CPU/GPU unknown.

## Feasibility and hardware

The proposed [primeline German checkpoint](https://huggingface.co/primeline/whisper-large-v3-turbo-german) is a German adaptation of Whisper large-v3-turbo, with 809 million parameters and Apache-2.0 licensing. Its [published weights](https://huggingface.co/primeline/whisper-large-v3-turbo-german/tree/main) occupy 1.62 GB. Published recognition scores do not establish accuracy for noisy construction sites, company names, measurements, or dialects.

[OpenAI's standard Whisper implementation](https://github.com/openai/whisper#available-models-and-languages) lists approximately 6 GB VRAM for turbo. That is implementation-specific, and is not the memory requirement of every optimized engine. A 4 GB GPU should therefore be tested with quantization rather than assumed to handle the usual configuration.

[faster-whisper](https://github.com/SYSTRAN/faster-whisper#benchmark) supports INT8 CPU/GPU inference and converting compatible Transformers fine-tunes. Its published large-v2 benchmark uses 2,926 MB VRAM for unbatched INT8 on an RTX 3070 Ti. This is evidence that quantization can help, **not a measured result for this German checkpoint or a 4 GB office GPU**.

Engineering assessment: 16 GB system RAM is a reasonable starting point for a quantized, single-job worker loaded on demand. A 4 GB NVIDIA card may work, subject to architecture, drivers, free VRAM and engine. A modern 6–8 GB card offers more headroom. CPU fallback can process short notes in the background; comfortable speed or real-time transcription cannot be promised without measurements. System RAM and dedicated GPU VRAM are separate limits.

## Proposed runtime

Start by evaluating a native [whisper.cpp](https://github.com/ggml-org/whisper.cpp) worker with quantized weights. It supports CPU inference and CUDA/Vulkan GPU backends. Vulkan reduces NVIDIA-specific runtime packaging and also creates a route for other GPUs, provided drivers support it. Verify conversion of this exact fine-tune, tokenizer, and turbo architecture before selecting it.

If conversion or accuracy is unsatisfactory, evaluate faster-whisper/CTranslate2 with INT8 and batch size 1. Bundle its runtime and required CUDA libraries where redistribution permits. Users should not need to install Python, a development toolkit, or configure command-line tools.

Compare engines on the same audio and decoding settings. Select the measured combination of recognition quality, cold-start time, memory, package size, and processing speed; engine choice remains provisional.

## App workflow and packaging

1. Keep Electron responsive by running recognition in a separate background process. The main process passes validated local file paths and receives progress, timestamped segments, completion, and errors through structured IPC. Allow one job at a time, cancellation, and safe recovery from a worker crash or GPU memory failure.
2. Decode supported audio into 16 kHz mono, process bounded segments, detect silence, and test overlap handling to avoid dropped or duplicated words. Default to German transcription. Start automatically after an audio import or finished recording when the feature is enabled.
3. Show an editable transcript next to the recording. Keep existing manual edits until the user explicitly replaces them. Insert reviewed text into the chosen document section; never silently rewrite completed entries. Keep raw audio and model/version metadata with the result.
4. Detect usable acceleration, attempt the tested GPU configuration, then offer CPU fallback with a clear status. Release the model after idle time and limit CPU threads to preserve responsiveness while Office applications run.
5. Distribute the worker, model and decoding resources with the Windows package. Place them outside Electron's ASAR archive. A single distributed EXE can unpack these resources, but inference still needs local model files. Prefer persistent installed resources so gigabytes are not extracted on every launch. Keep diary data separate from model resources.
6. Pin the exact model revision and record checksums. Package tokenizer/configuration files and third-party notices. Include all required resources for first-run offline operation. No external inference requests or account should be required.

## Acceptance gate before implementation is released

Test on the actual 4 GB machine with 1-, 5-, and 20-minute German recordings, including wind, machinery, pauses, numbers, dates, trade terminology, and company names. Compare original and quantized models; inspect meaningful transcription errors rather than relying only on aggregate word error rate.

Measure cold load, warm processing time relative to audio duration, peak RAM/VRAM, and UI responsiveness with Word and a browser open. Verify long-file handling, cancel/retry, GPU-to-CPU fallback, restart persistence and all supported import formats. Run the packaged app on a clean offline Windows machine without Python or developer tools. If turbo does not meet the measured target, evaluate a smaller multilingual model as an optional faster profile.

The next step is this conversion and benchmark proof of concept, once the GPU model is known. Implementation should follow the evidence, rather than committing to comfortable real-time operation on unspecified hardware.
