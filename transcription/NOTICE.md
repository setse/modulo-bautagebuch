# Offline speech recognition notices

The Windows app bundles the following resources. All processing runs locally; production does not download model weights or send audio to a service.

## German Parakeet weights — CC BY 4.0

Original model: **primeline/parakeet-primeline**, published by primeline: https://huggingface.co/primeline/parakeet-primeline

Bundled derivative: **Buttermilk03/parakeet-primeline-onnx**, converted by Buttermilk03 to ONNX and quantized to INT8: https://huggingface.co/Buttermilk03/parakeet-primeline-onnx

Revision: `2e2f9169c7030984cf0e9e35c0a68eadfac376e4`. Modulo uses the converted weights unchanged. Conversion and quantization are changes made by the conversion publisher. Neither publisher endorses this app. See `models/manifest.json` for the exact file sizes, checksums and download URLs.

License: Creative Commons Attribution 4.0 International: https://creativecommons.org/licenses/by/4.0/ and bundled `licenses/Parakeet-CC-BY-4.0.html`.

## Silero voice activity detection — MIT

Silero VAD, Silero Team: https://github.com/snakers4/silero-vad
Bundled ONNX export: https://huggingface.co/istupakov/silero-vad-onnx at `b3e3ee3cce4c11ceb63b1a0b229d916069c1ddf6`.
License and copyright: `licenses/Silero-LICENSE.txt`.

## Inference runtime

- onnx-asr 0.12.0, Ilya Stupakov, MIT: https://github.com/istupakov/onnx-asr
- ONNX Runtime 1.30.0, Microsoft, MIT: https://github.com/microsoft/onnxruntime
- Python 3.13.15, Python Software Foundation license: https://www.python.org/
- NumPy 2.5.3 and dependencies: license and third-party notices in `licenses/`.
- PyInstaller 6.22.3 bootloader, GPL with the bootloader distribution exception: https://pyinstaller.org/en/stable/license.html

Full runtime dependency notices are bundled under `licenses/`. Build versions are pinned in the project's `transcription/requirements-build.lock`. This app uses a separate frozen executable; it does not require an installed Python interpreter.

## FFmpeg — shared LGPL build

BtbN build `ffmpeg-n8.1.3-14-g330caae0c1-win64-lgpl-shared-8.1.zip`, release `autobuild-2026-10-07-13-07`: https://github.com/BtbN/FFmpeg-Builds/releases/tag/autobuild-2026-10-07-13-07

FFmpeg revision `330caae0c1`. This is the LGPL **shared** variant, without GPL/nonfree features, used as a separate decoder process. Binaries and replaceable DLLs are in `ffmpeg/bin/`; upstream license is in `ffmpeg/LICENSE.txt`. No changes were made to the binaries.

Corresponding FFmpeg source is bundled in `ffmpeg/ffmpeg-source-330caae0c1.tar.gz`. Source and configure options for all build dependencies and the build scripts: https://github.com/BtbN/FFmpeg-Builds/tree/autobuild-2026-10-07-13-07 . The build configuration is recorded in `ffmpeg/build-configuration.txt`. You may replace the decoder and its DLLs with a compatible LGPL build. This app imposes no restriction on modification or reverse engineering for debugging changes to these libraries.
